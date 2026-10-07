import React from 'react';
import styled from 'styled-components';
import HunnyPlayBannerImg from '../../../assets/img/hunnyplay-banner.gif';

const HunnyPlayBanner: React.FC = () => {
  const hunnyPlayUrl = 'https://hunnyplay.io';

  return (
    <StyledContainer href={hunnyPlayUrl} target="_blank">
      <img
        src={HunnyPlayBannerImg}
        style={{
          width: '100%',
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
    height: 100%;
  }
`;

export default HunnyPlayBanner;
