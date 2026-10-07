import React from 'react';
import styled, { keyframes } from 'styled-components';
import hunnyLogo from '../../assets/img/hunny-logo.png';

const HunnyLoader: React.FC = () => {
  return <StyledLoader src={hunnyLogo} />;
};

const loaderKeyframes = keyframes`
  0% {
    transform: scale(1,1);
  }
  50% {
    transform: scale(1.2,1.2);
  }
  100% {
      ransform: scale(1,1);
  }
`;
const StyledLoader = styled.img`
  height: 100%;
  animation: ${loaderKeyframes} 1s infinite;
`;
export default HunnyLoader;
