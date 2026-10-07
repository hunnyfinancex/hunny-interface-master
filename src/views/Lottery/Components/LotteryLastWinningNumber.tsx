import React, { useCallback } from 'react';
import styled from 'styled-components';
import TicketIcon from './../../../assets/img/ticket-gold-icon.png';
import LotteryBall from './LotteryBall';
import useModal from '../../../hooks/useModal';
import MyTicketModal from './MyTicketModal';
import lotterCoin from './../../../assets/img/lottery-coin-img.png';
import { useSelector } from 'react-redux';
import { State } from '../../../modules/models/state.model';
import { Trans } from 'react-i18next';

const LotteryLastWiningNumber: React.FC = () => {
  const roundNumber = useSelector(
    (state: State) => state.lottery.latestRound
  ).roundNumber;

  const latestRound = useSelector((state: State) => state.lottery.latestRound);

  const [onPresentMyTicketModal] = useModal(
    <MyTicketModal data={roundNumber} />
  );

  const onClickMyTicket = useCallback(() => {
    onPresentMyTicketModal();
  }, [onPresentMyTicketModal]);

  return (
    roundNumber && (
      <>
        <StyledCardContent>
          <StyledCoinImg src={lotterCoin} />
          <StyledContent>
            <StyledCardHeader>
              <Trans>Last Winning Numbers #{{ roundNumber }}</Trans>
            </StyledCardHeader>
            {latestRound.winningNumber && (
              <StyledWinningNumber>
                <LotteryBall value={latestRound.winningNumber[0]} />
                <LotteryBall value={latestRound.winningNumber[1]} />
                <LotteryBall value={latestRound.winningNumber[2]} />
                <LotteryBall value={latestRound.winningNumber[3]} />
              </StyledWinningNumber>
            )}
            {latestRound.winners && (
              <StyledMachingNumber>
                {!!latestRound.winners[0] && (
                  <span>
                    <Trans>Tickets matching {{ numbers: 4 }} numbers:</Trans>{' '}
                    {latestRound.winners[0]}
                  </span>
                )}
                {!!latestRound.winners[1] && (
                  <span>
                    <Trans>Tickets matching {{ numbers: 3 }} numbers:</Trans>{' '}
                    {latestRound.winners[1]}
                  </span>
                )}
                {!!latestRound.winners[2] && (
                  <span>
                    <Trans>Tickets matching {{ numbers: 2 }} numbers:</Trans>{' '}
                    {latestRound.winners[2]}
                  </span>
                )}
              </StyledMachingNumber>
            )}
          </StyledContent>
          <StyledCoinImg src={lotterCoin} />
        </StyledCardContent>

        <StyledSectionFooter>
          <StyledStroke />
          <StyledLink onClick={onClickMyTicket}>
            <Trans>View my ticket this round</Trans>
            <img src={TicketIcon} style={{ height: 18, marginLeft: 4 }} />
          </StyledLink>
        </StyledSectionFooter>
      </>
    )
  );
};

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.yellow[100]};
  font-size: 14px;
  font-weight: normal;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-top: 12px;

  justify-content: center;
  @media (max-width: 767px) {
    justify-content: start;
  }
`;

const StyledCardHeader = styled.div`
  display: flex;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;

  justify-content: center;
  @media (max-width: 767px) {
    justify-content: start;
  }
`;

const StyledCardContent = styled.div`
  color: ${(props) => props.theme.color.grey[300]};
  font-size: 14px;
  font-weight: 100;
  margin-bottom: 14px;

  display: flex;
`;

const StyledWinningNumber = styled.div`
  margin: 32px 0px;
  display: flex;

  flex-grow: 1;
  align-items: center;
  transform: scale(1.3, 1.3);

  justify-content: center;
  @media (max-width: 767px) {
    margin: 6px 0px;
    transform: scale(1, 1);
    justify-content: start;
  }
`;

const StyledContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const StyledCoinImg = styled.img`
  height: 240px;
  @media (max-width: 767px) {
    display: none;
  }
`;

const StyledSectionFooter = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
`;

const StyledStroke = styled.div`
  width: 100%;
  border-top: 2px solid #272f52;
  opacity: 0.5;
  margin: 12px 0px;
`;

const StyledMachingNumber = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
  line-height: 22px;
  letter-spacing: 1px;

  align-items: center;
  @media (max-width: 767px) {
    align-items: start;
  }
`;

export default LotteryLastWiningNumber;
