import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Stroke from '../../../components/Stroke';
import ValueDisplay from '../../../components/ValueDisplay';
import {
  StyledDisplayContainer,
  StyledDisplayLabel,
  StyledDisplayValue,
} from '../../../components/ValueDisplay/ValueDisplay';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import HunnyTooltip from '../../../components/Tooltip/Tooltip';
import { useWallet } from 'use-wallet';
import { delineate, toTokenUnitsBN } from '../../../modules/number';
import { getAddress, getExplorer } from '../../../modules/utils';
import { usePool } from '../../../hooks/usePool';
import { PendingTransactionDisplay } from '../../../components/ToastContent/ToastPendingTransaction';
import { HunnyToast } from '../../../modules/toastify';
import { SuccessTransactionDisplay } from '../../../components/ToastContent/ToastSuccessTransaction';
import { CircularProgress } from '@material-ui/core';
import NumberDisplay from '../../../components/NumberDisplay';
import SyncIcon from '@material-ui/icons/Sync';
import RefreshIcon from '@material-ui/icons/Refresh';
import HunnyBadges from '../../../components/HunnyBadges';
import { PoolCompoundingEnum } from '../../../modules/enums/Pool.enum';
import { useSelector } from 'react-redux';
import { State } from '../../../modules/models/state.model';
import analytics from '../../../modules/analytics';
import { GOOGLE_ANALYTIC_EVENTS } from '../../../constants/gaEventTemplate';
import {
  HUNNY_AUTO_POOL,
  HUNNY_POOL,
  POOL_TYPES,
} from '../../../constants/pools';
import useExecute from '../../../hooks/useExecute';
import { Trans, useTranslation } from 'react-i18next';
import { AssetEnum } from 'modules/enums/Asset.enum';

export interface PoolInfoProps {
  poolId: Number;
}

