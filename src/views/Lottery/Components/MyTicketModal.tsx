import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal, { ModalProps } from '../../../components/Modal';
import ticketBg from '../../../assets/img/lottery-ticket-bg.png';
import HunnyLoader from '../../../components/HunnyLoader';
import { useLotteryRound } from '../../../hooks/Lottery/useLotteryRound';
import { useAppDispatch } from '../../../state';
import { useWallet } from 'use-wallet';
import { fetchMyTicket } from '../../../state/lottery';
import hunnyLogo from '../../../assets/img/hunny-logo.png';
import ticketWinning from '../../../assets/img/ticket-winning.png';
import ticketIcon from '../../../assets/img/ticket-icon.png';
import LotteryButton from './LotteryButton';
import BuyTicketModal from './BuyTicketModal';
import useModal from '../../../hooks/useModal';
import { useSelector } from 'react-redux';
import { State } from '../../../modules/models/state.model';
import { Trans } from 'react-i18next';

const MyTicketModal: React.FC<ModalProps> = ({ onDismiss, data }) => {
  const { account } = useWallet();

  const [myTickets, setMyTickets]: [number[][], any] = useState(null);

  const currentRoundNumber = useSelector(
    (state: State) => state.lottery.currentRoundNumber
  );

  const winningNumber = useLotteryRound(data).winningNumber;
  const myTicket: number[][] = useLotteryRound(data).myTickets;

  const isDisableBuy = useSelector(
    (state: State) => state.lottery.isDisableBuy
  );

  const isLoading = useLotteryRound(data).isLoadingTicket;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMyTicket(account, data));
  }, [account]);

  useEffect(() => {
    if (winningNumber && myTicket) {
      const parsedTicket: number[][] = [];
      for (let i = 0; i < myTicket.length; i++) {
        const item = myTicket[i];
        let pairNumberCount = 0;
        for (let index = 0; index < 4; index++) {
          if (item[index] == winningNumber[index]) {
            pairNumberCount++;
          }
        }
        parsedTicket.push([...item, pairNumberCount]);
      }
      setMyTickets(parsedTicket.sort((item1, item2) => item2[4] - item1[4]));
    } else {
      setMyTickets(myTicket);
    }
  }, [winningNumber, myTicket]);

  const [onPresentBuyTicketModal] = useModal(<BuyTicketModal />);

  const onClickBuyTicket = useCallback(() => {
    onPresentBuyTicketModal();
  }, [onPresentBuyTicketModal]);

  const winningTicketCount = myTickets?.filter((item) => item[4] > 1).length;

  return (
    <Modal onDismiss={onDismiss}>
      <StyledModalInner>
        <StyledModalTitle>
          <Trans>View My Tickets</Trans> (
          {isLoading ? '...' : myTickets ? myTickets.length : '0'})
        </StyledModalTitle>

        <StyledContainer>
          {winningTicketCount ? (
            <StyledContent>
              <img src={ticketIcon} style={{ marginRight: 6 }} />
              <span>
                <Trans>Congratulation! You have</Trans>{' '}
                <StyledYellowText>({winningTicketCount})</StyledYellowText>{' '}
                <Trans>winning tickets.</Trans>
              </span>
            </StyledContent>
          ) : winningNumber && myTickets?.length > 0 ? (
            <StyledContent className="disabled">
              <img src={ticketIcon} style={{ marginRight: 6 }} />
              <span>
                <Trans>No winning tickets. Better luck next time!</Trans>
              </span>
            </StyledContent>
          ) : null}
          {myTickets?.length && account && !isLoading ? (
            myTickets?.map((item, index) => (
              <StyledTicketContainer
                key={index}
                className={
                  item[4] == 0 || item[4] == 1 ? 'is-false-ticket' : ''
                }
              >
                <StyledTicketImg src={ticketBg} />
                {item[4] && item[4] > 1 && (
                  <StyledWinningTicketImg src={ticketWinning} />
                )}
                <StyledTicketDisplay>
                  <StyledTicketNumber
                    className={
                      winningNumber && item[0] != winningNumber[0]
                        ? 'is-false-digit'
                        : ''
                    }
                  >
                    {item[0]}
                  </StyledTicketNumber>
                  <StyledTicketNumber
                    className={
                      winningNumber && item[1] != winningNumber[1]
                        ? 'is-false-digit'
                        : ''
                    }
                  >
                    {item[1]}
                  </StyledTicketNumber>
                  <StyledTicketNumber
                    className={
                      winningNumber && item[2] != winningNumber[2]
                        ? 'is-false-digit'
                        : ''
                    }
                  >
                    {item[2]}
                  </StyledTicketNumber>
                  <StyledTicketNumber
                    className={
                      winningNumber && item[3] != winningNumber[3]
                        ? 'is-false-digit'
                        : ''
                    }
                  >
                    {item[3]}
                  </StyledTicketNumber>
                </StyledTicketDisplay>
              </StyledTicketContainer>
            ))
          ) : isLoading ? (
            <StyledLoaderContainer>
              <HunnyLoader />{' '}
              <StyledLoadingText>
                <Trans>Loading...</Trans>
              </StyledLoadingText>
            </StyledLoaderContainer>
          ) : (
            <>
              <StyledNoTicketContentContainer>
                <StyledHunnyLogo src={hunnyLogo} />
                <StyledNoTicketContent>
                  <Trans>No tickets found.</Trans>
                </StyledNoTicketContent>
              </StyledNoTicketContentContainer>
              {currentRoundNumber == data && !isDisableBuy && (
                <LotteryButton onClick={onClickBuyTicket}>
                  <Trans>Buy Now</Trans>
                </LotteryButton>
              )}
            </>
          )}
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

const StyledHunnyLogo = styled.img``;
const StyledYellowText = styled.span`
  color: ${(props) => props.theme.color.yellow[100]};
  margin: 0px 4px;
`;

const StyledContent = styled.div`
  font-weight: bold;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: -0.02em;
  margin: 6px 0px;
  color: #ffffff;

  &.disabled {
    opacity: 0.6;
  }
`;

const StyledWinningTicketImg = styled.img`
  position: absolute;
  top: 50%;
  right: 0px;
  -webkit-transform: translate(-45%, -50%);
  -ms-transform: translate(-45%, -50%);
  transform: translate(-29%, -50%);

  @media (max-width: 512px) {
    width: 65px;
  }

  @media (max-width: 424px) {
    width: 50px;
  }

  @media (max-width: 374px) {
    width: 45px;
  }
`;

const StyledNoTicketContent = styled.span`
  color: ${(props) => props.theme.color.grey[300]};
  font-size: 14px;
  font-weight: 100;
`;

const StyledNoTicketContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24px 0px;
`;

const StyledContainer = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

const StyledTicketDisplay = styled.div`
  justify-content: flex-end;
  display: flex;
  width: 246px;
  position: absolute;
  top: 50%;
  left: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-45%, -50%);

  @media (max-width: 512px) {
    width: 175px;
  }

  @media (max-width: 374px) {
    width: 140px;
  }
`;

const StyledTicketImg = styled.img`
  width: 100%;
`;

const StyledTicketContainer = styled.div`
  position: relative;
  &.is-false-ticket {
    opacity: 0.4;
  }
`;

const StyledTicketNumber = styled.span`
  background: rgba(225, 225, 225, 0.2);
  border-radius: 8px;
  width: 56px;
  height: 56px;
  margin-left: 4px;
  align-items: center;
  justify-content: center;
  display: inline-flex;

  font-size: 36px;
  color: white;
  font-weight: bold;

  @media (max-width: 512px) {
    height: 40px;
    font-size: 26px;
  }

  @media (max-width: 374px) {
    height: 34px;
    font-size: 22px;
  }

  &.is-false-digit {
    background: rgba(0, 0, 0, 0.2);
    opacity: 0.2;
  }
`;

const StyledModalTitle = styled.div`
  color: ${(props) => props.theme.color.purple[100]};
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const StyledLoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  text-align: center;
  margin: ${(props) => props.theme.spacing[6]}px 0px;
`;

const StyledLoadingText = styled.div`
  margin-left: 12px;
  font-size: 18px;
  color: ${(props) => props.theme.color.grey[200]};
`;

export default MyTicketModal;
