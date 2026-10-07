import React from 'react';
import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';

const CircleProgress: React.FC = () => {
  return (
    <StyledProgress>
      <CircularProgress style={{ width: 20, height: 20, color: '#1e2329' }} />
    </StyledProgress>
  );
};

const StyledProgress = styled.div`
  padding: 10px;
`;

export default CircleProgress;
