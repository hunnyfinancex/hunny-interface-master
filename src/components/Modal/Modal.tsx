import React from 'react';
import styled, { keyframes } from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import analytics from '../../modules/analytics';
import { GOOGLE_ANALYTIC_EVENTS } from '../../constants/gaEventTemplate';

export interface ModalProps {
  onDismiss?: () => void;
  data?: any;
}

const Modal: React.FC<ModalProps> = ({ children, onDismiss }) => {
  const handleOnDismiss = () => {
    analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.CLICK_CLOSE_MODAL);
    onDismiss();
  };

  return (
    <StyledResponsiveWrapper>
      <StyledModal>
        <StyledCloseIcon onClick={handleOnDismiss}>
          <IconButton style={{ color: '#e2d6cf' }}>
            <ClearIcon style={{ fontSize: 24, fontWeight: 500 }} />
          </IconButton>
        </StyledCloseIcon>
        {children}
      </StyledModal>
    </StyledResponsiveWrapper>
  );
};

const mobileKeyframes = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
`;

const StyledCloseIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  @media (max-width: 425px) {
    top: 0px;
    right: 0px;
  }
`;

const StyledResponsiveWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  max-width: 512px;
  @media (max-width: 425px) {
    flex: 1;
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    max-height: calc(100% - ${(props) => props.theme.spacing[4]}px);
    animation: ${mobileKeyframes} 0.3s forwards ease-out;
  }
`;

const StyledModal = styled.div`
  padding: 8px 20px;
  box-sizing: border-box;
  background: linear-gradient(0deg, #191D25 -5.56%, #1A2233 108.98%);
  border: 1px solid #272F52;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: 0;
`;

export default Modal;
