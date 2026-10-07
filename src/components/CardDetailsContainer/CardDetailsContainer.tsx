import React from 'react';
import { useHistory } from 'react-router-dom';
import Container from '../../components/Container';
import styled from 'styled-components';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import analytics from '../../modules/analytics';
import { GOOGLE_ANALYTIC_EVENTS } from '../../constants/gaEventTemplate';

const CardDetailsContainer: React.FC<any> = ({
  children,
  disableBack,
  ...props
}) => {
  const history = useHistory();

  const gotoDashboard: () => void = () => {
    analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.CLICK_BACK_ON_POOL_DETAILS);
    history.push('/');
  };

  return (
    <StyledWrapper {...props}>
      <Container>
        <StyledContainerInner>
          <StyledCardDetails>
            {!disableBack && (
              <StyledBackBtnContainer>
                <IconButton onClick={gotoDashboard}>
                  <StyledBackIcon />
                </IconButton>
              </StyledBackBtnContainer>
            )}

            {children}
          </StyledCardDetails>
        </StyledContainerInner>
      </Container>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[7]}px;
`;

const StyledContainerInner = styled.div`
  margin: auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledCardDetails = styled.div`
  box-sizing: border-box;
  position: relative;
  min-height: 300px;
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(108, 108, 108, 0.15);
  border-radius: 10px;

  @media (max-width: 768px) {
    border-radius: 2px;
  }
`;

const StyledBackBtnContainer = styled.div`
  position: absolute;
`;

const StyledBackIcon = styled(ArrowBackIcon)`
  color: ${(props) => props.theme.color.grey[200]};
`;

export default CardDetailsContainer;
