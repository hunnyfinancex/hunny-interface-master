import React from 'react';
import styled from 'styled-components';

const LotteryCard: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>;

const StyledCard = styled.div`
  padding: 24px;  
  height: 100%;
  border-radius: 5px;
  display: flex;
  flex: 1;
  flex-direction: column;

  background: #020C20;

  border: 1px solid #272F52;
  box-sizing: border-box;
  position: relative;
`;

export default LotteryCard;
