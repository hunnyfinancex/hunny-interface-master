import React from 'react';
import styled from 'styled-components';

const Stroke: React.FC = React.memo(() => {
  return <StyledStroke />;
});

const StyledStroke = styled.div`
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.color.grey[400]};
  opacity: 0.1;
`;

export default Stroke;
