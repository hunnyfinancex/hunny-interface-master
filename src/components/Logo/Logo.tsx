import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logoDark from '../../assets/img/logo-dark.png';

const Logo: React.FC = () => {
  return (
    <StyledWrapper>
      <StyledLogo to="/">
        <StyledImg src={logoDark} height="62" />
      </StyledLogo>
    </StyledWrapper>
  );
};

const StyledImg = styled.img`
  transition: 0.2s;
  height: 42px;
  &:hover {
    transform: scale(1.2, 1.2);
  }
`;
const StyledWrapper = styled.div`
  @media (max-width: 420px) {
    margin-left: 10px;
  } ;
`;

const StyledLogo = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

export default Logo;
