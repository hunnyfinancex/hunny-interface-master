import React, { Suspense, useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import TopBar from './components/TopBar';
import ModalsProvider from './contexts/Modals';
import theme from './theme';
import Footer from './components/Footer';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './state';
import { Provider } from 'react-redux';
import HunnyLoader from './components/HunnyLoader';
import { useBNBPrice } from './hooks/useBNBPrice';
import HunnyUtility from './components/HunnyUtility';
import { ConnectionRejectedError, UseWalletProvider } from 'use-wallet';
import {
  BscConnector,
  UserRejectedRequestError,
} from '@binance-chain/bsc-connector';
import NFT from './views/NFT';
import Lottery from './views/Lottery';
import Zap from './views/Zap';
import { RefreshContextProvider } from './contexts/RefreshContext';
import './i18n';
import { useTranslation } from 'react-i18next';

const PoolDetails = React.lazy(() => import('./views/PoolDetails'));
const Pool = React.lazy(() => import('./views/Pool'));

const App: React.FC = () => {
  const notifyText = process.env.REACT_APP_NOTIFY_CONTENT;
  const notifyLink = process.env.REACT_APP_NOTIFY_LINK;

  const { isFirstLoadingBNBPrice } = useBNBPrice();

  const { i18n } = useTranslation();

  return (
    <Providers>
      {isFirstLoadingBNBPrice ? (
        <Loader />
      ) : (
        <>
          {notifyText ? (
            <StyledNotificationBar target="_blank" href={notifyLink}>
              {notifyText}
            </StyledNotificationBar>
          ) : null}
          <StyledBackground />
          <Router>
            <TopBar />
            <StyledContainer>
              <HunnyUtility></HunnyUtility>
              <ScrollToTop />
              <Switch>
                <Route exact path="/pools/:poolCode">
                  <Suspense fallback={<Loader />}>
                    <PoolDetails />
                  </Suspense>
                </Route>
                <Route exact path="/pools">
                  <Suspense fallback={<Loader />}>
                    <Pool />
                  </Suspense>
                </Route>

                <Route exact path="/convert">
                  <Zap />
                </Route>
                <Route exact path="/convert/BNB/:receiveTokenAddress">
                  <Zap isPayBNB isBackable />
                </Route>

                <Route exact path="/nft">
                  <NFT />
                </Route>

                <Route exact path="/lottery">
                  <Lottery />
                </Route>

                <Route path="/">
                  <Redirect to={`/pools`} />
                </Route>
              </Switch>
            </StyledContainer>
          </Router>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </>
      )}
    </Providers>
  );
};

const Loader = () => (
  <StyledLoaderContainer>
    <HunnyLoader />
  </StyledLoaderContainer>
);

const ScrollToTop = withRouter(({ history }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

  return null;
});

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <UseWalletProvider
          chainId={parseInt(process.env.REACT_APP_NETWORK_ID)}
          connectors={
            {
              walletconnect: {
                rpcUrl: 'https://bsc-dataseed.binance.org/',
                bridge: 'https://walletconnect-bridge.hunny.finance/',
              },
              bsc: {
                web3ReactConnector() {
                  return new BscConnector({ supportedChainIds: [56, 97] });
                },
                handleActivationError(err: any) {
                  if (err instanceof UserRejectedRequestError) {
                    return new ConnectionRejectedError();
                  }
                },
              },
            } as any
          }
        >
          <RefreshContextProvider>
            <ModalsProvider>{children}</ModalsProvider>
          </RefreshContextProvider>
        </UseWalletProvider>
      </Provider>
    </ThemeProvider>
  );
};

const StyledNotificationBar = styled.a`
  height: 48px;
  margin-bottom: 6px;
  background-color: #f7fac0;
  line-height: 46px;
  text-align: center;
  font-size: 14px;
  color: #172b4d;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 0px 8px;
  cursor: pointer;
  transition: all 0.1s ease 0s;
  text-decoration: none;
`;

const StyledLoaderContainer = styled.div`
  height: 64px;
  text-align: center;
  margin: ${(props) => props.theme.spacing[6]}px 0px;
`;

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  background-position: 0px -30vh;
  background-repeat: no-repeat;
  background-image: radial-gradient(
    50% 50% at 50% 50%,
    rgba(33, 114, 229, 0.1) 0%,
    rgba(33, 36, 41, 0) 100%
  );
`;

const StyledContainer = styled.div`
  flex-grow: 1;
`;

export default App;
