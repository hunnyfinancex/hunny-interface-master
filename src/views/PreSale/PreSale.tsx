import React, { useCallback, useEffect, useState } from 'react';
import TokenInputControl from '../../components/TokenInputControl';
import styled from 'styled-components';
import bnbLogo from '../../assets/img/token-bnb.svg';
import ValueDisplay from '../../components/ValueDisplay';
import Stroke from '../../components/Stroke';
import BigNumber from 'bignumber.js';
import { useWallet } from 'use-wallet';
import {
  getBalance,
  getPresaleAvailableOf,
  getPresaleBalanceOf,
} from '../../modules/infura';
import { toBaseUnitBN, toTokenUnitsBN } from '../../modules/number';
import { sendPresaleDeposit } from '../../modules/web3';
import { PRESALE_CONTRACTS } from '../../constants/contracts';
import {
  PRESALE_END_DATE,
  PRESALE_EXCHANGE_RATE,
  PRESALE_MINIMUM_AMOUNT,
  PRESALE_START_DATE,
  TIME_ZONE,
} from '../../constants/values';
import Container from '../../components/Container';
import { getAddress, getExplorer } from '../../modules/utils';
import useModal from '../../hooks/useModal';
import WalletProviderModal from '../../components/WalletProviderModal';
import PresaleHeader from './components/PresaleHeader';
import Countdown, { CounterProps } from './components/Countdown';
import HunnyLoader from '../../components/HunnyLoader';
import { HunnyToast } from '../../modules/toastify';
import { CircularProgress } from '@material-ui/core';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import { getUTCDate } from '../../modules/dateTime';
import SOLD_OUT_BANNER from '../../assets/img/presale-end.jpg';
import { TOKENS } from '../../constants/tokens';
import { TimeDisplayValuesType } from '../../modules/models/shared.model';
import { useEventCounter } from '../../hooks/useEventCounter';

const COUNTER_PRESALE_START: CounterProps = {
  endDate: PRESALE_START_DATE,
  label: 'Pre-sale will start in',
};

const COUNTER_PRESALE_END: CounterProps = {
  endDate: PRESALE_END_DATE,
  label: 'Pre-sale will end in',
};

const COUNTER_PRESALE_ENDED: CounterProps = {
  endDate: PRESALE_END_DATE,
  label: 'PRE-SALE ended',
};

const getCountDownProps = () => {
  const now = getUTCDate(TIME_ZONE);
  if (now > PRESALE_START_DATE) {
    if (now > PRESALE_END_DATE) {
      return COUNTER_PRESALE_ENDED;
    }

    return COUNTER_PRESALE_END;
  }

  return COUNTER_PRESALE_START;
};

const PendingTransactionDisplay: React.FC = () => {
  return (
    <StyledNotifyContainer>
      <StyledLoaderContainer>
        <HunnyLoader />
      </StyledLoaderContainer>
      <StyledNotifyContent>Pending Transaction...</StyledNotifyContent>
    </StyledNotifyContainer>
  );
};

