import React, { useCallback } from 'react';
import { Trans } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { GOOGLE_ANALYTIC_EVENTS } from '../../../constants/gaEventTemplate';
import analytics from '../../../modules/analytics';
import HunnyBadges from '../../HunnyBadges';

const Navigation: React.FC = () => {
  return (
    <StyledWrapper>
      <StyledNavLink
        onClick={() =>
          analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.POOL_NAV_CLICK)
        }
        activeClassName="is-active"
        className="main"
        to="/pools"
      >
        <span>
          <Trans>Pool</Trans>
        </span>
      </StyledNavLink>

      <StyledNavLink
        onClick={() =>
          analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.LOTTERY_NAV_CLICK)
        }
        activeClassName="is-active"
        to="/lottery"
      >
        <span>
          <Trans>Lottery</Trans>
        </span>
      </StyledNavLink>

      <StyledNavLink
        onClick={() =>
          analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.CONVERT_CLICK)
        }
        exact={true}
        activeClassName="is-active"
        to="/convert"
      >
        <span>
          <Trans>Convert</Trans>
        </span>
      </StyledNavLink>

      <StyledComingNavLink
        as="a"
        onClick={() => analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.DAO_CLICK)}
        target="_blank"
        href="https://dao.hunny.finance/"
      >
        <span>
          <Trans>DAO</Trans>
        </span>
      </StyledComingNavLink>

      <StyledComingNavLink
        as="a"
        onClick={() => analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.PLAY_CLICK)}
        target="_blank"
        href="https://hunnyplay.io/"
      >
        <span>
          <Trans>Play</Trans>
        </span>
      </StyledComingNavLink>

      <StyledComingNavLink
        as="a"
        onClick={() => analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.POKER_CLICK)}
        target="_blank"
        href="https://hunnypoker.com/"
      >
        <span>
          <Trans>Poker</Trans>
        </span>
      </StyledComingNavLink>

      <StyledComingNavLink
        onClick={() => {
          analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.NFT_CLICK);
          window.location.href = 'https://nft.hunny.finance';
        }}
        exact={true}
        activeClassName="is-active"
        to="/"
        style={{ position: 'relative' }}
      >
        <span>
          <Trans>NFT</Trans>
        </span>
      </StyledComingNavLink>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  height: 100%;
  margin-right: 10px;

  @media (max-width: 1023px) {
    margin-right: 1em;
  }

  @media (max-width: 425px) {
    margin-right: 0em;
  } ;
`;

const StyledNavLink = styled(NavLink)`
  height: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  font-size: 15px;
  font-style: normal;
  font-weight: bold;

  color: #ffffff;

  padding-right: ${(props) => props.theme.spacing[3]}px;
  padding-left: ${(props) => props.theme.spacing[3]}px;

  @media (max-width: 1023px) {
    padding-right: ${(props) => props.theme.spacing[2]}px;
    padding-left: ${(props) => props.theme.spacing[2]}px;
  }

  span {
    opacity: 0.6;
  }

  &:hover {
    span {
      transition: 0.2s;
      opacity: 1;
    }
  }

  &.is-active {
    span {
      opacity: 1 !important;
      color: #ec65b3;
      font-weight: bold;
    }
  }

  @media (max-width: 374px) {
    &.main {
      display: flex;
    }

    display: none;
  }
`;

const StyledComingNavLink = styled(StyledNavLink)`
  @media (max-width: 600px) {
    display: none;
  }
`;

const StyledText = styled.a`
  font-weight: bold;
  height: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  font-size: 15px;
  font-style: normal;

  color: #ffffff;

  padding-right: ${(props) => props.theme.spacing[3]}px;
  padding-left: ${(props) => props.theme.spacing[3]}px;

  @media (max-width: 1023px) {
    padding-right: ${(props) => props.theme.spacing[2]}px;
    padding-left: ${(props) => props.theme.spacing[2]}px;
  }

  span {
    opacity: 0.6;
  }

  &:hover span {
    transition: 0.2s;
    opacity: 1 !important;
  }
`;

const StyledComingNavText = styled(StyledText)`
  @media (max-width: 550px) {
    display: none;
  }
`;

const StyledComingBadge = styled.div`
  top: 5px;
  right: -18px;
  position: absolute;

  @media (max-width: 424px) {
    display: none;
  } ;
`;

const StyledComingPage = styled.span`
  padding-right: 24px;
  @media (max-width: 424px) {
    padding-right: 0;
  } ;
`;

export default Navigation;
