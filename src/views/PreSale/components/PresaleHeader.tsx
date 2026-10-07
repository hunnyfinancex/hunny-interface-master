import BigNumber from 'bignumber.js';
import React, { useEffect } from 'react';
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import leftBunnyGirl from '../../../assets/img/bunnygirl1.png';
import rightBunnyGirl from '../../../assets/img/bunnygirl2.png';
import { delineate, toTokenUnitsBN } from '../../../modules/number';
import { getPresaleTotalBalance } from '../../../modules/infura';
import { PRESALE_EXCHANGE_RATE } from '../../../constants/values';

const PresaleHeader: React.FC = () => {
  const [amountBNBDeposited, setAmountBNBDeposited] = useState(
    new BigNumber(0)
  );

  // TODO waiting mainet contract
  useEffect(() => {
    const fetch = async () => {
      const totalBalance = await getPresaleTotalBalance();
      setAmountBNBDeposited(
        toTokenUnitsBN(totalBalance, 18).div(PRESALE_EXCHANGE_RATE)
      );
    };

    fetch();

    const interval = setInterval(fetch, 5000);
    return () => clearInterval(interval);
  }, [setAmountBNBDeposited]);

  return (
    <StyledContainer>
      <StyledDashBoard>
        <StyledLeftBunnyGirl src={leftBunnyGirl} />

        <StyledStat>
          <StyledStatDescription>Total BNB Deposited</StyledStatDescription>
          <StyledStatValue>
            {delineate(amountBNBDeposited.toString(10), 2)}
            <StyledSpotlight />
          </StyledStatValue>
        </StyledStat>

        <StyledRightBunnyGirl src={rightBunnyGirl} />
      </StyledDashBoard>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
`;

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
  text-align: center;
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
  letter-spacing: 0.09em;
  position: relative;
  overflow: hidden;
  font-family: 'NeonTubes2';
  margin-top: 16px;
  font-size: 38px;
  font-weight: bold;
  text-shadow: -1px -1px 0 #dd68ac, 0 -1px 0 #dd68ac, 1px -1px 0 #dd68ac,
    1px 0 0 #dd68ac, 1px 1px 0 #dd68ac, 0 1px 0 #dd68ac, -1px 1px 0 #dd68ac,
    -1px 0 0 #dd68ac;

  user-select: none;
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

export default PresaleHeader;
