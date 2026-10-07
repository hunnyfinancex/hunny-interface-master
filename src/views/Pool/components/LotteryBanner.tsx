import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import lotteryBalls from '../../../assets/img/lottery-balls.png';
import NumberIncreaseEffect from '../../../components/NumberIncreaseEffect';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Link } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import {
  getLotteryIssueIndex,
  getLotteryTotalAmount,
} from '../../../modules/lottery';
import { getHUNNYPrice } from '../../../modules/utils';
import { toTokenUnitsBN } from '../../../modules/number';
import { Trans } from 'react-i18next';

const LotteryBanner: React.FC = () => {
  const [totalLotteryPot, setTotalLotteryPot] = useState(new BigNumber(0));
  const [totalLotteryPotUsd, setTotalLotteryPotUsd] = useState(
    new BigNumber(0)
  );

  useEffect(() => {
    const fetch = async () => {
      const issueIndex = await getLotteryIssueIndex();
      const total = await getLotteryTotalAmount(issueIndex);
      const hunnyPrice = await getHUNNYPrice();

      setTotalLotteryPot(total);
      setTotalLotteryPotUsd(total.multipliedBy(hunnyPrice));
    };

    fetch();

    const interval = setInterval(fetch, 10000);
    return () => clearInterval(interval);
  }, [setTotalLotteryPot, setTotalLotteryPotUsd]);

  return (
    <StyledContainer>
      <StyledDashBoard to="/lottery">
        <StyledLotteryBall src={lotteryBalls} />
        <StyledLotteryInfoContainer>
          <StyledLabel>
            <Trans>Total Pot this Round</Trans>
            <StyledRightIconDesktop />
          </StyledLabel>
          <StyledPotValue>
            <NumberIncreaseEffect
              value={toTokenUnitsBN(totalLotteryPot, 18).toNumber()}
              fixed={3}
            />
            <StyledHunnyText>HUNNY</StyledHunnyText>
            <StyledPotValueInUsd>
              (~ $
              <NumberIncreaseEffect
                value={toTokenUnitsBN(totalLotteryPotUsd, 18).toNumber()}
                fixed={3}
              />
              )
            </StyledPotValueInUsd>
          </StyledPotValue>
        </StyledLotteryInfoContainer>
      </StyledDashBoard>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  min-height: 165px;
  flex-grow: 1;

  @media (max-width: 900px) {
    width: 100%;
    min-height: unset;
  }
`;

const StyledDashBoard = styled(Link)`
  position: relative;
  display: flex;

  height: 100%;
  justify-content: center;
  align-items: center;

  background: #020c20;
  padding: 12px 6px;

  border: 1px solid #272f52;
  box-sizing: border-box;
  border-radius: 20px;

  cursor: pointer;
  text-decoration: none;

  &:hover {
    border: 1px solid ${(props) => props.theme.color.purple[200]};
  }
`;

const StyledLotteryInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 16px;

  @media (max-width: 425px) {
    padding-left: 4px;
  }
`;

const StyledLotteryBall = styled.img`
  width: 80px;

  @media (max-width: 425px) {
    width: 80px;
  }

  @media (max-width: 320px) {
    display: none;
  }
`;

const StyledLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 18px;
  color: ${(props) => props.theme.color.grey[300]};
  width: max-content;

  @media (max-width: 425px) {
    font-size: 14px;
  }
`;

const StyledHunnyText = styled(StyledLabel)`
  display: inline-block;
  margin: 0px 8px 0 8px;
  text-shadow: none;
  font-size: 16px;

  @media (max-width: 425px) {
    font-size: 14px;
    margin: 0px 0px;
    margin-bottom: 12px;
    flex-grow: 1;
    margin-left: 6px;
  }
`;

const StyledPotValue = styled.div`
  margin-top: 12px;
  font-size: 32px;
  line-height: 55px;
  color: #ffffff;

  display: flex;
  flex-wrap: wrap;

  align-items: flex-end;

  text-shadow: 4px 4px 20px #e960af;
  font-weight: 700;

  @media (max-width: 900px) and (min-width: 425px) {
    line-height: unset !important;
    font-size: 36px;
  }

  @media (max-width: 425px) {
    margin-top: 0px;
    font-size: 36px;
  }
`;

const StyledRightIconDesktop = styled(KeyboardArrowRightIcon)`
  margin-left: 8px;
`;

const StyledPotValueInUsd = styled.div`
  font-size: 16px;
  line-height: 16px;
  letter-spacing: -0.02em;
  margin-bottom: 2px;
  color: #f3c622;
  text-shadow: none;

  @media (max-width: 425px) {
    font-size: 14px;
  }
`;

export default LotteryBanner;
