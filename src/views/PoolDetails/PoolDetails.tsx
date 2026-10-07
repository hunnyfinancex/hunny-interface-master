import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import ToggleButton from '../../components/ToggleButton';
import styled from 'styled-components';
import PoolInfo from './components/PoolInfo';
import CardDetailsContainer from '../../components/CardDetailsContainer';
import { ActionTypeEnum } from '../../modules/enums/PoolDetails.enum';
import PoolForm from './components/PoolForm';
import PoolGuild from './components/PoolGuide';
import { useSelector } from 'react-redux';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import { State } from '../../modules/models/state.model';
import { usePoolDetails } from '../../hooks/PoolDetails/usePoolDetails';
import { GOOGLE_ANALYTIC_EVENTS } from '../../constants/gaEventTemplate';
import { Trans, useTranslation } from 'react-i18next';
import HowToStart from 'components/HowToStart';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import HunnyBadges from 'components/HunnyBadges';
import VestingInfo from './components/VestingInfo';
import { useWallet } from 'use-wallet';
import HunnyTooltip from 'components/Tooltip';

const toggleValues: [any, any] = [
  ActionTypeEnum.Deposit,
  ActionTypeEnum.WithDraw,
];

const PoolDetails: React.FC = () => {
  const { poolCode } = useParams() as any;
  const { account } = useWallet();

  const { t } = useTranslation();

  const [action, setAction] = useState(ActionTypeEnum.Deposit);

  const poolDetails = useSelector((state: State) =>
    state.pools.pools[state.pools.selectedPoolType].find(
      (item) => item.code === poolCode
    )
  );
  const balance = useSelector(
    (state: State) =>
      state.pools.pools[state.pools.selectedPoolType].find(
        (item) => item.code === poolCode
      ).tokenBalance
  );

  usePoolDetails(poolDetails);

  const handleStateChange = useCallback(
    (value: ActionTypeEnum) => {
      setAction(value);
    },
    [setAction]
  );

  return (
    <StyledWrapContainer>
      <CardDetailsContainer>
        <StyledCardDetailsHeader
          data-for={`vesting-${poolDetails.code}`}
          data-tip={`LOVE Maximizer use a unique compounding strategy. The pool converts rewards to LOVE & auto-compound profit to achieve the highest APYs while still protecting initial capital.`}
        >
          <img src={poolDetails.logo} height="52" />
          <StyledCardDetailsTitle>
            {poolDetails.poolName}

            {poolDetails.isVesting && (
              <HunnyTooltip id={`vesting-${poolDetails.code}`} place="bottom" />
            )}
          </StyledCardDetailsTitle>
          <StyledCardDetailsSubTitle>
            {t(poolDetails.description)}
            {poolDetails.isVesting && <StyledInfoIcon />}
          </StyledCardDetailsSubTitle>

          {poolDetails.isPause && (
            <>
              <div style={{ height: 4 }} />
              <HunnyBadges type="error">
                <PauseRoundedIcon />
                <Trans>Deposit Pause</Trans>
              </HunnyBadges>

              <StyledPauseText>
                <Trans>Deposits are paused for this vault.</Trans>
              </StyledPauseText>
            </>
          )}
        </StyledCardDetailsHeader>

        {poolDetails.displayGuild && balance && !balance.gt(0) ? (
          <StyledPoolGuideContainer>
            <PoolGuild token={poolDetails.depositToken} />
          </StyledPoolGuideContainer>
        ) : null}

        <StyledContainer>
          <PoolInfo poolId={poolDetails.id} />

          <StyledToggleButtonContainer>
            <ToggleButton
              rightContent={t('Withdraw')}
              leftContent={t('deposit_btn', 'Deposit')}
              values={toggleValues}
              onValueChanged={handleStateChange}
              leftButtonTrackingEvent={
                GOOGLE_ANALYTIC_EVENTS.CLICK_DEPOST_TOGGLE_ON_POOL_DETAILS
              }
              rightButtonTrackingEvent={
                GOOGLE_ANALYTIC_EVENTS.CLICK_WITHDRAW_TOGGLE_ON_POOL_DETAILS
              }
            />
          </StyledToggleButtonContainer>

          <PoolForm actionType={action} poolId={poolDetails.id} />
        </StyledContainer>
      </CardDetailsContainer>
      {account && <VestingCard />}

      <HowToStart />
    </StyledWrapContainer>
  );
};

const VestingCard: React.FC = () => {
  const { poolCode } = useParams() as any;

  const poolDetails = useSelector((state: State) =>
    state.pools.pools[state.pools.selectedPoolType].find(
      (item) => item.code === poolCode
    )
  );

  return poolDetails.isVesting &&
    (poolDetails.tokenVestingUnlocked?.gt(0) ||
      poolDetails.tokenVestingClaimable?.gt(0) ||
      poolDetails.balance?.gt(0) ||
      (poolDetails?.profit && poolDetails.profit[0]?.gt(0))) ? (
    <CardDetailsContainer style={{ marginTop: 32 }} disableBack>
      <StyledCardDetailsHeader>
        <StyledCardDetailsTitle>
          <Trans> Claim Profit</Trans>
        </StyledCardDetailsTitle>
      </StyledCardDetailsHeader>
      <StyledContainer>
        <VestingInfo poolId={poolDetails.id} />
      </StyledContainer>
    </CardDetailsContainer>
  ) : null;
};

const StyledWrapContainer = styled.div`
  margin: ${(props) => props.theme.spacing[6]}px 0px;
`;

const StyledContainer = styled.div`
  padding: 0px ${(props) => props.theme.spacing[4]}px;
  padding: 12px;
`;

const StyledCardDetailsHeader = styled.div`
  text-align: center;
  width: 100%;
  margin-top: ${(props) => props.theme.spacing[5]}px;
  margin-bottom: ${(props) => props.theme.spacing[3]}px;
`;

const StyledCardDetailsTitle = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  color: ${(props) => props.theme.color.purple[200]};
  margin-top: ${(props) => props.theme.spacing[2]}px;
`;

const StyledInfoIcon = styled(InfoIcon)`
  height: 20px !important;
  margin-bottom: 6px;
  margin-left: 2px;
`;

const StyledCardDetailsSubTitle = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.color.yellow[100]};
`;

const StyledToggleButtonContainer = styled.div`
  margin-top: ${(props) => props.theme.spacing[4]}px;
  height: 46px;
  line-height: 46px;
  border-radius: 5px;
`;

const StyledPoolGuideContainer = styled.div`
  padding: 0px ${(props) => props.theme.spacing[4]}px;
  box-sizing: border-box;
  background-color: rgba(214, 91, 161, 0.15);
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const StyledPauseText = styled.div`
  font-size: 16px;
  line-height: 20px;
  color: #ff3b3b;
  margin-top: 4px;
`;

export default PoolDetails;
