import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import analytics, { GAEvent } from '../../modules/analytics';

export interface ToggleButtonProps {
  rightContent: string;
  leftContent: string;
  values: [any, any];
  value?: any;
  rightButtonTrackingEvent?: GAEvent;
  leftButtonTrackingEvent?: GAEvent;

  onValueChanged?: (value: any) => void;
}

export enum ButtonActiveCodeEnum {
  Left,
  Right,
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  rightContent,
  leftContent,
  values,
  onValueChanged,
  rightButtonTrackingEvent,
  leftButtonTrackingEvent,
  value = values[0],
}) => {
  const [buttonActive, setButtonActive] = useState(null);

  useEffect(() => {
    setButtonActive(value);
  }, [value]);

  useEffect(() => {
    if (!value) {
      setButtonActive(values[0]);
    }
  }, [values]);

  const handleClickLeftButton = useCallback(() => {
    if(leftButtonTrackingEvent){
      analytics.sendEvent(leftButtonTrackingEvent);
    }

    setButtonActive(values[0]);
    handleValueChanged(values[0]);
  }, [setButtonActive, onValueChanged]);

  const handleClickRightButton = useCallback(() => {
    if(rightButtonTrackingEvent){
      analytics.sendEvent(rightButtonTrackingEvent);
    }

    setButtonActive(values[1]);
    handleValueChanged(values[1]);
  }, [setButtonActive, onValueChanged]);

  function handleValueChanged(value: any) {
    if (onValueChanged) {
      onValueChanged(value);
    }
  }

  return (
    <StyledContainer>
      {buttonActive === values[0] ? (
        <StyledActiveButton onClick={handleClickLeftButton}>
          {leftContent}
        </StyledActiveButton>
      ) : (
        <StyledButton onClick={handleClickLeftButton}>
          {leftContent}
        </StyledButton>
      )}
      {buttonActive === values[1] ? (
        <StyledActiveButton onClick={handleClickRightButton}>
          {rightContent}
        </StyledActiveButton>
      ) : (
        <StyledButton onClick={handleClickRightButton}>
          {rightContent}
        </StyledButton>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background: rgba(236, 208, 233, 0.1);
  border-radius: inherit;
  cursor: pointer;
`;

const StyledButton = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 1em;
  flex-grow: 1;
  text-align: center;
  border-radius: inherit;
  color: ${(props) => props.theme.color.grey[400]};
`;

const StyledActiveButton = styled(StyledButton)`
  background: rgba(255, 255, 255, 0.95);
  color: ${(props) => props.theme.color.purple[200]};
`;

export default ToggleButton;
