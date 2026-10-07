import { CircularProgress } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React, { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import Modal, { ModalProps } from '../../../components/Modal';
import NumberDisplay from '../../../components/NumberDisplay';
import { PendingTransactionDisplay } from '../../../components/ToastContent/ToastPendingTransaction';
import { SuccessTransactionDisplay } from '../../../components/ToastContent/ToastSuccessTransaction';
import { HUNNY_PER_TICKET_RATE } from '../../../constants/lottery';
import { TOKENS } from '../../../constants/tokens';
import { BLOCK_INTERVAL } from '../../../constants/values';
import { getTokenBalance } from '../../../modules/infura';
import { State } from '../../../modules/models/state.model';
import { toTokenUnitsBN } from '../../../modules/number';
import { HunnyToast } from '../../../modules/toastify';
import { approve } from '../../../modules/web3';
import { useAppDispatch } from '../../../state';
import { fetchLotteryAllowance, fetchMyTicket } from '../../../state/lottery';
import LotteryButton from './LotteryButton';
import { buyLotteryTickets } from '../../../modules/lottery';
import { getAddress } from '../../../modules/utils';
import { HUNNY_LOTTERY } from '../../../constants/contracts';
import useExecute from '../../../hooks/useExecute';
import { Trans, useTranslation } from 'react-i18next';

const MAX_TICKET_BUY = 50;

const BuyTicketModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { ethereum, account } = useWallet();
  const { isPending, executeRequest } = useExecute();

  const { t } = useTranslation();

  const allowance = useSelector((state: State) => state.lottery.allowance);

  const currentRoundNumber = useSelector(
    (state: State) => state.lottery.currentRoundNumber
  );

  const dispatch = useAppDispatch();

  const [isInvalid, setIsInvalid] = useState(false);
  const [value, setValue] = useState('');
  const [balance, setBalance] = useState(new BigNumber(0));
  const [errorHint, setErrorHint] = useState('');

  useEffect(() => {
    const fetch = async () => {
      if (account) {
        const balance = await getTokenBalance(TOKENS.HUNNY.addresses, account);
        setBalance(balance);
      }
    };

    fetch();

    const interval = setInterval(fetch, BLOCK_INTERVAL);
    return () => clearInterval(interval);
  }, [account]);

  const fillMaxBalance = () => {
    const value = getMaxTicket();
    if (value > 0) {
      setValue(getMaxTicket().toString());
      resetErr();
    }
  };

  const getMaxTicket = useCallback(() => {
    const maxTicket = Math.floor(
      toTokenUnitsBN(balance.div(HUNNY_PER_TICKET_RATE), 18).toNumber()
    );
    return MAX_TICKET_BUY > maxTicket ? maxTicket : MAX_TICKET_BUY;
  }, [balance]);

  const validation = (value: string) => {
    const parsedValue = Number(value);
    const maxValue = getMaxTicket();
    const minValue = 0;

    if (maxValue < parsedValue || minValue > parsedValue) {
      const msg = 'Insufficient balance';
      setErrorHint(msg);
      setIsInvalid(true);
    } else {
      resetErr();
    }
  };

  const resetErr = () => {
    setErrorHint('');
    setIsInvalid(false);
  };

  const handleValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value.replace('.', '');
      const currentValue = Number(value); // some mobile device keyboard show comma instead of dot
      if (!currentValue && currentValue !== 0) {
        return;
      }

      const parts = value.split('.');

      if (parts[1]) {
        return;
      }

      validation(value);

      setValue(value);
    },
    [setValue, validation]
  );

  const handleBuyTicket = useCallback(async () => {
    if (ethereum && account) {
      executeRequest(
        buyLotteryTickets(ethereum, account, parseInt(value)),
        (hash: string) => {
          if (hash) {
            setValue('');
            dispatch(fetchMyTicket(account, currentRoundNumber));
          }
        }
      );
    }
  }, [ethereum, account, value]);

  const handleApprove = useCallback(async () => {
    if (ethereum && account) {
      executeRequest(
        approve(
          ethereum,
          TOKENS.HUNNY.addresses,
          account,
          getAddress(HUNNY_LOTTERY)
        ),
        (hash: string) => {
          if (hash) {
            dispatch(fetchLotteryAllowance(account));
          }
        }
      );
    }
  }, [ethereum, account]);

  return (
    <Modal onDismiss={onDismiss}>
      <StyledModalInner>
        <StyledModalTitle>
          <Trans>Buy Ticket</Trans>
        </StyledModalTitle>

        <StyledContainer>
          <StyledTicketControlContainer>
            <StyledBalance className={isInvalid ? 'error' : ''}>
              <Trans>Available</Trans>:{' '}
              <NumberDisplay value={balance} fixed={3} /> HUNNY
            </StyledBalance>

            <StyledWrapper className={isInvalid ? 'error' : ''}>
              <StypedTokenInput
                inputMode="numeric"
                value={value}
                placeholder="0"
                onChange={handleValueChange}
              />
              <StyledTokenSymbol>
                <Trans>TICKET</Trans>
              </StyledTokenSymbol>
              <StyledMaxBtn onClick={fillMaxBalance}>
                <Trans>MAX</Trans>
              </StyledMaxBtn>
              <StyledErrorHint className={isInvalid ? 'error' : ''}>
                {t(errorHint)}
              </StyledErrorHint>
            </StyledWrapper>
            <StyledDescriptionText
              style={{ width: '100%', textAlign: 'right' }}
            >
              <Trans>Max {{ amount: '50' }} tickets per transaction</Trans>
            </StyledDescriptionText>
          </StyledTicketControlContainer>

          <StyledTicketHunnyRate style={{ marginTop: 24 }}>
            1 <Trans>TICKET</Trans> = 100 HUNNY
          </StyledTicketHunnyRate>

          <StyledTicketHunnyRate
            className="highlight"
            style={{ marginBottom: 16 }}
          >
            <Trans>Total</Trans>: {Number(value) * HUNNY_PER_TICKET_RATE} HUNNY
          </StyledTicketHunnyRate>
          {allowance && allowance.gt(0) ? (
            <LotteryButton
              onClick={handleBuyTicket}
              disabled={!Number(value) || isInvalid || isPending}
            >
              {isPending && <StyledProgress size={18} />}
              <Trans>Submit</Trans>
            </LotteryButton>
          ) : (
            <LotteryButton onClick={handleApprove} disabled={isPending}>
              {isPending && <StyledProgress size={18} />}
              <Trans>Approve</Trans>
            </LotteryButton>
          )}

          <StyledDescriptionText>
            <Trans>
              Ticket purchases are final. Your HUNNY cannot be returned to you
              after buying tickets.
            </Trans>
          </StyledDescriptionText>
        </StyledContainer>
      </StyledModalInner>
    </Modal>
  );
};

const StyledModalInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 16px 0px;
  max-height: 480px;
`;

const StyledContainer = styled.div`
  flex-grow: 1;
`;

const StyledModalTitle = styled.div`
  color: ${(props) => props.theme.color.purple[100]};
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const StyledTicketControlContainer = styled.div`
  position: relative;
`;

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px;
  padding-right: 8px;
  background: #191d25;
  border: 1px solid #272f52;
  height: 46px;
  box-sizing: content-box;

  &.error {
    margin-bottom: 25px;
    border: 1px solid ${(props) => props.theme.color.red[900]};
  }
`;

const StyledErrorHint = styled.span`
  text-align: right;
  margin-top: 4px;
  color: ${(props) => props.theme.color.red[900]};
  font-size: 14px;
  transition: 0.3s;
  opacity: 0;
  position: absolute;
  bottom: -20px;
  right: 0px;
  &.error {
    opacity: 1;
  }
`;

const StypedTokenInput = styled.input`
  min-width: 0;
  width: 100%;
  flex: 1 1;
  margin: 0;
  padding: 6px 20px;
  background: none;
  outline: none;
  border: 0;
  font-size: 24px;
  text-align: right;
  color: #fff;
`;

const StyledBalance = styled.div`
  margin-top: ${(props) => props.theme.spacing[4]}px;
  margin-bottom: ${(props) => props.theme.spacing[1]}px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  text-align: right;
  color: ${(props) => props.theme.color.grey[200]};

  &.error {
    color: ${(props) => props.theme.color.red[900]};
  }
`;

const StyledTokenSymbol = styled.span`
  display: inline-block;
  color: ${(props) => props.theme.color.grey[400]};
  max-width: 35%;
  font-size: 16px;
  text-align: right;

  @media (max-width: 480px) {
    display: none;
  } ;
`;

const StyledMaxBtn = styled.button`
  outline: none;
  border: 0;
  border-radius: 5px;
  cursor: pointer;

  padding: 8px 8px;

  background-color: rgba(221, 104, 172, 0.2);
  color: #fff;

  font-size: 14px;
  letter-spacing: 0.5px;
  margin: 0 8px 0 20px;

  :hover {
    background-color: rgba(221, 104, 172, 0.3);
  }
`;

const StyledTicketHunnyRate = styled.div`
  font-size: 18px;
  width: 100%;
  color: ${(props) => props.theme.color.grey[200]};
  text-align: center;
  margin: 6px 0px;

  &.highlight {
    color: ${(props) => props.theme.color.purple[200]};
  }
`;

const StyledDescriptionText = styled.div`
  margin-top: ${(props) => props.theme.spacing[2]}px;
  display: inline-block;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: ${(props) => props.theme.color.grey[400]};
  box-sizing: border-box;

  position: relative;
`;

const StyledProgress = styled(CircularProgress)`
  color: #fff !important;
  margin-right: 4px;
`;
export default BuyTicketModal;
