import React, { useCallback } from 'react';
import { Trans } from 'react-i18next';
import styled from 'styled-components';
import useModal from '../../hooks/useModal';
import WalletProviderModal from '../WalletProviderModal';

const UnlockButton: React.FC = () => {
  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider'
  );

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal();
  }, [onPresentWalletProviderModal]);

  return (
    <StyledUnlockButton onClick={handleUnlockClick}>
      <Trans>Unlock wallet</Trans>
    </StyledUnlockButton>
  );
};

const StyledUnlockButton = styled.button`
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
    opacity: 0.6 !important;
    cursor: default;
  }

  &:hover {
    opacity: 1;
  }
`;

export default UnlockButton;
