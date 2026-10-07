import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PoolCardItemViewModel } from '../../../modules/models/poolCardItemViewmodel.model';
import BigNumber from 'bignumber.js';
import { useWallet } from 'use-wallet';
import { getAddress } from '../../../modules/utils';
import { ActionTypeEnum } from '../../../modules/enums/PoolDetails.enum';
import { usePool } from '../../../hooks/usePool';
import { DEFAULT_TIME, generateTimeDisplay } from '../../../modules/dateTime';
import { useTranslation } from 'react-i18next';

interface PoolFeeDescriptionProps {
  poolDetails: PoolCardItemViewModel;
  withdrawBalance: BigNumber;
  actionType: ActionTypeEnum;
}

const PoolFeeDescription: React.FC<PoolFeeDescriptionProps> = ({
  poolDetails,
  withdrawBalance,
  actionType,
}) => {
  const { account } = useWallet();
  const { t } = useTranslation();

  const [withdrawNoFeeDate, setWithdrawNoFeeDate] = useState(new Date());
  const [withdrawFeeDescription, setWithdrawFeeDescription] = useState('');

  const pool = usePool(getAddress(poolDetails.addresses));
  const defaultWithdrawFeeDescription = poolDetails.isNoWithdrawFee
    ? t('No withdraw fee')
    : t('0.5% fee for withdrawals within 48 hours');

  useEffect(() => {
    if (account) {
      const fetch = async () => {
        let timestamp = null;

        if (!poolDetails.isWarning) {
          timestamp = await pool.depositedAt(account);
        }

        if (!timestamp) {
          return;
        }
        const depositedDate = new Date(timestamp * 1000);
        const endDate = new Date(
          depositedDate.setHours(depositedDate.getHours() + 48)
        );
        setWithdrawNoFeeDate(endDate);
      };

      fetch();
    }
  }, [withdrawBalance, account, setWithdrawNoFeeDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      const _timeDisplay = generateTimeDisplay(
        withdrawNoFeeDate,
        withdrawNoFeeDate.getTimezoneOffset() / -60
      );
      if (_timeDisplay === DEFAULT_TIME) {
        setWithdrawFeeDescription(defaultWithdrawFeeDescription);
        clearInterval(interval);
        return;
      }
      const description = t(
        '0.5% fee for withdrawals within %%time%% left'
      ).replace(
        '%%time%%',
        `${
          _timeDisplay.days
            ? 24 + _timeDisplay.hours
            : _timeDisplay.hours.toString().padStart(2, '0')
        }:${_timeDisplay.minutes
          .toString()
          .padStart(2, '0')}:${_timeDisplay.seconds.toString().padStart(2, '0')}
      `
      );
      setWithdrawFeeDescription(description);
    }, 1000);

    return () => clearInterval(interval);
  }, [withdrawNoFeeDate, t]);

  return (
    <StyledFee>
      {actionType === ActionTypeEnum.Deposit
        ? t('No deposit fee')
        : withdrawFeeDescription}
    </StyledFee>
  );
};

const StyledFee = styled.div`
  margin-top: ${(props) => props.theme.spacing[1]}px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: ${(props) => props.theme.color.grey[400]};
`;

export default PoolFeeDescription;
