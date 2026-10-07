import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Stroke from '../../../components/Stroke';
import ValueDisplay from '../../../components/ValueDisplay';
import NumberDisplay from '../../../components/NumberDisplay';
import { useSelector } from 'react-redux';
import { State } from '../../../modules/models/state.model';
import { Trans, useTranslation } from 'react-i18next';
import useExecute from 'hooks/useExecute';
import { usePool } from 'hooks/usePool';
import { getAddress } from 'modules/utils';
import { useWallet } from 'use-wallet';
import { CircularProgress } from '@material-ui/core';

export interface VestingInfoProps {
  poolId: Number;
}

const VestingInfo: React.FC<VestingInfoProps> = ({ poolId }) => {
  const { t } = useTranslation();

  const { ethereum, account } = useWallet();
  const { isPending, executeRequest } = useExecute();

  const poolDetails = useSelector((state: State) =>
    state.pools.pools[state.pools.selectedPoolType].find(
      (item) => item.id === poolId
    )
  );

  const pool = usePool(getAddress(poolDetails?.addresses));

  const tokenAmount = useSelector(
    (state: State) =>
      state.pools.pools[state.pools.selectedPoolType].find(
        (item) => item.id === poolId
      ).tokenVestingAmount
  );

  const tokenUnlockedAmount = useSelector(
    (state: State) =>
      state.pools.pools[state.pools.selectedPoolType].find(
        (item) => item.id === poolId
      ).tokenVestingUnlocked
  );

  const tokenClaimable = useSelector(
    (state: State) =>
      state.pools.pools[state.pools.selectedPoolType].find(
        (item) => item.id === poolId
      ).tokenVestingClaimable
  );

  const tokenExitAmount = useSelector(
    (state: State) =>
      state.pools.pools[state.pools.selectedPoolType].find(
        (item) => item.id === poolId
      ).tokenExitAmount
  );

  const onClaim = useCallback(async () => {
    if (ethereum && account) {
      executeRequest(pool.claimVesting(ethereum, account), (hash: string) => {
        // TODO handle claim success
      });
    }
  }, [ethereum, account, tokenClaimable]);

  return (
    <StyledWrapper>
      <ValueDisplay
        label={`${poolDetails?.earn[0].name} ${t(`to be unlock`)}`}
        style={{ textAlign: 'right' }}
      >
        {!tokenAmount ? (
          <Trans>Loading...</Trans>
        ) : (
          <>
            <NumberDisplay
              value={tokenAmount}
              decimals={poolDetails?.earn[0].decimals}
            />{' '}
            {poolDetails?.earn[0].name}
          </>
        )}
      </ValueDisplay>
      <Stroke />

      <ValueDisplay
        label={`${poolDetails?.earn[0].name} ${t(`unlocked`)}`}
        style={{ textAlign: 'right' }}
      >
        {!tokenUnlockedAmount ? (
          <Trans>Loading...</Trans>
        ) : (
          <>
            <NumberDisplay
              value={tokenUnlockedAmount}
              decimals={poolDetails?.earn[0].decimals}
            />{' '}
            {poolDetails?.earn[0].name}
          </>
        )}
      </ValueDisplay>
      <Stroke />

      <ValueDisplay
        label={`${t(`Early exit Penalty`)}`}
        style={{ textAlign: 'right', color: '#F3C622' }}
        hint="50% penalty when you claim LOVE before your LOVE is fully unlocked"
      >
        {!tokenClaimable ? (
          <Trans>Loading...</Trans>
        ) : (
          <>
            <NumberDisplay
              value={tokenExitAmount}
              decimals={poolDetails?.earn[0].decimals}
            />{' '}
            {poolDetails?.earn[0].name}
          </>
        )}
      </ValueDisplay>
      <Stroke />

      <ValueDisplay
        label={`${poolDetails?.earn[0].name} ${t(`claimable`)}`}
        style={{ textAlign: 'right' }}
      >
        {!tokenClaimable ? (
          <Trans>Loading...</Trans>
        ) : (
          <>
            <NumberDisplay
              value={tokenClaimable}
              decimals={poolDetails?.earn[0].decimals}
            />{' '}
            {poolDetails?.earn[0].name}
          </>
        )}
      </ValueDisplay>

      <StyledSubmitButton
        disabled={isPending || tokenClaimable?.eq(0)}
        onClick={onClaim}
      >
        {isPending ? <StyledProgress size={18} /> : null}
        <Trans>Claim</Trans>
      </StyledSubmitButton>

      <StyledText style={{ marginTop: 24 }}>
        Vesting Schedule: 30 days linear vesting. You can immediately receive
        your rewards by taking a 50% exit penalty if you do not wish to wait.
      </StyledText>
      <StyledText style={{ margin: '12px 0px' }}>
        Please don’t claim too frequently as you have to pay gas fee every time
        you claim.
      </StyledText>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
`;

const StyledSubmitButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.purple[100]};
  outline: none;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  height: 46px;
  line-height: 46px;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  opacity: 0.9;
  margin-top: 12px;

  &:disabled {
    background-color: ${(props) => props.theme.color.purple[900]};
    color: ${(props) => props.theme.color.grey[300]};
    opacity: 1 !important;
    cursor: default;
  }

  &:hover {
    opacity: 1;
  }
`;

const StyledProgress = styled(CircularProgress)`
  color: #fff !important;
  margin-right: 4px;
`;

export const StyledText = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;

  grid-area: label;
  letter-spacing: 0.5px;
  text-align: start;

  color: ${(props) => props.theme.color.grey[400]};
`;

export default VestingInfo;
