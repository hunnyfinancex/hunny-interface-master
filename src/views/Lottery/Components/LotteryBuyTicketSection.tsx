import React, { useCallback } from 'react';
import styled from 'styled-components';
import ticketImg from './../../../assets/img/lottery-ticket.png';
import LotteryButton from './LotteryButton';

import useModal from '../../../hooks/useModal';
import BuyTicketModal from './BuyTicketModal';
import LotteryViewMyTicket from './LotteryViewMyTicket';
import { useWallet } from 'use-wallet';
import UnlockButton from '../../../components/UnlockButton';
import { useSelector } from 'react-redux';
import { State } from '../../../modules/models/state.model';
import HunnyLoader from '../../../components/HunnyLoader';
import MyTicketModal from './MyTicketModal';
import { Trans } from 'react-i18next';

const LotteryBuyTicketSection: React.FC = () => {
  const { account } = useWallet();

  const currentRoundNumer = useSelector(
    (state: State) => state.lottery.currentRoundNumber
  );

  const isDisableBuy = useSelector(
    (state: State) => state.lottery.isDisableBuy
  );

  const myTicket = useSelector(
    (state: State) => state.lottery.currentRound.myTickets
  );

  const isLoading = useSelector(
    (state: State) => state.lottery.currentRound.isLoadingTicket
  );

  const [onPresentBuyTicketModal] = useModal(<BuyTicketModal />);
  const [onPresentMyTicketModal] = useModal(
    <MyTicketModal data={currentRoundNumer} />
  );

  const onClickBuyTicket = useCallback(() => {
    onPresentBuyTicketModal();
  }, [onPresentBuyTicketModal]);

  const onClickMyTicket = useCallback(() => {
    onPresentMyTicketModal();
  }, [onPresentMyTicketModal]);

  return (
    <>
      <StyledTicketContainer>
        <StyledTicketImg src={ticketImg}></StyledTicketImg>
        <StyledTicketContent>
          <Trans>My tickets for this round</Trans>
        </StyledTicketContent>
      </StyledTicketContainer>
      {(myTicket || !account) && !isLoading ? (
        <StyledTicketCounter onClick={account ? onClickMyTicket : null}>
          {account && myTicket ? myTicket.length : 0}
        </StyledTicketCounter>
      ) : (
        <StyledLoaderContainer>
          <HunnyLoader />
        </StyledLoaderContainer>
      )}
      <StyledButtonContainer>
        {account ? (
          <>
            <LotteryButton onClick={onClickBuyTicket} disabled={isDisableBuy}>
              <Trans>Buy Tickets</Trans>
            </LotteryButton>
            {isDisableBuy ? (
              <StyledBuyTicketDisableText>
                <Trans>
                  Ticket purchasing for the next round will be opened soon.
                </Trans>
              </StyledBuyTicketDisableText>
            ) : null}
          </>
        ) : (
          <UnlockButton />
        )}
      </StyledButtonContainer>

      <StyledSectionFooter>
        <LotteryViewMyTicket roundNumber={currentRoundNumer} />
      </StyledSectionFooter>
    </>
  );
};
const StyledTicketContainer = styled.div`
  position: relative;
  width: 190px;
  margin: 0px auto;
`;

const StyledButtonContainer = styled.div`
  margin-bottom: 12px;
`;

const StyledTicketImg = styled.img`
  width: 100%;
  position: absolute;
  top: -46px;

  @media (max-width: 767px) {
    top: -30px;
  }
`;

const StyledBuyTicketDisableText = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 12px;
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 14px;
`;

const StyledTicketContent = styled.div`
  color: white;
  padding-top: 94px;

  text-align: center;
  @media (max-width: 767px) {
    padding-top: 110px;
  }
`;

const StyledTicketCounter = styled.div`
  color: white;
  font-weight: bold;
  font-size: 42px;
  width: 100%;
  cursor: pointer;
  flex-grow: 1;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px 0px;
`;

const StyledSectionFooter = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
`;

const StyledLoaderContainer = styled.div`
  height: 46px;
  text-align: center;
  margin: 12px 0px;
`;

export default LotteryBuyTicketSection;
