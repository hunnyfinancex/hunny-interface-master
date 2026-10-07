import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import Logo from '../Logo';
import AccountButton from './components/AccountButton';
import HunnyPrice from './components/HunnyPrice';
import Navigation from './components/Navigation';
import hunnyLogo from '../../assets/img/hunny-logo.png';
import { getHUNNYPrice } from '../../modules/utils';
import BuyHunnyButton from './components/BuyHunnyButton';
import AddToMetamask from './components/AddToMetamask';
import useModal from '../../hooks/useModal';
import MobileUtilityModal from './components/MobileUtilityModal';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from '@material-ui/core';
import analytics from '../../modules/analytics';
import { GOOGLE_ANALYTIC_EVENTS } from '../../constants/gaEventTemplate';
import { useAppDispatch } from '../../state';
import { fetchHunnyPrice } from '../../state/app';
import LanguageSelect from 'components/LanguageSelect';

const TopBar: React.FC = () => {
  const [onPresentMyWalletModal] = useModal(<MobileUtilityModal />);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetch = async () => {
      dispatch(fetchHunnyPrice());
    };

    fetch();

    const interval = setInterval(fetch, 15000);
    return () => clearInterval(interval);
  }, []);

  const onUtilityIconClick = useCallback(() => {
    analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.UTILITY_MOBILE_CLICK);
    onPresentMyWalletModal();
  }, [onPresentMyWalletModal]);

  return (
    <StyledTopBar>
      <StyledContainer>
        <StyledTopBarInner>
          <StyledLogoContainer
            onClick={() => {
              analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.HUNNY_LOGO_CLICK);
            }}
          >
            <Logo />
          </StyledLogoContainer>

          <StyledMobileLogoContainer>
            <img src={hunnyLogo} height="32" />
            <StyledBuyHunnyMobileContainer>
              <BuyHunnyButton />
            </StyledBuyHunnyMobileContainer>
          </StyledMobileLogoContainer>

          <Navigation />
          <StyledUtilityIcon>
            <IconButton onClick={onUtilityIconClick}>
              <MenuIcon style={{ color: 'white' }} />
            </IconButton>
          </StyledUtilityIcon>

          <StyledAccountWrapper>
            <StyledLanguageSelectMobileContainer>
              <LanguageSelect />
            </StyledLanguageSelectMobileContainer>

            <StyledBuyHunnyContainer>
              <BuyHunnyButton />
            </StyledBuyHunnyContainer>
            <StyledHunnyPriceContainer>
              <HunnyPrice />
            </StyledHunnyPriceContainer>

            <StyledAddToMetamaskContainer>
              <AddToMetamask />
            </StyledAddToMetamaskContainer>

            <AccountButton />
          </StyledAccountWrapper>
        </StyledTopBarInner>
      </StyledContainer>
      <StyledLanguageSelectContainer>
        <LanguageSelect />
      </StyledLanguageSelectContainer>
    </StyledTopBar>
  );
};

const StyledContainer = styled.div`
  max-width: 1200px;
  position: relative;
  width: 100%;
  height: 100%;
`;

const StyledLanguageSelectContainer = styled.div`
  position: absolute;
  right: 22px;

  @media (max-width: 1330px) {
    display: none;
  } ;
`;

const StyledLanguageSelectMobileContainer = styled.div`
  display: none;
  @media (max-width: 1023px) {
    display: flex;
    flex: 1;
    justify-content: flex-end;
  }

  @media (max-width: 374px) {
    display: none;
  } ;
`;

const StyledBuyHunnyContainer = styled.div`
  margin-right: 42px;
  margin-bottom: 2px;

  @media (max-width: 550px) {
    display: none;
  } ;
`;

const StyledBuyHunnyMobileContainer = styled.div`
  padding-top: 7px;
`;

const StyledUtilityIcon = styled.div`
  display: none;
  @media (max-width: 1023px) {
    display: inline-block;
  } ;
`;

const StyledTopBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
`;

const StyledTopBarInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
`;

const StyledAddToMetamaskContainer = styled.div`
  margin-right: 8px;
  @media (max-width: 1150px) {
    display: none;
  } ;
`;

const StyledHunnyPriceContainer = styled.div`
  @media (max-width: 1023px) {
    margin: 8px 8px 8px 34px;
  } ;
`;

const StyledAccountWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 1023px) {
    flex-direction: row-reverse;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 8px;
    height: ${(props) => props.theme.botBarSize}px;
    z-index: 1;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
  } ;
`;

const StyledLogoContainer = styled.div`
  position: absolute;
  height: 42px;
  display: flex;
  left: 0;
  @media (max-width: 550px) {
    display: none;
  } ;
`;

const StyledMobileLogoContainer = styled.div`
  display: none;
  @media (max-width: 550px) {
    position: absolute;
    display: flex;
    left: 0;
  } ;
`;

export default TopBar;
