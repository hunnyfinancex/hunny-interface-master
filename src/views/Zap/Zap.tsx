import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';
import ZapForm from './component/ZapForm';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import { ZapTabEnum } from '../../modules/enums/Zap.enum';
import TokenSelectList from './component/TokenSelectList';
import { useZap } from '../../hooks/Zap/useZap';
import { useSelector } from 'react-redux';
import { State } from '../../modules/models/state.model';
import { useAppDispatch } from '../../state';
import { updatePayToken, updateReceiveToken, updateTab } from '../../state/zap';
import { useHistory, useParams } from 'react-router-dom';
import { TOKENS_ZAP, ZAP_TOKEN_LIST } from '../../constants/tokens';
import { getAddress } from '../../modules/utils';
import { Trans } from 'react-i18next';

export interface ZapProps {
  isPayBNB?: boolean;
  isBackable?: boolean;
}

const Zap: React.FC<ZapProps> = ({ isPayBNB, isBackable }) => {
  useZap();
  const dispatch = useAppDispatch();
  const { receiveTokenAddress }: { receiveTokenAddress: string } =
    useParams() as any;
  const history = useHistory();

  useEffect(() => {
    if (isPayBNB) {
      dispatch(updatePayToken(TOKENS_ZAP.BNB));
    }
  }, [isPayBNB]);

  useEffect(() => {
    if (receiveTokenAddress) {
      const token = ZAP_TOKEN_LIST.find(
        (item) =>
          getAddress(item.addresses).toLowerCase() ===
          receiveTokenAddress.toLowerCase()
      );
      dispatch(updateReceiveToken(token));
    }
  }, [receiveTokenAddress]);

  const tab = useSelector((state: State) => state.zap.tab);

  const goBackDashBoard = () => {
    dispatch(updateTab(ZapTabEnum.Dashboard));
  };

  return (
    <StyledWrapper>
      <Container>
        <StyledContainerInner>
          <StyledCardDetailsHeader>
            <StyledCardDetailsTitle>
              <Trans>Convert Tokens to Tokens/LP Tokens</Trans>
            </StyledCardDetailsTitle>
            <StyledCardDetailsSubTitle>
              <Trans>Conversion uses pancakeswap & apeswap *no extra fee</Trans>
            </StyledCardDetailsSubTitle>
          </StyledCardDetailsHeader>

          <StyledCardDetails>
            <StyledTabContainer
              className={tab === ZapTabEnum.Dashboard ? 'active' : ''}
            >
              {isBackable && (
                <StyledBackBtnContainer>
                  <IconButton onClick={() => history.goBack()}>
                    <StyledBackIcon />
                  </IconButton>
                </StyledBackBtnContainer>
              )}

              <ZapForm />
            </StyledTabContainer>

            <StyledTabContainer
              className={
                tab === ZapTabEnum.ReceiveTokenList ||
                tab === ZapTabEnum.PayTokenList
                  ? 'active'
                  : ''
              }
            >
              <StyledBackBtnContainer>
                <IconButton onClick={goBackDashBoard}>
                  <StyledBackIcon />
                </IconButton>
              </StyledBackBtnContainer>

              <TokenSelectList />
            </StyledTabContainer>
          </StyledCardDetails>
        </StyledContainerInner>
      </Container>
    </StyledWrapper>
  );
};
const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const StyledTabContainer = styled.div`
  opacity: 0;
  pointer-events: none;
  position: absolute;

  &.active {
    opacity: 1;
    position: static;
    pointer-events: auto;
    transition: opacity 0.3s ease-in-out;
  }
`;

const StyledBackIcon = styled(ArrowBackIcon)`
  color: ${(props) => props.theme.color.grey[200]};
`;

const StyledContainerInner = styled.div`
  margin: auto;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing[7]}px;
`;

const StyledBackBtnContainer = styled.div`
  position: absolute;
  top: 2px;
  left: 2px;
  position: absolute;
`;

const StyledCardDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.spacing[6]}px
    ${(props) => props.theme.spacing[2]}px
    ${(props) => props.theme.spacing[4]}px
    ${(props) => props.theme.spacing[2]}px;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(108, 108, 108, 0.15);
  border-radius: 10px;

  @media (max-width: 768px) {
    border-radius: 2px;
  }
`;

const StyledCardDetailsHeader = styled.div`
  text-align: center;
  width: 100%;
  margin-top: ${(props) => props.theme.spacing[1]}px;
  margin-bottom: ${(props) => props.theme.spacing[5]}px;
`;

const StyledCardDetailsTitle = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  color: ${(props) => props.theme.color.purple[200]};
  margin-top: ${(props) => props.theme.spacing[2]}px;
`;

const StyledCardDetailsSubTitle = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  opacity: 0.8;

  color: ${(props) => props.theme.color.yellow[100]};
`;

export default Zap;
