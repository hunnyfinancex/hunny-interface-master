import React from 'react';
import { Trans } from 'react-i18next';
import styled from 'styled-components';
import { GOOGLE_ANALYTIC_EVENTS } from '../../../constants/gaEventTemplate';
import analytics from '../../../modules/analytics';

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink
        onClick={() =>
          analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.FOOTER_GITHUB_CLICK)
        }
        target="_blank"
        href="https://github.com/HunnyFinance"
      >
        Github
      </StyledLink>
      <StyledLink
        onClick={() =>
          analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.FOOTER_DOCUMENT_CLICK)
        }
        target="_blank"
        href="https://docs.hunny.finance/"
      >
        <Trans>Document</Trans>
      </StyledLink>
      <StyledLink
        onClick={() =>
          analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.FOOTER_MEDIUM_CLICK)
        }
        target="_blank"
        href="https://medium.com/hunnyfinance"
      >
        Medium
      </StyledLink>
      <StyledLink target="_blank" href="https://blog.hunny.finance/">
        Blog
      </StyledLink>
      <StyledLink
        onClick={() =>
          analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.FOOTER_TELEGRAM_CLICK)
        }
        target="_blank"
        href="https://t.me/HunnyFinance"
      >
        Telegram
      </StyledLink>
      <StyledLink
        onClick={() =>
          analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.FOOTER_TWITTER_CLICK)
        }
        target="_blank"
        href="https://twitter.com/hunnyfinance"
      >
        Twitter
      </StyledLink>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  @media (max-width: 450px) {
    flex-direction: column;
    width: 100%;
  } ;
`;

const StyledLink = styled.a`
  box-sizing: border-box;
  color: ${(props) => props.theme.color.grey[200]};
  font-size: 14px;
  opacity: 0.8;
  font-weight: normal;
  padding: 16px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[300]};
  }

  @media (max-width: 450px) {
    width: 100%;
    text-align: center;
  } ;
`;

export default Nav;
