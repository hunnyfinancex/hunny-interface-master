import React, { useCallback, useEffect, useState } from 'react';
import TokenInputControl from '../../../components/TokenInputControl';
import { useWallet } from 'use-wallet';
import { getAddress } from '../../../modules/utils';
import { approve } from '../../../modules/web3';
import PoolAction from './PoolAction';
import {
  ActionTypeEnum,
  SubmitTypeEnum,
} from '../../../modules/enums/PoolDetails.enum';
import { usePool } from '../../../hooks/usePool';
import { HunnyToast } from '../../../modules/toastify';
import { PendingTransactionDisplay } from '../../../components/ToastContent/ToastPendingTransaction';
import { SuccessTransactionDisplay } from '../../../components/ToastContent/ToastSuccessTransaction';
import { delineate, toTokenUnitsBN } from '../../../modules/number';
import PoolFeeDescription from './PoolFeeDescription';
import { useSelector } from 'react-redux';
import { State } from '../../../modules/models/state.model';
import AntiWhaleDescription from './AntiWhaleDescription';
import { TOKENS } from '../../../constants/tokens';
import { fetchPoolAllowance } from '../../../state/pools';
import { useAppDispatch } from '../../../state';
import analytics from '../../../modules/analytics';
import { GOOGLE_ANALYTIC_EVENTS } from '../../../constants/gaEventTemplate';
import useExecute from '../../../hooks/useExecute';
import { useTranslation } from 'react-i18next';

interface PoolFormProps {
  poolId: number;
  actionType: ActionTypeEnum;
}

