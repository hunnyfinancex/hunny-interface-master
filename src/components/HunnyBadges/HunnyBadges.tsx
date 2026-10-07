import React from 'react';
import styled from 'styled-components';

export interface HunnyBadgesProps {
  type: 'success' | 'normal' | 'neon' | 'error';
}

const HunnyBadges: React.FC<HunnyBadgesProps> = ({ type, children }) => {
  return <StyledBadges className={type}>{children}</StyledBadges>;
};

const StyledBadges = styled.div`
  border-radius: 5px;
  display: inherit;
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 0px 4px;
  font-size: 12px;
  font-weight: 200;

  &.success {
    color: ${(props) => props.theme.color.green[500]};
    border: 1px solid ${(props) => props.theme.color.green[500]};
  }

  &.error {
    color: #ff3b3b;
    border: 1px solid #ff3b3b;
    padding: 4px;
  }

  &.normal {
    color: ${(props) => props.theme.color.grey[200]};
    border: 1px solid ${(props) => props.theme.color.grey[200]};
  }

  &.neon {
    position: relative;
    background: linear-gradient(270deg, #e960af -10.61%, #f3c622 112.88%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    border: 1px solid;
    border-image: linear-gradient(270deg, #e960af -10.61%, #f3c622 112.88%);
    border-image-slice: 1;
    opacity: 1 !important;
  }

  svg {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
`;

export default HunnyBadges;
