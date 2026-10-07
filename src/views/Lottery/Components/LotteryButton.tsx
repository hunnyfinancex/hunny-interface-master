import React from 'react';
import styled from 'styled-components';

export interface LotterryButtonProps{
  onClick: () => void;
  disabled?: boolean;
}

const LotteryButton: React.FC<LotterryButtonProps> = ({onClick, disabled, children}) => {

  return (
      <StyledSubmitButton onClick={onClick} disabled={disabled}>
        {children}
      </StyledSubmitButton>
  );
};

const StyledSubmitButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.purple[100]};
  outline: none;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  height: 46px;
  line-height: 46px;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  opacity: 0.9;

  &:disabled {
    background-color: ${(props) => props.theme.color.purple[900]};
    color: ${(props) => props.theme.color.grey[300]};
    opacity: 1 !important;
    cursor: default;
  }

  &:hover {
    opacity: 1;
  }
`;

export default LotteryButton;
