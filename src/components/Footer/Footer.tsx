import React from 'react';
import styled from 'styled-components';
import Stroke from '../Stroke';
import HunnyPartner from './components/HunnyPartner';

import Nav from './components/Nav';

const Footer: React.FC = () => (
  <StyledContainer>
    <Stroke />
    <StyledFooter>
      <StyledFooterInner>
        <HunnyPartner />
        <Nav />
      </StyledFooterInner>
    </StyledFooter>
  </StyledContainer>
);

const StyledContainer = styled.footer`
  margin-top: 24px;
`;

const StyledFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0px;
`;

const StyledFooterInner = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
  max-width: 1200px;
`;

export default Footer;
