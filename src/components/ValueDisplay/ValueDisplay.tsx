import React from 'react';
import styled from 'styled-components';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import HunnyTooltip from 'components/Tooltip';

export interface ValueDisplayProps {
  label: string;
  description?: string;
  style?: any;
  hint?: string;
}

const ValueDisplay: React.FC<ValueDisplayProps> = React.memo(
  ({ label, description, children, hint, ...props }) => {
    return (
      <StyledDisplayContainer>
        <StyledDisplayLabel>
          {label}
          {hint && (
            <>
              <StyledInfoIcon data-for={`hint`} data-tip={hint} />
              <HunnyTooltip id={`hint`} place="bottom" />
            </>
          )}
        </StyledDisplayLabel>
        <StyledDisplayValue {...props}>
          {children}
          {description ? (
            <StyledDisplayDescription> {description}</StyledDisplayDescription>
          ) : null}
        </StyledDisplayValue>
      </StyledDisplayContainer>
    );
  }
);

export const StyledDisplayContainer = styled.div`
  width: 100%;
  display: grid;
  box-sizing: border-box;
  padding: ${(props) => props.theme.spacing[2]}px
    ${(props) => props.theme.spacing[5]}px;

  grid-template-columns: 1fr 2fr;
  grid-template-areas: 'label value';

  @media (max-width: 768px) {
    padding: ${(props) => props.theme.spacing[2]}px
      ${(props) => props.theme.spacing[2]}px;
  } ;
`;

export const StyledDisplayValue = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;

  grid-area: value;
  letter-spacing: 0.5px;
  text-align: start;

  flex-grow: 1;

  color: ${(props) => props.theme.color.grey[200]};

  @media (max-width: 768px) {
    text-align: end;
    font-size: 14px;
  } ;
`;

export const StyledDisplayLabel = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;

  grid-area: label;
  letter-spacing: 0.5px;
  text-align: start;

  color: ${(props) => props.theme.color.grey[400]};
`;

export const StyledDisplayDescription = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 22px;

  letter-spacing: 0.5px;

  margin-left: ${(props) => props.theme.spacing[2]}px;
  color: ${(props) => props.theme.color.grey[400]};

  @media (max-width: 768px) {
    margin-left: 0;
    display: block;
  } ;
`;

const StyledInfoIcon = styled(InfoIcon)`
  height: 14px !important;
  color: ${(props) => props.theme.color.grey[400]};
`;

export default ValueDisplay;