const PoolInfo: React.FC<PoolInfoProps> = ({ poolId }) => {
  const { ethereum, account } = useWallet();
  const { isPending, executeRequest } = useExecute();

  const { t } = useTranslation();

  const [estimatedApy, setEstimatedApy] = useState('');
  const [apyHelperText, setApyHelperText] = useState('');

  const poolDetails = useSelector((state: State) =>
    state.pools.pools[state.pools.selectedPoolType].find(
      (item) => item.id === poolId
    )
  );

  const apy = useSelector(
    (state: State) =>
      state.pools.pools[state.pools.selectedPoolType].find(
        (item) => item.id === poolId
      ).apy
  );

  const withdrawBalance = useSelector(
    (state: State) =>
      state.pools.pools[state.pools.selectedPoolType].find(
        (item) => item.id === poolId
      ).withdrawBalance
  );
  const balance = useSelector(
    (state: State) =>
      state.pools.pools[state.pools.selectedPoolType].find(
        (item) => item.id === poolId
      ).balance
  );
  const balanceInUsd = useSelector(
    (state: State) =>
      state.pools.pools[state.pools.selectedPoolType].find(
        (item) => item.id === poolId
      ).balanceInUsd
  );
  const profit = useSelector(
    (state: State) =>
      state.pools.pools[state.pools.selectedPoolType].find(
        (item) => item.id === poolId
      ).profit
  );
  const profitInUsd = useSelector(
    (state: State) =>
      state.pools.pools[state.pools.selectedPoolType].find(
        (item) => item.id === poolId
      ).profitInUsd
  );

  const pool = usePool(getAddress(poolDetails.addresses));
  const isShowWithdrawable = balance?.isGreaterThan(withdrawBalance);

  useEffect(() => {
    if (poolDetails.tag.includes(AssetEnum.Hunny)) {
      setEstimatedApy('0');
      setApyHelperText('');
    } else if (!poolDetails.isDisabled && apy) {
      if (poolDetails.isHaveApr) {
        setEstimatedApy(delineate(apy[0].toFixed(2)));
        setApyHelperText(`${t('APR')}: ${delineate(apy[1].toFixed(2))}%`);
      } else if (poolDetails.code === HUNNY_AUTO_POOL.code) {
        setEstimatedApy(delineate(apy[0].toFixed(2)));
        setApyHelperText('');
      } else {
        const [pool, _] = apy;
        setEstimatedApy(pool.toFixed(2));

        setApyHelperText('');
      }
    }
  }, [apy, poolId, setApyHelperText, setEstimatedApy]);

  const handleGetReward = useCallback(async () => {
    analytics.sendEvent(
      GOOGLE_ANALYTIC_EVENTS.CLICK_CLAIM_BUTTON,
      poolDetails.code
    );
    executeRequest(pool.getReward(ethereum, account));
  }, [pool, ethereum, account]);

  const rewardDescription = poolDetails.isVesting
    ? t(
        `Profit will be updated every 8 hours based on LOVE rebase schedule in HunnyDAO`
      )
    : t(
        `The %%token%% rewards shown are only estimates and will only be realized upon claiming.`
      ).replace('%%token%%', poolDetails.id === HUNNY_POOL.id ? '' : ' HUNNY');

  return (
    <StyledWrapper>
      {poolDetails.compounding ? (
        <>
          <Stroke />
          <ValueDisplay label={t('Compounding')}>
            {poolDetails.compounding == PoolCompoundingEnum.Manual ? (
              <HunnyBadges type="normal">
                <RefreshIcon style={{ fontSize: 16, paddingTop: 3 }} />
                <span>
                  <Trans>Manual</Trans>
                </span>
              </HunnyBadges>
            ) : (
              <HunnyBadges type="success">
                <SyncIcon style={{ fontSize: 16, paddingTop: 3 }} />
                <span>
                  <Trans>Automatic</Trans>
                </span>
              </HunnyBadges>
            )}
          </ValueDisplay>
        </>
      ) : null}
      <Stroke />

      <ValueDisplay label={t('APY')} description={apyHelperText}>
        {estimatedApy === '' ? (
          <StyledApyContainer>
            <Trans>Loading...</Trans>
          </StyledApyContainer>
        ) : (
          <StyledApyContainer>
            {delineate(estimatedApy)}%
            {poolDetails.apyDescription ? (
              <StyledInfoIcon
                data-for={`apy-description-${poolDetails.code}`}
                data-tip={t(poolDetails.apyDescription)}
              />
            ) : null}
            <HunnyTooltip
              id={`apy-description-${poolDetails.code}`}
              place="bottom"
            />
          </StyledApyContainer>
        )}
      </ValueDisplay>
      <Stroke />

      <ValueDisplay label={t('Contract')}>
        <StyleContractDisplay
          target="_blank"
          href={`${getExplorer()}/address/${pool.Address}`}
        >
          {`${pool.Address.substring(0, 6)}...${pool.Address?.substring(
            pool.Address.length - 4,
            pool.Address.length
          )}`}
        </StyleContractDisplay>
      </ValueDisplay>
      <Stroke />

      <ValueDisplay label={t('Deposit')}>
        <NumberDisplay value={balance} />
        {` ${poolDetails.depositToken.name}`}
      </ValueDisplay>
      <Stroke />

      {isShowWithdrawable ? (
        <>
          <ValueDisplay label={t('Withdrawable')}>
            <NumberDisplay value={withdrawBalance} />
            {` ${poolDetails.depositToken.name}`}
          </ValueDisplay>
          <Stroke />
        </>
      ) : null}
      {!poolDetails.tag.includes(AssetEnum.Hunny) && (
        <>
          <StyledDetailsProfitInfoSection>
            <StyledDisplayLabel>
              <Trans>Profit</Trans>
              <>
                <>
                  <StyledProfitInfoIcon
                    data-for={`apy-profit-${poolDetails.code}`}
                    data-tip={rewardDescription}
                  />

                  <HunnyTooltip
                    id={`apy-profit-${poolDetails.code}`}
                    place="bottom"
                  />
                </>
              </>
            </StyledDisplayLabel>
            <StyledDisplayValue>
              {profit
                ? poolDetails.earn.map((item, index) => (
                    <div key={index}>
                      <NumberDisplay value={profit[index]} />
                      {` ${item.name}`}
                    </div>
                  ))
                : null}
              <StyledEstimatedProfit>
                &asymp;{' '}
                {`${
                  profitInUsd
                    ? delineate(toTokenUnitsBN(profitInUsd, 18).toFixed(2))
                    : '...'
                } USD`}
              </StyledEstimatedProfit>
            </StyledDisplayValue>
            <StyledWrapButtonVsIcon>
              <StyledWrapButtonVsIconContainer>
                {poolDetails.isVesting && (
                  <>
                    <StyledWrapIconInfo
                      data-for={`claim-${poolDetails.code}`}
                      data-tip={
                        poolDetails.isVesting
                          ? `Vesting Schedule: 30 days linear vesting. Vesting start once your harvest.
                            Check and claim your vesting rewards at the Claim Profit session below on this page` /* TODO: add translate later */
                          : t(`Claim by deposit 0 LP token`)
                      }
                    >
                      <StyledHarvestInfoIcon />
                    </StyledWrapIconInfo>
                    {poolDetails.isOnlyClaimAndWithdraw ? (
                      <HunnyTooltip
                        id={`claim-${poolDetails.code}`}
                        place="right"
                      />
                    ) : null}

                    {poolDetails.isVesting ? (
                      <HunnyTooltip
                        id={`claim-${poolDetails.code}`}
                        place="right"
                      />
                    ) : null}
                  </>
                )}
                <StyledClaimButtonContainer>
                  <StyledClaimButton
                    disabled={isPending}
                    onClick={handleGetReward}
                  >
                    {isPending ? (
                      <StyledProgress size={18} />
                    ) : poolDetails.isVesting ? (
                      <>{t('Harvest')}</>
                    ) : (
                      t('Claim')
                    )}
                  </StyledClaimButton>
                </StyledClaimButtonContainer>
              </StyledWrapButtonVsIconContainer>
            </StyledWrapButtonVsIcon>
          </StyledDetailsProfitInfoSection>
          <Stroke />
        </>
      )}

      {poolDetails.type === POOL_TYPES.VENUS && (
        <>
          <ValueDisplay
            label={t('Venus Fee')}
            description={t('Redeem 0.01% x Leverage')}
          >
            <StyledApyContainer>0.01%</StyledApyContainer>
          </ValueDisplay>
          <Stroke />
        </>
      )}

      <ValueDisplay label={t('Balance')}>
        {`${
          balanceInUsd && profitInUsd
            ? delineate(
                toTokenUnitsBN(profitInUsd.plus(balanceInUsd), 18).toFixed(2)
              )
            : '...'
        } USD`}
      </ValueDisplay>
      <Stroke />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
`;

const StyledDetailsProfitInfoSection = styled(StyledDisplayContainer)`
  grid-template-columns: 1fr 1.5fr 0.5fr;
  grid-template-areas: 'label value claimBtn';

  @media (max-width: 768px) {
    grid-template-columns: 1fr 2fr;
    grid-template-areas:
      'label value'
      'label claimBtn';
  } ;
`;

const StyledApyContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
`;

const StyledInfoIcon = styled(InfoIcon)`
  height: 18px !important;
  margin-bottom: 2px;
  margin-left: 2px;
  color: ${(props) => props.theme.color.grey[300]};
`;

const StyledProfitInfoIcon = styled(InfoIcon)`
  height: 14px !important;
  color: ${(props) => props.theme.color.grey[400]};
`;

const StyledEstimatedProfit = styled.div`
  font-size: 14px;
  font-style: italic;
  color: ${(props) => props.theme.color.grey[300]};
  font-weight: 100;
`;

const StyledProgress = styled(CircularProgress)`
  color: #fff !important;
  margin-right: 4px;
`;

const StyleContractDisplay = styled.a`
  cursor: pointer;
  text-decoration: underline;
  color: ${(props) => props.theme.color.grey[300]};

  font-weight: 100;
  font-size: 14px;
`;

const StyledClaimButton = styled.button`
  opacity: 0.9;
  background-color: ${(props) => props.theme.color.purple[100]};
  outline: none;
  border: 0;
  border-radius: 5px;
  cursor: pointer;

  font-size: 14px;
  font-weight: bold;
  color: #fff;
  padding: 16px;
  height: 32px;
  display: flex;
  align-items: center;

  :hover {
    opacity: 1;
  }

  &:disabled {
    background-color: ${(props) => props.theme.color.purple[900]};
    color: ${(props) => props.theme.color.grey[300]};
    opacity: 1 !important;
    cursor: default;
  }
`;

const StyledClaimButtonContainer = styled.div`
  position: relative;

  grid-area: claimBtn;
`;

const StyledHarvestInfoIcon = styled(InfoIcon)`
  height: 16px !important;
`;

const StyledWrapButtonVsIcon = styled.div`
  height: 40px;
  position: relative;
`;

const StyledWrapButtonVsIconContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
  @media (max-width: 768px) {
    margin-top: 8px;
    justify-content: flex-end;
  }
`;

const StyledWrapIconInfo = styled.span`
  color: #fff;
  margin-right: 8px;
  height: 16px;
`;
export default PoolInfo;
