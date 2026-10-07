import React from 'react';
import styled from 'styled-components';
import HunnyPlayBannerImg from 'assets/img/hunnypoker-banner.png';

const HunnyPokerBanner: React.FC = () => {
  const hunnyPokerUrl = 'https://hunnypoker.com/';

  return (
    <StyledContainer href={hunnyPokerUrl} target="_blank">
      <img
        src={HunnyPlayBannerImg}
        style={{
          width: '100%',
          height: '100%',
        }}
        alt="banner"
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.a`
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  flex-grow: 1;
  text-decoration: none;
  color: ${(props) => props.theme.color.yellow[100]};
  position: relative;
  img {
    height: 165px;
  }
  @media (max-width: 767px) {
    width: 100%;
    img {
      height: auto;
    }
  }
`;

export default HunnyPokerBanner;
