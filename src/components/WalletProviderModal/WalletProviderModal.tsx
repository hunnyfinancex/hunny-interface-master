import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import metamaskLogo from '../../assets/img/metamask-fox.svg';
import walletConnectLogo from '../../assets/img/wallet-connect.svg';
import mathWalletLogo from '../../assets/img/math-wallet.svg';
import safepalLogo from '../../assets/img/safepal.svg';
import trustWalletLogo from '../../assets/img/trust-wallet.png';
import bscWalletLogo from '../../assets/img/wallet-bsc.svg';
import tokenPocketLogo from '../../assets/img/token-pocket-wallet.svg';
import coin98Logo from '../../assets/img/coin98.svg';
import bitKeepLogo from '../../assets/img/bitkeep.png';
import { BSC_CHAINID_HEX, BSC_CHAINID } from '../../constants/values';

// @ts-ignore
import Modal, { ModalProps } from '../Modal';
import ModalContent from '../ModalContent';
import ModalTitle from '../ModalTitle';
import Spacer from '../Spacer';
import WalletCard from './components/WalletCard';
import { WindowChain } from '../../modules/models/windowChain.model';
import { HunnyToast } from '../../modules/toastify';
import { getExplorer } from '../../modules/utils';
import analytics from '../../modules/analytics';
import { GOOGLE_ANALYTIC_EVENTS } from '../../constants/gaEventTemplate';
import { Trans, useTranslation } from 'react-i18next';

const WalletProviderModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, connect, reset, error, status } = useWallet();
  const [connector, setConnector] = useState('');
  const [_, forceRerender] = useState({});

  let isMounted = true;

  const { t } = useTranslation();
  useEffect(() => {
    notifyConnectStatus();
    if (account) {
      if (connector) {
        window.localStorage.setItem('walletConnect', connector);
      }
      onDismiss();
    }
    return () => {
      isMounted = false;
    };
  }, [_, connector, account, onDismiss]);

  const notifyConnectStatus = () => {
    if (error) {
      analytics.sendEvent(
        GOOGLE_ANALYTIC_EVENTS.ERROR_CONNECT_WALLET,
        error.name
      );
      switch (error.name) {
        case 'ChainUnsupportedError':
          HunnyToast.error(
            t(
              'Wrong Blockchain Network! Please connect wallet to Binance Smart Chain Network (BSC).'
            )
          );
          break;

        case 'ConnectionRejectedError':
          HunnyToast.show(t('You have been rejected connect wallet.'));
          break;
        case undefined:
          console.log(error);
          HunnyToast.error(t('Something went wrong!'));
          break;

        case 't':
          console.log(error);
          HunnyToast.error(t('Wallet is not found!'));
          break;

        case 'e':
          console.log(error);
          HunnyToast.error(t('Wallet is not found!'));
          break;

        default:
          console.log(error);
          HunnyToast.error(error.name);
          break;
      }
    }

    if (status === 'error' && error) {
      reset();
    }
  };

  const setupNetwork = async () => {
    const provider = (window as WindowChain).ethereum;
    if (provider) {
      try {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: BSC_CHAINID_HEX,
              chainName: 'Binance Smart Chain',
              nativeCurrency: {
                name: 'BNB',
                symbol: 'bnb',
                decimals: 18,
              },
              rpcUrls: [process.env.REACT_APP_RPC],
              blockExplorerUrls: [getExplorer()],
            },
          ],
        });
        return true;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  };

  const handleConnectWallet = async (connector = 'injected') => {
    // Check if wallet is installed
    if ((window as WindowChain).ethereum !== undefined) {
      const chainId = (window as WindowChain).ethereum.networkVersion;

      // Check chainId
      if (parseInt(chainId) != BSC_CHAINID) {
        const result = await setupNetwork();

        // Make sure switch network popup close before connecting wallet
        if (result)
          setTimeout(() => {
            processConnecting(connector);
          }, 1000);
      } else {
        processConnecting(connector);
      }
    } else {
      HunnyToast.error(t('Wallet is not found!'));
    }
  };

  const processConnecting = async (connector = 'injected') => {
    setConnector(connector);
    await connectWallet(connector as any);
    if (isMounted) {
      forceRerender({});
    }
  };

  const handleConnectMetaMask = () => {
    analytics.sendEvent(
      GOOGLE_ANALYTIC_EVENTS.CLICK_CONNECT_METAMASK_CONNECT_WALLET_MODAL
    );
    handleConnectWallet();
  };

  const handleConnectSafepal = () => {
    analytics.sendEvent(
      GOOGLE_ANALYTIC_EVENTS.CLICK_CONNECT_SAFEPAL_CONNECT_WALLET_MODAL
    );
    processConnecting('injected');
  };

  const handleConnectTrust = () => {
    analytics.sendEvent(
      GOOGLE_ANALYTIC_EVENTS.CLICK_CONNECT_TRUST_CONNECT_WALLET_MODAL
    );
    processConnecting('injected');
  };

  const handleConnectMathWallet = () => {
    analytics.sendEvent(
      GOOGLE_ANALYTIC_EVENTS.CLICK_CONNECT_MATHWALLET_CONNECT_WALLET_MODAL
    );
    handleConnectWallet();
  };

  const handleConnectTokenPocket = () => {
    analytics.sendEvent(
      GOOGLE_ANALYTIC_EVENTS.CLICK_CONNECT_TOKENPOCKET_CONNECT_WALLET_MODAL
    );
    processConnecting('injected');
  };

  const handleConnectCoin98 = () => {
    analytics.sendEvent(
      GOOGLE_ANALYTIC_EVENTS.CLICK_CONNECT_COIN98_CONNECT_WALLET_MODAL
    );
    processConnecting('injected');
  }

  const handleConnectBitKeep = () => {
    analytics.sendEvent(
      GOOGLE_ANALYTIC_EVENTS.CLICK_CONNECT_BITKEEP_CONNECT_WALLET_MODAL
    );
    processConnecting('injected');
  }

  const handleConnectBSC = () => {
    analytics.sendEvent(
      GOOGLE_ANALYTIC_EVENTS.CLICK_CONNECT_BSCWALLET_CONNECT_WALLET_MODAL
    );
    if ((window as WindowChain).BinanceChain !== undefined) {
      processConnecting('bsc');
    } else {
      HunnyToast.error(t('Wallet is not found!'));
    }
  };

  const handleConnectWalletconnect = async () => {
    analytics.sendEvent(
      GOOGLE_ANALYTIC_EVENTS.CLICK_WALLET_CONNECT_CONNECT_WALLET_MODAL
    );
    setConnector('walletconnect');
    await connectWallet('walletconnect');
    await connectWallet('walletconnect');
  };

  const connectWallet = async (
    connectorId:
      | 'walletconnect'
      | 'authereum'
      | 'fortmatic'
      | 'frame'
      | 'injected'
      | 'portis'
      | 'squarelink'
      | 'provided'
      | 'torus'
      | 'walletlink'
      | 'bsc'
  ) => {
    await connect(connectorId as any);
  };

  return (
    <Modal onDismiss={onDismiss}>
      <ModalTitle text={t('Connect Wallet')} />
      <ModalContent>
        <StyledWalletsWrapper>
          <WalletCard
            icon={<img src={metamaskLogo} style={{ height: 32 }} />}
            onConnect={handleConnectMetaMask}
            title="Metamask"
          />
          <Spacer size="sm" />
          <WalletCard
            icon={<img src={trustWalletLogo} style={{ height: 34 }} />}
            onConnect={handleConnectTrust}
            title="TrustWallet"
          />
          <Spacer size="sm" />
          <WalletCard
            icon={<img src={mathWalletLogo} style={{ height: 34 }} />}
            onConnect={handleConnectMathWallet}
            title="MathWallet"
          />
          <Spacer size="sm" />
          <WalletCard
            icon={<img src={safepalLogo} style={{ height: 34 }} />}
            onConnect={handleConnectSafepal}
            title="SafePal"
          />
          <Spacer size="sm" />
          <WalletCard
            icon={<img src={bscWalletLogo} style={{ height: 34 }} />}
            onConnect={handleConnectBSC}
            title="Binance Chain Wallet"
          />
          <Spacer size="sm" />
          <WalletCard
            icon={<img src={tokenPocketLogo} style={{ height: 34 }} />}
            onConnect={handleConnectTokenPocket}
            title="TokenPocket"
          />
          <Spacer size="sm" />
          <WalletCard
            icon={<img src={coin98Logo} style={{ height: 34 }} />}
            onConnect={handleConnectCoin98}
            title="Coin98"
          />
          <Spacer size="sm" />
          <WalletCard
            icon={<img src={bitKeepLogo} style={{ height: 34 }} />}
            onConnect={handleConnectBitKeep}
            title="BitKeep"
          />
          <Spacer size="sm" />
          <WalletCard
            icon={<img src={walletConnectLogo} style={{ height: 24 }} />}
            onConnect={handleConnectWalletconnect}
            title="WalletConnect"
          />
          <StyledHelp>
            <Trans>Please connect your wallet with</Trans>
            <StyledLink
              onClick={() =>
                analytics.sendEvent(
                  GOOGLE_ANALYTIC_EVENTS.CLICK_BSC_DOCS_CONNECT_WALLET_MODAL
                )
              }
              target="_blank"
              href="https://docs.binance.org/smart-chain/wallet/metamask.html"
            >
              <Trans>Binance Smart Chain</Trans>
            </StyledLink>
          </StyledHelp>
        </StyledWalletsWrapper>
      </ModalContent>
    </Modal>
  );
};

const StyledError = styled.div`
  color: #f55c22;
  margin-top: 16px;
  margin-bottom: -14px;
`;

const StyledWalletsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHelp = styled.div`
  text-align: center;
  color: ${(props) => props.theme.color.grey[300]};
  font-size: 18px;
  margin-top: 30px;
`;

const StyledLink = styled.a`
  display: block;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
  color: ${(props) => props.theme.color.yellow[100]};
  &:hover {
    text-decoration: underline;
  }
`;

export default WalletProviderModal;
