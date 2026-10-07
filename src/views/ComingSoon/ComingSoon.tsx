import React from 'react';
import Container from '../../components/Container';
import styled from 'styled-components';

const ComingSoon: React.FC = () => {
  return (
    <StyledWrapper>
      <Container>
        <StyledContainerInner>Coming Soon...</StyledContainerInner>
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
  margin-top: 25%;
  font-family: 'FreestyleScript';
  font-size: 130px;
  letter-spacing: 2px;
  position: relative;
  overflow: hidden;
  color: #3a2f49;
  text-shadow: -1px -1px 0 #dd68ac, 0 -1px 0 #dd68ac, 1px -1px 0 #dd68ac,
    1px 0 0 #dd68ac, 1px 1px 0 #dd68ac, 0 1px 0 #dd68ac, -1px 1px 0 #dd68ac,
    -1px 0 0 #dd68ac, 0px 0 40px #dd68ac;
  user-select: none;
  padding: 20px;
  text-align: center;

  @media (max-width: 575px) {
    font-size: 74px;
  }
`;

export default ComingSoon;
