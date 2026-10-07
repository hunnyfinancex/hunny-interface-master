import React from 'react';
import styled, { keyframes } from 'styled-components';
import telegramLogo from '../../../assets/img/icon-telegram.svg';
import twitterLogo from '../../../assets/img/icon-twitter.svg';
import certikLogo from '../../../assets/img/certik-logo.svg';
import leftBunnyGirl from '../../../assets/img/bunnygirl1.png';
import rightbunnyGirl from '../../../assets/img/bunnygirl2.png';

import { delineate, toTokenUnitsBN } from '../../../modules/number';
import { useSelector } from 'react-redux';
import { State } from '../../../modules/models/state.model';
import analytics from '../../../modules/analytics';
import { GOOGLE_ANALYTIC_EVENTS } from '../../../constants/gaEventTemplate';
import LotteryBanner from './LotteryBanner';
import HunnyPlayBanner from './HunnyPlayBanner';
import HunnyPokerBanner from './HunnyPokerBanner';

import InfoIcon from '@material-ui/icons/InfoOutlined';
import HunnyTooltip from '../../../components/Tooltip';
import { Trans, useTranslation } from 'react-i18next';

const FarmHeader: React.FC = () => {
  const { t } = useTranslation();

  const totalDeposit = useSelector(
    (state: State) => state.pools.totalDepositedValue
  );
  const totalMarketCap = useSelector(
    (state: State) => state.pools.totalMarketCap
  );

  const parsedTotalDepositNumber = Number(
    toTokenUnitsBN(totalDeposit, 18).toFixed(2)
  );

  const parsedTotalMarketCap = Number(
    toTokenUnitsBN(totalMarketCap, 18).toFixed(2)
  );

  const antiWhaleLimit = useSelector(
    (state: State) => state.pools.antiWhaleLimit
  );

  const antiWhaleLimitNumber = antiWhaleLimit
    ? delineate(toTokenUnitsBN(antiWhaleLimit, 18).toFixed(1), 0)
    : '...';

  return (
    <StyledContainer>
      <StyledDashBoard>
        <StyledLeftBunnyGirl src={leftBunnyGirl} />

        <StyledStat>
          <StyledStatDescription>
            <Trans>Total Deposited Value</Trans>
          </StyledStatDescription>
          <StyledStatValue>
            <StyledStatHighLightValue>
              {parsedTotalDepositNumber
                ? `$${delineate(toTokenUnitsBN(totalDeposit, 18).toFixed(0))}`
                : t('Loading...')}
              <StyledSpotlight />
            </StyledStatHighLightValue>
          </StyledStatValue>
        </StyledStat>

        <StyledStat>
          <StyledStatDescription>
            <Trans>$HUNNY Market Cap</Trans>
          </StyledStatDescription>
          <StyledStatValue>
            {parsedTotalMarketCap
              ? `$${delineate(toTokenUnitsBN(totalMarketCap, 18).toFixed(0))}`
              : 'Loading...'}
            <StyledSpotlight />
          </StyledStatValue>
        </StyledStat>

        <StyledRightBunnyGirl src={rightbunnyGirl} />
      </StyledDashBoard>
      <StyledAntiWhaleTextContainer>
        <StyledInfoIcon
          data-for={`antiwhale-description`}
          data-tip={t(`antiwhaleDescription`)}
        />
        <StyledAntiWhaleText>
          <Trans i18nKey="antiWhaleContent">
            BUY/SELL Limit {{ antiWhaleLimitNumber }} HUNNY per transaction 🐳
          </Trans>
        </StyledAntiWhaleText>

        <HunnyTooltip id={`antiwhale-description`} place="top" />
      </StyledAntiWhaleTextContainer>
      <StyledPartnerContainer>
        <StyledPartnerLogo
          onClick={() => {
            analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.HEADER_TELEGRAM_CLICK);
          }}
          target="_blank"
          href="https://t.me/HunnyFinance"
        >
          <img src={telegramLogo} style={{ height: 32 }} />
        </StyledPartnerLogo>

        <StyledPartnerLogo
          onClick={() => {
            analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.HEADER_TWITTER_CLICK);
          }}
          target="_blank"
          href="https://twitter.com/hunnyfinance"
        >
          <img src={twitterLogo} style={{ height: 32 }} />
        </StyledPartnerLogo>

        <StyledPartnerLogo
          onClick={() => {
            analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.HEADER_CERTIK_CLICK);
          }}
          target="_blank"
          href="https://www.certik.org/projects/pancakehunny"
        >
          <img src={certikLogo} style={{ height: 32 }} />
        </StyledPartnerLogo>
      </StyledPartnerContainer>
      <StyledBanner>
        <LotteryBanner />
        <div style={{ padding: 8 }}></div>
        <HunnyPlayBanner />
        <div style={{ padding: 8 }}></div>
        <HunnyPokerBanner />
      </StyledBanner>

      <StyledBannerTablet>
        <LotteryBanner />
        <div style={{ padding: 8 }}></div>
        <StyledPlatformBanner>
          <HunnyPlayBanner />
          <div style={{ padding: 8 }}></div>
          <HunnyPokerBanner />
        </StyledPlatformBanner>
      </StyledBannerTablet>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
