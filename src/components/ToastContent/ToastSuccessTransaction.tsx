import React from 'react';
import styled from 'styled-components';
import { getExplorer } from '../../modules/utils';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

export const SuccessTransactionDisplay: React.FC<{ hash: any }> = ({
  hash,
}) => {
  return (
    <StyledNotifyContainer>
      <StyledCheckCircleOutlineOutlinedIcon />
      <div style={{ marginLeft: 12 }}>
        <StyledNotifyContent>
          {' '}
          {`${hash.substring(0, 6)}...${hash.substring(
            hash.length - 6,
            hash.length
          )}`}
        </StyledNotifyContent>
        <br />
        <StyledContractDisplay
          target="_blank"
          href={`${getExplorer()}/tx/${hash}`}
          style={{ marginLeft: 8 }}
        >
          View on BSC
        </StyledContractDisplay>
      </div>
    </StyledNotifyContainer>
  );
};

const StyledCheckCircleOutlineOutlinedIcon = styled(
  CheckCircleOutlineOutlinedIcon
)`
  font-size: 32px !important;
  color: ${(props) => props.theme.color.green[600]};
`;

const StyledNotifyContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledContractDisplay = styled.a`
  cursor: pointer;
  text-decoration: underline;
  color: ${(props) => props.theme.color.grey[300]};

  font-weight: 100;
  font-size: 14px;
`;

const StyledNotifyContent = styled.span`
  font-size: 18px;
  letter-spacing: 0.5px;
  color: ${(props) => props.theme.color.grey[200]};
  margin-left: 8px;
  display: inline-block;
`;
