import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import useModal from '../../../hooks/useModal';
import WalletProviderModal from '../../WalletProviderModal';
import MyWalletModal from './MyWalletModal';
import BigNumber from 'bignumber.js';
import { getBalance } from '../../../modules/infura';
import { toTokenUnitsBN } from '../../../modules/number';
import analytics from '../../../modules/analytics';
import { GOOGLE_ANALYTIC_EVENTS } from '../../../constants/gaEventTemplate';
import { Trans } from 'react-i18next';

const AccountButton: React.FC = () => {
  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider'
  );
  const [onPresentMyWalletModal] = useModal(<MyWalletModal />);

  const { account, connect } = useWallet();
  const [balance, setBalance] = useState(new BigNumber(0));

  useEffect(() => {
    const connectorId = window.localStorage.getItem('walletConnect');
    if (connectorId) {
      connect(connectorId as any);
    }
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (account) {
        const balance = await getBalance(account);
        setBalance(balance);
      }
    };

    fetch();

    const interval = setInterval(fetch, 5000);
    return () => clearInterval(interval);
  }, [account, setBalance]);

  const handleUnlockClick = useCallback(() => {
    analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.CONNECT_WALLET_CLICK);

    onPresentWalletProviderModal();
  }, [onPresentWalletProviderModal]);

  const onClickWallet = useCallback(() => {
    analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.VIEW_MY_ACCOUNT_CLICK);
    onPresentMyWalletModal();
  }, [onPresentMyWalletModal]);

  return (
    <StyledAccountButton>
      {!account ? (
        <StyledWalletButton onClick={handleUnlockClick}>
          <StyleTextButton>
            <Trans>Connect Wallet</Trans>
          </StyleTextButton>
        </StyledWalletButton>
      ) : (
        <React.Fragment>
          <StyledBalanceInfo>
            <StyleTextButton>
              {`${toTokenUnitsBN(balance, 18).toFixed(3)} BNB`}
            </StyleTextButton>
          </StyledBalanceInfo>

          <StyledWalletButton onClick={onClickWallet}>
            <StyleTextButton>
              {`${account.substring(0, 6)}...${account.substring(
                account.length - 4,
                account.length
              )}`}
            </StyleTextButton>
          </StyledWalletButton>
        </React.Fragment>
      )}
    </StyledAccountButton>
  );
};

const StyledAccountButton = styled.div`
  font-family: 'ubuntu';
  display: flex;
  border-radius: 20px;
  height: 42px;

  background: linear-gradient(
    270deg,
    rgba(233, 96, 175, 0.4) -10.61%,
    rgba(243, 198, 34, 0.4) 112.88%
  );

  @media (max-width: 420px) {
    height: 36px;
  } ;
`;

const StyledWalletButton = styled.button`
  display: flex;
  align-items: center;
  height: 100%;

  background: linear-gradient(270deg, #e960af -10.61%, #f3c622 112.88%);
  border-radius: 20px;

  outline: none;
  border: 0;
  cursor: pointer;
  height: 100%;

  padding: 14px 16px;
  @media (max-width: 420px) {
    font-size: 12px;
    padding: 11px 16px;
  } ;
`;

const StyleTextButton = styled.span`
  letter-spacing: 0.5px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  height: 100%;
  line-height: 15px;
  font-family: 'Ubuntu';

  @media (max-width: 420px) {
    font-size: 12px;
  } ;
`;

const StyledBalanceInfo = styled.span`
  padding: 12px 16px;

  @media (max-width: 420px) {
    padding: 7px 12px;
  } ;
`;

export default AccountButton;