`;

const StyledBanner = styled.div`
  display: flex;
  margin-top: 16px;

  @media (max-width: 900px) and (min-width: 425px) {
    display: none;
  }

  @media (max-width: 425px) {
    display: flex;
    flex-direction: column;
  }
`;

const StyledBannerTablet = styled.div`
  margin-top: 16px;
  display: none;
  flex-direction: column;
  @media (max-width: 900px) and (min-width: 425px) {
    display: flex;
  }
`;

const StyledPlatformBanner = styled.div`
  display: flex;
`;
const StyledAntiWhaleTextContainer = styled.div`
  width: 100%;

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.02em;

  margin: 24px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.color.grey[200]};
`;
const StyledInfoIcon = styled(InfoIcon)`
  color: ${(props) => props.theme.color.grey[200]};
  margin-right: 6px;
`;

const StyledAntiWhaleText = styled.span``;

const StyledDashBoard = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background: black;
  border: 1px solid #dd68ac;
  box-sizing: border-box;
  border-radius: 20px;
  padding: 16px 0px;
`;

const StyledStat = styled.div`
  margin: 16px 0;
  padding: 0 16px;
`;

const StyledStatDescription = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  color: ${(props) => props.theme.color.grey[400]};
`;

const StyledStatValue = styled.div`
  letter-spacing: 2px;
  position: relative;
  overflow: hidden;
  font-family: 'NeonTubes2';
  margin-top: 16px;
  font-size: 40px;
  font-weight: bold;
  text-shadow: -1px -1px 0 #dd68ac, 0 -1px 0 #dd68ac, 1px -1px 0 #dd68ac,
    1px 0 0 #dd68ac, 1px 1px 0 #dd68ac, 0 1px 0 #dd68ac, -1px 1px 0 #dd68ac,
    -1px 0 0 #dd68ac;

  user-select: none;
  text-align: center;
`;

const lightKeyFrames = keyframes`
  100% {
    transform: translate3d(50%, 50%, 0);
  }
`;
const StyledSpotlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;

  animation: ${lightKeyFrames} 10s infinite linear;

  background: radial-gradient(circle, white, transparent 12%) 0 0 / 25% 25%,
    radial-gradient(circle, white, black 15%) 50% 50% / 12.5% 12.5%;
  top: -100%;
  left: -100%;

  mix-blend-mode: color-dodge;
`;

const StyledStatHighLightValue = styled.div`
  text-shadow: -1px -1px 0 #f3c622, 0 -1px 0 #f3c622, 1px -1px 0 #f3c622,
    1px 0 0 #f3c622, 1px 1px 0 #f3c622, 0 1px 0 #f3c622, -1px 1px 0 #f3c622,
    -1px 0 0 #f3c622;
`;

const StyledPartnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledPartnerLogo = styled.a`
  margin-right: 16px;
  cursor: pointer;
`;

const StyledBunnyGirl = styled.img`
  transition: 0.2s;
  position: absolute;
  height: 180px;
  opacity: 0.97;
  bottom: 6px;

  @media (max-width: ${(props) => props.theme.siteWidth}px) {
    display: none;
  }

  &:hover {
    transform: scale(1.2, 1.2);
  }
`;

const StyledLeftBunnyGirl = styled(StyledBunnyGirl)`
  left: 18px;
`;

const StyledRightBunnyGirl = styled(StyledBunnyGirl)`
  right: 18px;
`;

export default FarmHeader;
