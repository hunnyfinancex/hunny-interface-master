import { delineate, toTokenUnitsBN } from 'modules/number';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { DetailPool } from './PoolList';

const PoolCardItem: React.FC<DetailPool> = ({
  icon,
  title,
  earn,
  url,
  apr,
  totalAmount,
}) => {
  return (
    <StyledWrapper href={url} target="_blank">
      <RowMiddle>
        <StyledImage src={icon} />
        <StyledTitle>{title}</StyledTitle>
      </RowMiddle>

      <Column className="apr">
        <RowMiddle>
          <StyledAmountStakeInfo>{apr}%</StyledAmountStakeInfo>
        </RowMiddle>
        <StyledSubTitle>APR</StyledSubTitle>
      </Column>

      <Column>
        <StyledDetailsLabel>Earn</StyledDetailsLabel>
        <StyledDetailsLabel>Balance</StyledDetailsLabel>
        <StyledDetailsLabel>Total Deposit</StyledDetailsLabel>
      </Column>

      <Column>
        <StyledDetailsValue>{earn}</StyledDetailsValue>
        <StyledDetailsValue>$0</StyledDetailsValue>
        <StyledDetailsValue>
          {delineate(toTokenUnitsBN(totalAmount, 0).toFixed(2))}
        </StyledDetailsValue>
      </Column>
    </StyledWrapper>
  );
};

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowMiddle = styled.div`
  display: flex;
  align-items: center;
`;
const StyledSubTitle = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.color.yellow[100]};
`;

const StyledWrapper = styled.a`
  position: relative;
  transition: 0.2s;
  margin-bottom: 16px;
  cursor: pointer;

  box-sizing: border-box;
  width: 100%;
  display: grid;
  align-items: center;

  padding: 16px 48px 16px 32px;
  grid-template-columns: 1.8fr 1.6fr 0.75fr 1fr;

  @media (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
    padding: 16px 12px;

    .apr {
      justify-content: flex-end;
      align-items: flex-end;
      ${StyledSubTitle} {
        display: none;
      }
    }
  }

  background: rgba(2, 12, 32, 0.9);
  border: 1px solid #272f52;
  border-radius: 5px;
  text-decoration: none;

  &:hover {
    border: 1px solid ${(props) => props.theme.color.purple[200]};
    background-position: 75%;
  }
`;

const StyledImage = styled.img`
  max-width: 46px;
`;

const StyledTitle = styled.div`
  display: flex;
  margin-left: 6px;

  font-size: 16px;

  font-weight: bold;
  color: #ec6998;
`;

const StyledAmountStakeInfo = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 34px;
  color: #f3c622;
  text-shadow: 0px 0px 12px #f3c622;

  @media (max-width: 425px) {
    font-size: 28px;
  }
`;
const StyledDetailsLabel = styled.span`
  font-size: 14px;
  letter-spacing: 0.5px;
  color: ${(props) => props.theme.color.grey[400]};
  flex-shrink: 0;
  text-align: left;
  margin-bottom: 4px;
`;

const StyledDetailsValue = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.color.grey[200]};
  text-align: right;
  margin-bottom: 4px;
`;

export default PoolCardItem;
