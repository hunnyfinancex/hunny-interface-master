import React from 'react';
import styled from 'styled-components';
import { CarouselProps } from '../carousel.model';

export const CarouselPage: React.FC<CarouselProps> = ({
  slides,
  current,
  goto,
}) => {
  return (
    <>
      <StyledPageSliderContainer>
        {slides.map((item, index) => (
          <StyledPageSliderItem
            key={index}
            className={index === current && 'is-active'}
            onClick={() => goto(index)}
          ></StyledPageSliderItem>
        ))}
      </StyledPageSliderContainer>
    </>
  );
};

const StyledPageSliderContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 12px;
  z-index: 1;
  align-items: flex-end;
  justify-content: center;
`;
const StyledPageSliderItem = styled.div`
  height: 4px;
  width: 24px;
  background: ${(props) => props.theme.color.grey[700]};
  margin-left: 8px;
  border-radius: 8px;
  cursor: pointer;

  &.is-active {
    background: white;
  }

  &:hover {
    transition: 0.3s;
    transform: scale(1.2, 1.2);
  }
`;
export default CarouselPage;
