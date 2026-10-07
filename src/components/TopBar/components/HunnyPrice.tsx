import React from 'react';
import styled from 'styled-components';
import hunnyLogo from '../../../assets/img/hunny-logo.png';
import analytics from '../../../modules/analytics';
import { GOOGLE_ANALYTIC_EVENTS } from '../../../constants/gaEventTemplate';
import { useSelector } from 'react-redux';
import { State } from '../../../modules/models/state.model';

const HunnyPrice: React.FC = () => {
  const hunnyPrice = useSelector((state: State) => state.app.hunnyPrice);

  return (
    <StyledWrapper>
      <StyledHunnyCoin
        onClick={() => {
          analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.HUNNY_LOGO_CLICK);
        }}
        href={`https://pancakeswap.finance/swap?inputCurrency=BNB&outputCurrency=0x565b72163f17849832a692a3c5928cc502f46d69`}
        target={'_blank'}
      >
        <StyledHunnyCoinLogo
          className="hunny-coin-img"
          src={hunnyLogo}
          height="32"
        />
        <StyledHunnyPrice>${hunnyPrice.toFixed(3)}</StyledHunnyPrice>
      </StyledHunnyCoin>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  height: 100%;
  margin-right: 10px;
`;

const StyledHunnyCoin = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-decoration: none;

  &:hover {
    .hunny-coin-img {
      height: 42px;
      left: -36px;
      bottom: -10px;
    }
  }
`;

const StyledHunnyCoinLogo = styled.img`
  transition: 0.2s;
  position: absolute;
  left: -26px;
  bottom: -5px;
  height: 32px;
`;

const StyledHunnyPrice = styled.div`
  margin-left: ${(props) => props.theme.spacing[1]}px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => props.theme.color.purple[200]};
  text-shadow: 0 0 12px ${(props) => props.theme.color.purple[200]};
`;

export default HunnyPrice;
