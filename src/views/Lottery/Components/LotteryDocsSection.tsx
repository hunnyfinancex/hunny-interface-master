import React from 'react';
import styled from 'styled-components';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { Trans } from 'react-i18next';

const LotteryDocsSection: React.FC = () => {
  return (
    <>
      <StyledCardHeader>
        <Trans>How It Works</Trans>
      </StyledCardHeader>
      <StyledCardContent>
        <Trans>
          Spend HUNNY to buy tickets, contributing to the lottery pot. Win
          prizes if 2, 3, or 4 of your ticket numbers match the winning numbers
          and their exact order!
        </Trans>
      </StyledCardContent>

      <StyledSectionFooter>
        <StyledStroke />
        <StyledLink
          href="https://docs.hunny.finance/products/hunny-lottery"
          target="_blank"
        >
          <Trans>Read More</Trans>
          <OpenInNewIcon
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: '#F3C622',
              marginLeft: 4,
            }}
          />
        </StyledLink>
      </StyledSectionFooter>
    </>
  );
};

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.yellow[100]};
  font-size: 14px;
  font-weight: normal;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-top: 12px;

  justify-content: center;
  text-decoration: none;

  @media (max-width: 767px) {
    justify-content: start;
  }
`;

const StyledCardHeader = styled.div`
  display: flex;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;

  justify-content: center;

  @media (max-width: 767px) {
    justify-content: start;
  }
`;

const StyledCardContent = styled.div`
  color: ${(props) => props.theme.color.grey[300]};
  font-size: 14px;
  font-weight: 100;
  margin-bottom: 18px;

  text-align: center;
  @media (max-width: 767px) {
    text-align: left;
  }
`;

const StyledSectionFooter = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const StyledStroke = styled.div`
  width: 100%;
  border-top: 2px solid #272f52;
  opacity: 0.5;
  margin: 12px 0px;
`;
export default LotteryDocsSection;
