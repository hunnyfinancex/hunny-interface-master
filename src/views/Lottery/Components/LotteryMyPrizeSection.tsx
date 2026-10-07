import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import LotteryButton from './LotteryButton';
import hunnyLogo from '../../../assets/img/hunny-logo.png';

import { useWallet } from 'use-wallet';
import { claimLotteryReward } from '../../../modules/lottery';
import { toTokenUnitsBN } from '../../../modules/number';
import NumberDisplay from '../../../components/NumberDisplay';
import useExecute from '../../../hooks/useExecute';
import { CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { State } from '../../../modules/models/state.model';
import HunnyLoader from '../../../components/HunnyLoader';
import { useAppDispatch } from '../../../state';
import { fetchMyPrize } from '../../../state/lottery';

import { Trans, useTranslation } from 'react-i18next';

const LotteryMyPrizeSection: React.FC = () => {
  const { isPending, executeRequest } = useExecute();
  const { ethereum, account } = useWallet();
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const hunnyPrice = useSelector((state: State) => state.app.hunnyPrice);

  const myPrize = useSelector((state: State) => state.lottery.myPrize);

  const isLoading = useSelector((state: State) => state.lottery.isPrizeLoading);

  const handleClaim = useCallback(async () => {
    if (ethereum && account) {
      executeRequest(
        claimLotteryReward(ethereum, account, myPrize.tokens),
        (hash: string) => {
          dispatch(fetchMyPrize(account));
        }
      );
    }
  }, [ethereum, account, myPrize]);

  return (
    <>
      <StyledHeader>
        <Trans>My Prize</Trans>
      </StyledHeader>
      <StyledMyPrizeContainer>
        {isLoading ? (
          <StyledLoaderContainer>
            <HunnyLoader />
            <StyledLoadingText>
              <Trans>Loading...</Trans>
            </StyledLoadingText>
          </StyledLoaderContainer>
        ) : (
          <>
            <StyledMyPrizeContentContainer>
              <StyledHunnyLogo src={hunnyLogo} />
              {myPrize.prize.eq(0) ? (
                <StyledMyPrizeContent>
                  <Trans>Sorry, no Prizes to collect.</Trans>
                </StyledMyPrizeContent>
              ) : (
                <StyledMyPrizeValue>
                  <NumberDisplay value={myPrize.prize} fixed={3} />
                  <StyledMyPrizeInUsd>
                    {`(~ $${toTokenUnitsBN(
                      myPrize.prize.multipliedBy(hunnyPrice),
                      18
                    ).toFixed(3)})`}
                  </StyledMyPrizeInUsd>
                </StyledMyPrizeValue>
              )}
            </StyledMyPrizeContentContainer>
            {!myPrize.prize.isEqualTo(0) && (
              <StyledMyPrizeClaimButton>
                <LotteryButton onClick={handleClaim}>
                  {isPending ? <StyledProgress size={18} /> : t('Claim')}
                </LotteryButton>
              </StyledMyPrizeClaimButton>
            )}
          </>
        )}
      </StyledMyPrizeContainer>
    </>
  );
};

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
`;

const StyledMyPrizeContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const StyledHunnyLogo = styled.img``;

const StyledMyPrizeContent = styled.span`
  color: ${(props) => props.theme.color.grey[300]};
  font-size: 14px;
  font-weight: 100;
`;

const StyledMyPrizeValue = styled.div`
  margin-top: 12px;
  font-size: 32px;
  line-height: 55px;
  color: #ffffff;
  font-weight: 700;

  text-shadow: 4px 4px 20px #e960af;
`;

const StyledMyPrizeInUsd = styled.span`
  font-size: 14px;
  margin-left: 8px;
  font-weight: 100;
  color: ${(props) => props.theme.color.yellow[100]};
  text-shadow: none;
`;

const StyledMyPrizeContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  min-width: 270px;
`;

const StyledMyPrizeClaimButton = styled.div`
  width: 100px;
  @media (max-width: 274px) {
    width: 100%;
  }
`;

const StyledProgress = styled(CircularProgress)`
  color: #fff !important;
  margin-right: 4px;
`;

const StyledLoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  text-align: center;
`;

const StyledLoadingText = styled.div`
  font-size: 16px;
  color: ${(props) => props.theme.color.grey[200]};
`;

export default LotteryMyPrizeSection;
