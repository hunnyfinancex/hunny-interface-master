import React from 'react';
import styled from 'styled-components';
import analytics from '../../../modules/analytics';
import { GOOGLE_ANALYTIC_EVENTS } from '../../../constants/gaEventTemplate';
import { Trans } from 'react-i18next';

const BuyHunnyButton: React.FC = () => {
  return (
    <StyleTextButton
      onClick={() => {
        analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.BUY_NOW_CLICK);
      }}
      href={`https://pancakeswap.finance/swap?inputCurrency=BNB&outputCurrency=0x565b72163f17849832a692a3c5928cc502f46d69`}
      target={'_blank'}
    >
      <Trans>Buy Now</Trans>
    </StyleTextButton>
  );
};

const StyleTextButton = styled.a`
  margin-left: ${(props) => props.theme.spacing[1]}px;
  cursor: pointer;
  text-decoration: underline;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => props.theme.color.purple[200]};
  text-shadow: 0 0 12px ${(props) => props.theme.color.purple[200]};
`;

export default BuyHunnyButton;
