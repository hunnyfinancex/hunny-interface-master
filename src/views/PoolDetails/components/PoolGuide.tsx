import React from 'react';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GOOGLE_ANALYTIC_EVENTS } from '../../../constants/gaEventTemplate';
import { TOKENS } from '../../../constants/tokens';
import analytics from '../../../modules/analytics';
import { TokenDisplay } from '../../../modules/models/tokenDisplay.model';
import {
  getAddress,
  getExchange,
  getPairTokenAddresses,
} from '../../../modules/utils';

export interface PoolGuildProps {
  token: TokenDisplay;
}

const PoolGuild: React.FC<PoolGuildProps> = ({ token }) => {
  let display = <CakeLPGuide token={token} />;
  switch (token) {
    case TOKENS.HUNNY:
      display = <HunnyGuide token={token} />;
      break;
    case TOKENS.BANANA:
      display = <BananaGuide token={token} />;
      break;
    case TOKENS.BANANA_BNB_FLIP:
      display = <BananaLPGuide token={token} />;
      break;
  }

  return (
    <StyledWrapper>
      <StyledHeader>
        <Trans>Step 1. Get {{ token: token.name }} tokens</Trans>
      </StyledHeader>
      {display}
    </StyledWrapper>
  );
};

const CakeLPGuide: React.FC<PoolGuildProps> = ({ token }) => (
  <>
    <StyledContent>
      <Trans i18nKey="poolLPGuideContent">
        {{ token: token.name }} tokens are required. Once you've added liquidity
        to the
        {{ swap: 'PancakeSwap' }} {{ token: token.name }} pool you can deposit
        your liquidity tokens on this page.
      </Trans>
    </StyledContent>

    <StyledRedirectZap
      onClick={() =>
        analytics.sendEvent(
          GOOGLE_ANALYTIC_EVENTS.CLICK_BUY_CAKE_LP_ON_POOL_DETAILS,
          token.name
        )
      }
      to={`/convert/BNB/${getAddress(token.addresses)}`}
    >
      <Trans>Add Liquidity</Trans> 🍯
    </StyledRedirectZap>
  </>
);

const BananaLPGuide: React.FC<PoolGuildProps> = ({ token }) => (
  <>
    <StyledContent>
      <Trans i18nKey="poolLPGuideContent">
        {{ token: token.name }} tokens are required. Once you've added liquidity
        to the
        {{ swap: 'ApeSwap' }} {{ token: token.name }} pool you can deposit your
        liquidity tokens on this page.
      </Trans>
    </StyledContent>

    <StyledRedirectZap
      onClick={() =>
        analytics.sendEvent(
          GOOGLE_ANALYTIC_EVENTS.CLICK_BUY_BANANA_LP_ON_POOL_DETAILS,
          token.name
        )
      }
      to={`/convert/BNB/${getAddress(token.addresses)}`}
    >
      <Trans>Add Liquidity</Trans> 🍯
    </StyledRedirectZap>
  </>
);

const BananaGuide: React.FC<PoolGuildProps> = ({ token }) => (
  <>
    <StyledContent>
      <Trans i18nKey="poolGuideContent">
        Swap BNB to get {{ token: 'BANANA' }} tokens from {{ swap: 'ApeSwap' }}.
        After that you can deposit your {{ token: 'BANANA' }} tokens on this
        page.
      </Trans>
    </StyledContent>

    <StyledRedirectZap
      onClick={() =>
        analytics.sendEvent(
          GOOGLE_ANALYTIC_EVENTS.CLICK_BUY_BANANA_ON_POOL_DETAILS
        )
      }
      to={`/convert/BNB/${getAddress(token.addresses)}`}
    >
      <Trans>Buy {{ token: 'BANANA 🍌' }}</Trans>
    </StyledRedirectZap>
  </>
);

const HunnyGuide: React.FC<PoolGuildProps> = ({ token }) => (
  <>
    <StyledContent>
      <Trans i18nKey="poolGuideContent">
        Swap BNB to get {{ token: 'HUNNY' }} tokens from{' '}
        {{ swap: 'PancakeSwap' }}. After that you can deposit your{' '}
        {{ token: 'HUNNY' }} tokens on this page.
      </Trans>
    </StyledContent>

    <StyledRedirectZap
      onClick={() =>
        analytics.sendEvent(
          GOOGLE_ANALYTIC_EVENTS.CLICK_BUY_HUNNY_ON_POOL_DETAILS
        )
      }
      to={`/convert/BNB/${getAddress(token.addresses)}`}
    >
      <Trans>Buy {{ token: 'HUNNY 🍯' }}</Trans>
    </StyledRedirectZap>
  </>
);

const StyledWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: ${(props) => props.theme.spacing[2]}px
    ${(props) => props.theme.spacing[5]}px;

  @media (max-width: 768px) {
    padding: ${(props) => props.theme.spacing[2]}px
      ${(props) => props.theme.spacing[2]}px;
  } ;
`;

const StyledHeader = styled.h2`
  font-size: 14px;
  color: ${(props) => props.theme.color.grey[200]};
`;

const StyledContent = styled.p`
  font-size: 13px;
  color: ${(props) => props.theme.color.grey[200]};
  font-weight: 100;
  line-height: 20px;
`;

const StyledRedirectZap = styled(Link)`
  display: inline-block;
  padding: 8px;
  border-radius: 5px;
  background-color: #1a1f29;
  margin: 4px 0px 12px 0px;

  cursor: pointer;

  color: ${(props) => props.theme.color.grey[200]};
  font-size: 13px;
  opacity: 0.7;
  font-weight: normal;
  text-decoration: none;
  &:hover {
    opacity: 1;
  }
`;

export default PoolGuild;
