import React from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';
import { useLottery } from '../../hooks/Lottery/useLottery';
import LotteryContent from './Components/LotteryContent';

import LotteryHeader from './Components/LotteryHeader';

const Lottery: React.FC = () => {

  useLottery();
  
  return (
    <StyledWrapper>
      <Container>
        <StyledContainerInner>
          <LotteryHeader/>
          <LotteryContent/>
        </StyledContainerInner>
      </Container>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Ubuntu';
`;

const StyledContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 12px;
  box-sizing: border-box;
  padding-bottom: 64px;
`;

export default Lottery;
