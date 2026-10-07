import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface CarouseLinkItemProps {
  img: string;
  imgMobile: string;
  href?: string;
  target?: '_blank' | '_parent' | '_top' | '_self' | '_internal';
}

export const CarouseLinkItem: React.FC<CarouseLinkItemProps> = ({
  img,
  imgMobile,
  href,
  target = '_internal',
}) => {
  return target === '_internal' ? (
    <StyledLinkContainer to={href}>
      <StyledImg src={img} />
      <StyledImgMobile src={imgMobile} />
    </StyledLinkContainer>
  ) : (
    <StyledContainer href={href} target={target}>
      <StyledImg src={img} />
      <StyledImgMobile src={imgMobile} />
    </StyledContainer>
  );
};

const StyledContainer = styled.a`
  position: relative;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08), 0px 20px 32px rgba(0, 0, 0, 0.32);
  cursor: pointer;
`;

const StyledLinkContainer = styled(Link)`
  position: relative;
  border-radius: 12px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08), 0px 20px 32px rgba(0, 0, 0, 0.32);
  cursor: pointer;
`;

const StyledImg = styled.img`
  height: 100%;
  width: 100%;
  overflow: hidden;
  object-fit: fill !important;

  @media (max-width: 550px) {
    display: none;
  }
`;
const StyledImgMobile = styled(StyledImg)`
  display: none;
  @media (max-width: 550px) {
    display: flex;
  }
`;

export default CarouseLinkItem;