const SuccessTransactionDisplay: React.FC<{ hash: any }> = ({ hash }) => {
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
        <StyleContractDisplay
          target="_blank"
          href={`${getExplorer()}/tx/${hash}`}
          style={{ marginLeft: 8 }}
        >
          View on BSC
        </StyleContractDisplay>
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

const PreSale: React.FC = () => {
  const { ethereum, account } = useWallet();
  const [isPending, setIsPending] = useState(false);
  const [value, setValue] = useState('');
  const [balance, setBalance] = useState(new BigNumber(0));
  const [availableForDeposit, setAvailableForDeposit] = useState(
    new BigNumber(0)
  );
  const [depositBalance, setDepositBalance] = useState(new BigNumber(0));
  const [countDownProps, setCountDownProps] = useState<CounterProps>(
    getCountDownProps()
  );
  const [isDisabled, _] = useState(false);

  //TODO hardcode remove after event end.
  const [releaseCounter, setReleaseCounter] = useState('');

  const updateReleaseCounter = useCallback(
    (counter: TimeDisplayValuesType) => {
      setReleaseCounter(
        `(${counter.hours.toString().padStart(2, '0')}:${counter.minutes
          .toString()
          .padStart(2, '0')}:${counter.seconds.toString().padStart(2, '0')})`
      );
    },
    [setReleaseCounter]
  );

  const [isPresaleEnd] = useEventCounter(
    PRESALE_END_DATE,
    updateReleaseCounter
  );

  useEffect(() => {
    if (isPresaleEnd) window.location.reload();
  }, [isPresaleEnd]);

  useEffect(() => {
    const fetch = async () => {
      if (account) {
        const balance = await getBalance(account);
        const available = await getPresaleAvailableOf(account);
        const depositBalance = await getPresaleBalanceOf(account);

        setBalance(balance);
        setAvailableForDeposit(available);
        setDepositBalance(depositBalance.div(PRESALE_EXCHANGE_RATE));
      }
    };

    fetch();

    const interval = setInterval(fetch, 5000);
    return () => clearInterval(interval);
  }, [account, setBalance, setDepositBalance]);

  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider'
  );

  const showPendingNotify = () => {
    return HunnyToast.show(() => <PendingTransactionDisplay />, {
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
    });
  };

  const onDeposit = useCallback(async () => {
    if (ethereum && account && value != '') {
      if (toBaseUnitBN(value, 18).gt(availableForDeposit)) {
        HunnyToast.error(
          `Deposit must be lesser than ${toTokenUnitsBN(
            availableForDeposit,
            18
          ).toFixed(3)} BNB`
        );
      } else if (new BigNumber(value).lt(PRESALE_MINIMUM_AMOUNT)) {
        HunnyToast.error(
          `Deposit amount must be greater than ${PRESALE_MINIMUM_AMOUNT.toString(
            10
          )} BNB`
        );
      } else {
        setIsPending(true);
        const toastId = showPendingNotify();

        const hash = await sendPresaleDeposit(
          ethereum,
          account,
          balance,
          value
        );

        setIsPending(false);
        HunnyToast.dismiss(toastId);

        if (hash) {
          HunnyToast.show(() => <SuccessTransactionDisplay hash={hash} />);
          setValue('');
        }
      }
    }
  }, [
    ethereum,
    account,
    balance,
    availableForDeposit,
    value,
    setValue,
    setIsPending,
  ]);

  const handleCountDownEnded = useCallback(() => {
    if (countDownProps === COUNTER_PRESALE_START) {
      setCountDownProps(COUNTER_PRESALE_END);
    }
  }, [setCountDownProps]);

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal();
  }, [onPresentWalletProviderModal]);

  const presaleContract = getAddress(PRESALE_CONTRACTS);

  return (
    <StyledWrapper>
      <Container>
        <StyledContainerInner>
          <StyledCountdownContainer>
            <StyledDate>
              <h1>SOLD OUT</h1>
              <h2>PRE-SALE NOW CLOSED</h2>
              <h3>Stay tuned for the launch on Pancakeswap {releaseCounter}</h3>
            </StyledDate>
          </StyledCountdownContainer>

          <StyledHeaderImage src={SOLD_OUT_BANNER} />

          <PresaleHeader />

          <StyledPresaleRuleContainer>
            How it works?
            <StyleContractDisplay
              target="_blank"
              href="https://docs.hunny.finance/products/initial-hunny-offerings-iho"
              style={{
                display: 'block',
                marginTop: 4,
                fontSize: 18,
                color: '#478df7',
              }}
            >
              Read pre-sale rule
            </StyleContractDisplay>
          </StyledPresaleRuleContainer>
          <StyledCardDetails>
            <StyledCardDetailsHeader>
              <img src={bnbLogo} height="56" />
              <StyledCardDetailsTitle>Deposit BNB</StyledCardDetailsTitle>
            </StyledCardDetailsHeader>

            <StyledPresaleInfo>
              <Stroke />
              <ValueDisplay label="Your Total Deposit">
                <StyleDepositValue>
                  {`${toTokenUnitsBN(depositBalance, 18).toString(10)} BNB`}
                </StyleDepositValue>
              </ValueDisplay>
              <Stroke />
              <ValueDisplay label="Contract">
                <StyleDepositValue>
                  {/*🍯 Coming soon!*/}
                  {/* TODO waiting mainet contract */}
                  <StyleContractDisplay
                    target="_blank"
                    href={`${getExplorer()}/address/${presaleContract}`}
                  >
                    {`${presaleContract.substring(
                      0,
                      6
                    )}...${presaleContract.substring(
                      presaleContract.length - 4,
                      presaleContract.length
                    )}`}
                  </StyleContractDisplay>
                </StyleDepositValue>
              </ValueDisplay>
              <Stroke />
            </StyledPresaleInfo>

            <TokenInputControl
              token={TOKENS.BNB}
              balance={balance}
              maxBalance={
                balance.gt(availableForDeposit) ? availableForDeposit : balance
              }
              onChange={setValue}
              value={value}
            />
            <StyledMaxDeposited>
              Available for deposit{' '}
              {`${toTokenUnitsBN(availableForDeposit, 18).toFixed(3)} BNB`}
            </StyledMaxDeposited>

            {account ? (
              <StyledSubmitButton
                onClick={onDeposit}
                disabled={!Number(value) || isPending || isDisabled}
              >
                {isPending ? <StyledProgress size={18} /> : null}
                Deposit
              </StyledSubmitButton>
            ) : (
              <StyledSubmitButton
                onClick={handleUnlockClick}
                disabled={isDisabled}
              >
                Unlock wallet
              </StyledSubmitButton>
            )}
          </StyledCardDetails>
        </StyledContainerInner>
      </Container>
    </StyledWrapper>
  );
};

