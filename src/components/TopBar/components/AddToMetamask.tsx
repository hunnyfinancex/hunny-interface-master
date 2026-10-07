import React from 'react';
import styled from 'styled-components';

import metamaskLogo from '../../../assets/img/metamask-fox.svg';
import { GOOGLE_ANALYTIC_EVENTS } from '../../../constants/gaEventTemplate';
import { TOKENS } from '../../../constants/tokens';
import analytics from '../../../modules/analytics';
import { addTokenToMetaMask } from '../../../modules/utils';

const AddToMetamask: React.FC = () => {
  const addHunnyToMetamask = () => {
    analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.ADD_TOKEN_METAMASK_CLICK);

    addTokenToMetaMask(
      TOKENS.HUNNY,
      'https://hunny.finance/logo-hunny.png'
    );
  };

  return (
    <StyledWrapper onClick={addHunnyToMetamask}>
      <StyledAdd>+</StyledAdd>
      <img src={metamaskLogo} style={{ height: 26, marginBottom: 2 }} />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  border-radius: 20px;
  cursor: pointer;

  background-color: rgba(225, 225, 225, 0.2);
  padding: 7px 16px;

  &:hover {
    background-color: rgba(225, 225, 225, 0.3);
  }
`;

const StyledAdd = styled.span`
  color: #dd68ac;
  display: inline-block;
  font-weight: bold;
  margin-right: 8px;
  font-size: 22px;
`;

export default AddToMetamask;
