import React from 'react';
import styled from 'styled-components';
import HunnyLoader from '../HunnyLoader';

export const PendingTransactionDisplay: React.FC = () => {
  return (
    <StyledNotifyContainer>
      <StyledLoaderContainer>
        <HunnyLoader />
      </StyledLoaderContainer>
      <StyledNotifyContent>Pending Transaction...</StyledNotifyContent>
    </StyledNotifyContainer>
  );
};

const StyledNotifyContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLoaderContainer = styled.div`
  height: 38px;
`;

const StyledNotifyContent = styled.span`
  font-size: 18px;
  letter-spacing: 0.5px;
  color: ${(props) => props.theme.color.grey[200]};
  margin-left: 8px;
  display: inline-block;
`;
