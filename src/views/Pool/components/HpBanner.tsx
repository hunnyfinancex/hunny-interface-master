import React from 'react';
import styled from 'styled-components';
import HpBannerImg from '../../../assets/img/hp-banner.gif';

const HpBanner: React.FC = () => {
  return (
    <StyledContainer href="https://hunnypoker.com/" target="_blank">
      <img
        src={HpBannerImg}
        style={{
          width: '100%',
        }}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.a`
  width: 100%;
  margin-top: 16px;
  border-radius: 20px;
  overflow: hidden;
  flex-grow: 1;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

export default HpBanner;