const StyledDate = styled.header`
  margin-bottom: 16px;

  & h1 {
    font-family: 'Ubuntu', mono;
    font-size: 28px;
    font-weight: bold;
    letter-spacing: 0.1875em;
    margin: unset;
    text-align: center;
    text-transform: uppercase;
  }

  & h2 {
    display: block;
    line-height: 2.5em;
    margin-top: 16px;
    opacity: 0.7;
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 0.1875em;
    margin: unset;
    text-align: center;
    text-transform: uppercase;
  }

  & h3 {
    display: block;
    line-height: 1.5em;
    padding-top: 8px;
    opacity: 0.7;
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 0.1875em;
    margin: unset;
    text-align: center;
    text-transform: uppercase;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Ubuntu';
`;

const StyledProgress = styled(CircularProgress)`
  color: #fff !important;
  margin-right: 4px;
`;

const StyledHeaderImage = styled.img`
  width: 100%;
  margin: auto;
  border-radius: 5px;
  margin-bottom: 64px;
`;

const StyledCountdownContainer = styled.div`
  padding: 1rem 1rem 0rem 1rem;

  color: ${(props) => props.theme.color.yellow[100]};
`;

const StyledPresaleInfo = styled.div`
  margin-top: ${(props) => props.theme.spacing[4]}px;
`;

const StyleContractDisplay = styled.a`
  cursor: pointer;
  text-decoration: underline;
  color: ${(props) => props.theme.color.grey[300]};

  font-weight: 100;
  font-size: 14px;
`;
const StyledContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-top: ${(props) => props.theme.spacing[6]}px;
`;

const StyleDepositValue = styled.div`
  text-align: right;
`;

const StyledMaxDeposited = styled.div`
  margin-top: ${(props) => props.theme.spacing[1]}px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  text-align: right;
  color: ${(props) => props.theme.color.grey[200]};
`;

const StyledCardDetailsHeader = styled.div`
  text-align: center;
  width: 100%;
  margin-top: ${(props) => props.theme.spacing[5]}px;
  margin-bottom: ${(props) => props.theme.spacing[3]}px;
`;

const StyledCardDetailsTitle = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  color: ${(props) => props.theme.color.purple[200]};
  margin-top: ${(props) => props.theme.spacing[2]}px;
`;

const StyledSubmitButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: ${(props) => props.theme.spacing[4]}px 0px
    ${(props) => props.theme.spacing[6]}px 0px;
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

const StyledCardDetails = styled.div`
  margin-top: 34px;
  padding: 0px ${(props) => props.theme.spacing[6]}px;
  box-sizing: border-box;
  position: relative;
  min-height: 300px;
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(108, 108, 108, 0.15);
  border-radius: 10px;

  @media (max-width: 768px) {
    padding: 0px ${(props) => props.theme.spacing[2]}px;
    border-radius: 2px;
  }
`;

const StyledPresaleRuleContainer = styled.div`
  text-align: center;
  font-size: 24px;
  color: white;
  margin-top: 34px;
`;

export default PreSale;
