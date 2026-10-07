import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CarouselItem } from './carousel.model';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import CarouselPage from './components/CarouselPage';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

/*
 * Coppy from Hunny Play
 * TODO: Change name
 */
export interface GameCarouselProps {
  slides: CarouselItem[];
}
export const GameCarousel: React.FC<GameCarouselProps> = ({ slides }) => {
  const [pause, setPause] = React.useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    duration: 1000,
    dragStart: () => {
      setPause(true);
    },
    dragEnd: () => {
      setPause(false);
    },
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });

  const timer = useRef(null);

  useEffect(() => {
    sliderRef.current.addEventListener('mouseover', () => {
      setPause(true);
    });
    sliderRef.current.addEventListener('mouseout', () => {
      setPause(false);
    });
  }, [sliderRef]);

  useEffect(() => {
    if (slides.length < 2) {
      return;
    }

    timer.current = setInterval(() => {
      if (!pause && slider) {
        slider.next();
      }
    }, 5000);
    return () => {
      clearInterval(timer.current);
    };
  }, [pause, slider, slides]);

  const gotoNext = () => {
    slider.next();
  };

  const gotoPrevious = () => {
    slider.prev();
  };

  return (
    slides.length > 0 && (
      <StyledContainer>
        <StyledSlideDesktopMainBanner>
          <div
            ref={sliderRef}
            className="keen-slider"
            style={{ height: '100%' }}
          >
            {slides.map((item) => (
              <div className="keen-slider__slide" key={item.key}>
                {item.content}
              </div>
            ))}
          </div>

          {slides.length > 1 && (
            <>
              <StyledLeftArrow className="nav-icon" onClick={gotoPrevious}>
                <StyledNavIcon>
                  <ChevronLeftIcon />
                </StyledNavIcon>
              </StyledLeftArrow>
              <StyledRightArrow className="nav-icon" onClick={gotoNext}>
                <StyledNavIcon>
                  <ChevronRightIcon />
                </StyledNavIcon>
              </StyledRightArrow>

              <CarouselPage
                current={currentSlide}
                slides={slides}
                goto={(index) => {
                  slider.moveToSlideRelative(index);
                }}
              />
            </>
          )}
        </StyledSlideDesktopMainBanner>
      </StyledContainer>
    )
  );
};

const StyledContainer = styled.div`
  display: flex;
  border-radius: 8px;
  overflow: hidden;
`;

const StyledSlideDesktopMainBanner = styled.div`
  position: relative;
  box-shadow: 0 1px 1px 0 rgb(0 0 0 / 5%);
  flex: 1;

  &:hover {
    .nav-icon {
      opacity: 1;
    }
  }
`;

const StyledNavIcon = styled.div`
  height: 24px;
  width: 24px;

  padding: 12px;
  background: white;
  border-radius: 67%;
  color: ${(props) => props.theme.color.dark[100]};

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledLeftArrow = styled.div`
  z-index: 2;
  position: absolute;
  left: 12px;
  top: 50%;

  transform: translate(0%, -50%);

  opacity: 0;
  transition: 0.3s;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledRightArrow = styled(StyledLeftArrow)`
  left: unset;
  right: 12px;

  @media (max-width: 768px) {
    display: none;
  }
`;
export default GameCarousel;