const PoolForm: React.FC<PoolFormProps> = ({ poolId, actionType }) => {
  const { ethereum, account } = useWallet();
  const { isPending, executeRequest } = useExecute();

  const { t } = useTranslation();

  const [depositValue, setDepositValue] = useState('');
  const [withdrawValue, setWithdrawValue] = useState('');

  const [formError, setFormError] = useState('');

  const dispatch = useAppDispatch();

  const allowance = useSelector(
    (state: State) =>
      state.pools.pools[state.pools.selectedPoolType].find(
        (item) => item.id === poolId
      ).allowance
  );
  const withdrawBalance = useSelector(
    (state: State) =>
      state.pools.pools[state.pools.selectedPoolType].find(
        (item) => item.id === poolId
      ).withdrawBalance
  );
  const poolDetails = useSelector((state: State) =>
    state.pools.pools[state.pools.selectedPoolType].find(
      (item) => item.id === poolId
    )
  );
  const balance = useSelector(
    (state: State) =>
      state.pools.pools[state.pools.selectedPoolType].find(
        (item) => item.id === poolId
      ).tokenBalance
  );

  const antiWhaleLimit = useSelector(
    (state: State) => state.pools.antiWhaleLimit
  );

  const pool = usePool(getAddress(poolDetails.addresses));

  const displayedBalance =
    actionType === ActionTypeEnum.Deposit ? balance : withdrawBalance;

  const isBalanceOutOfAntiWhaleLimit =
    poolDetails?.depositToken === TOKENS.HUNNY &&
    displayedBalance?.gt(antiWhaleLimit);

  const selectedValue =
    actionType === ActionTypeEnum.Deposit ? depositValue : withdrawValue;

  const setSelectedValue =
    actionType === ActionTypeEnum.Deposit ? setDepositValue : setWithdrawValue;

  useEffect(() => {
    if (poolDetails.isOnlyClaimAndWithdraw) {
      setWithdrawValue(toTokenUnitsBN(withdrawBalance, 18).toString());
    }
  }, [poolDetails, withdrawBalance]);

  const handleApprove = useCallback(async () => {
    analytics.sendEvent(
      GOOGLE_ANALYTIC_EVENTS.CLICK_APPROVE_ON_POOL_DETAILS,
      poolDetails.code
    );

    if (ethereum && account) {
      executeRequest(
        approve(
          ethereum,
          poolDetails.depositToken.addresses,
          account,
          getAddress(poolDetails.addresses)
        ),
        (hash: string) => {
          if (hash) {
            dispatch(fetchPoolAllowance(account, poolDetails));
          }
        }
      );
    }
  }, [ethereum, account]);

  const handleDeposit = useCallback(async () => {
    analytics.sendEvent(
      GOOGLE_ANALYTIC_EVENTS.CLICK_DEPOSIT_ON_POOL_DETAILS,
      poolDetails.code
    );
    if (ethereum && account && depositValue != '') {
      executeRequest(
        pool.deposit(ethereum, account, depositValue),
        (hash: string) => {
          setDepositValue('');
        }
      );
    }
  }, [ethereum, account, depositValue]);

  const handleWithdraw = useCallback(async () => {
    analytics.sendEvent(
      GOOGLE_ANALYTIC_EVENTS.CLICK_WITHDRAW_ON_POOL_DETAILS,
      poolDetails.code
    );
    if (ethereum && account && withdrawValue != '') {
      executeRequest(
        pool.withdraw(ethereum, account, withdrawValue),
        (hash: string) => {
          setWithdrawValue('');
        }
      );
    }
  }, [ethereum, account, withdrawValue]);

  const handleWithdrawAll = useCallback(async () => {
    analytics.sendEvent(
      GOOGLE_ANALYTIC_EVENTS.CLICK_EXIT_ON_POOL_DETAILS,
      poolDetails.code
    );
    if (ethereum && account) {
      executeRequest(pool.withdrawAll(ethereum, account), (hash: string) => {
        setWithdrawValue('');
      });
    }
  }, [ethereum, account]);

  return (
    <>
      <TokenInputControl
        token={poolDetails.depositToken}
        balance={displayedBalance}
        maxBalance={
          isBalanceOutOfAntiWhaleLimit ? antiWhaleLimit : displayedBalance
        }
        hasDeposit={actionType === ActionTypeEnum.Deposit}
        onChange={setSelectedValue}
        value={selectedValue}
        setError={setFormError}
        maxErrorInputMsg={
          isBalanceOutOfAntiWhaleLimit
            ? `${t('Amount must be less than Anti-whale limit:')} ${delineate(
                toTokenUnitsBN(antiWhaleLimit, 18).toFixed(3)
              )}`
            : t('Insufficient balance')
        }
        balanceLabel={
          actionType === ActionTypeEnum.WithDraw
            ? t('Withdrawable')
            : t('Wallet Balance')
        }
        readOnly={
          actionType === ActionTypeEnum.WithDraw
            ? poolDetails.isOnlyClaimAndWithdraw
            : false
        }
      />
      <PoolFeeDescription
        poolDetails={poolDetails}
        actionType={actionType}
        withdrawBalance={withdrawBalance}
      />

      <PoolAction
        isVesting={poolDetails.isVesting}
        isPending={isPending}
        isDisabledAll={
          actionType != ActionTypeEnum.WithDraw && poolDetails.isWarning
        }
        isDisabled={!!formError || !Number(selectedValue)}
        isExitDisabled={
          !withdrawBalance ||
          !withdrawBalance.toNumber() ||
          isBalanceOutOfAntiWhaleLimit
        }
        isOnlyClaimAndWithdraw={poolDetails.isOnlyClaimAndWithdraw}
        actionType={
          actionType === ActionTypeEnum.WithDraw
            ? SubmitTypeEnum.WithDraw
            : allowance && allowance.gt(0)
            ? SubmitTypeEnum.Deposit
            : SubmitTypeEnum.Approve
        }
        onApproved={!poolDetails.isPause && handleApprove}
        onDeposited={!poolDetails.isPause && handleDeposit}
        onWithdraw={handleWithdraw}
        onClaimAndWithdrawAll={handleWithdrawAll}
      />

      {!poolDetails.isVesting && <AntiWhaleDescription />}
    </>
  );
};

export default PoolForm;
