import React from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { useMediaQuery } from '@material-ui/core';

export interface TooltipConfig {
  id: string;
  place: 'bottom' | 'top' | 'left' | 'right';
}
const HunnyTooltip: React.FC<TooltipConfig> = ({ id, place, ...props }) => {
  return (
    <>
      <StyledTooltip
        id={id}
        place={place}
        type="dark"
        effect="solid"
        multiline={true}
        {...props}
      />

      <StyledTooltipMobile
        id={id}
        place={'bottom'}
        type="dark"
        effect="solid"
        multiline={true}
        {...props}
      />
    </>
  );
};

const StyledTooltip = styled(ReactTooltip)`
  color: ${(props) => props.theme.color.grey[300]} !important;
  max-width: 300px;
  font-weight: 300;
  font-size: 14px !important;

  @media (max-width: 425px) {
    display: none !important;
  }
`;

const StyledTooltipMobile = styled(StyledTooltip)`
  display: none !important;
  @media (max-width: 425px) {
    display: block !important;
  }
`;
export default HunnyTooltip;
