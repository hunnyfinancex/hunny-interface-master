import React, { Suspense, useEffect, useState } from 'react';
import Container from '../../components/Container';
import styled from 'styled-components';
import { usePoolList } from '../../hooks/Pool/usePoolList';
import HunnyLoader from '../../components/HunnyLoader';
import FarmHeader from './components/FarmHeader';
import CarouseLinkItem from 'components/GameCarousel/components/CarouseLinkItem';

import HunnyBanner1Img from '../../assets/img/carousel/banner1.png';
import HunnyBanner2Img from '../../assets/img/carousel/banner2.png';
import HunnyBanner3Img from '../../assets/img/carousel/banner3.png';

import HunnyPlayDesktopBanner from 'assets/img/carousel/hunnyplay-desktop.png';
import HunnyPlayMobileBanner from 'assets/img/carousel/hunnyplay-mobile.png';

import HunnyBanner1MobileImg from '../../assets/img/carousel/banner1-mobile.png';
import HunnyBanner2MobileImg from '../../assets/img/carousel/banner2-mobile.png';
import HunnyBanner3MobileImg from '../../assets/img/carousel/banner3-mobile.png';

import GameCarousel from 'components/GameCarousel';
import HowToStart from 'components/HowToStart';
import PoolList from './components/PoolList';

const FarmList = React.lazy(() => import('./components/FarmList'));

const carouselSlides = [
  {
    key: 1,
    content: (
      <CarouseLinkItem
        href="https://hunnyplay.io/?utm_source=hunny.finance&utm_medium=top-banner"
        target="_blank"
        img={HunnyBanner2Img}
        imgMobile={HunnyBanner2MobileImg}
      />
    ),
  },
  {
    key: 2,
    content: (
      <CarouseLinkItem
        href="https://hunnypoker.com/?utm_source=hunny.finance&utm_medium=banner"
        target="_blank"
        img={HunnyBanner3Img}
        imgMobile={HunnyBanner3MobileImg}
      />
    ),
  },
  {
    key: 3,
    content: (
      <CarouseLinkItem
        img={HunnyBanner1Img}
        imgMobile={HunnyBanner1MobileImg}
      />
    ),
  },
];

const Pool: React.FC = () => {
  const [isLoading, setLoading] = useState(true);

  usePoolList();

  useEffect(() => {
    // fake loading

    if (isLoading) {
      window.scrollTo(0, 0);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1250);
  }, []);

  return isLoading ? (
    <StyledLoaderContainer>
      <HunnyLoader />
    </StyledLoaderContainer>
  ) : (
    <StyledWrapper>
      <Container>
        <StyledContainerInner>
          <StyledHeaderContainer>
            <GameCarousel slides={carouselSlides} />
            <StyledDAOBanner
              onClick={() => {
                window.open(
                  'https://hunnyplay.io/?utm_source=hunny.finance&utm_medium=bottom-banner',
                  '_blank'
                );
              }}
            >
              <StyledImgDao src={HunnyPlayDesktopBanner} />
              <StyledImgMobileDao src={HunnyPlayMobileBanner} />
            </StyledDAOBanner>
          </StyledHeaderContainer>
          <FarmHeader />

          <Suspense fallback={<Loader />}>
            <FarmList />
          </Suspense>
        </StyledContainerInner>
      </Container>
      <HowToStart />
    </StyledWrapper>
  );
};

const Loader = () => (
  <StyledLoaderContainer>
    <HunnyLoader />
  </StyledLoaderContainer>
);

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Ubuntu';
`;

const StyledLoaderContainer = styled.div`
  height: 64px;
  text-align: center;
  margin: ${(props) => props.theme.spacing[6]}px 0px;
`;

const StyledContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 12px;
  box-sizing: border-box;
`;

const StyledHeaderContainer = styled.div`
  padding: 26px 0px;
  margin-bottom: 32px;
  width: 100%;
  position: relative;

  @media (max-width: 900px) {
    margin-bottom: 0px;
  }
`;

const StyledDAOBanner = styled.div`
  width: 100%;
  margin-top: 24px;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  cursor: pointer;
`;

const StyledImgDao = styled.img`
  height: 100%;
  width: 100%;

  @media (max-width: 550px) {
    display: none;
  }
`;
const StyledImgMobileDao = styled(StyledImgDao)`
  display: none;
  @media (max-width: 550px) {
    display: flex;
  }
`;

export default Pool;
