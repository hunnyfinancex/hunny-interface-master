import React, { useCallback } from 'react';
import styled from 'styled-components';
import TicketIcon from './../../../assets/img/ticket-gold-icon.png';

import useModal from '../../../hooks/useModal';
import MyTicketModal from './MyTicketModal';
import { Trans } from 'react-i18next';

export interface LotteryViewMyTicketProps {
  roundNumber: number;
}

const LotteryViewMyTicket: React.FC<LotteryViewMyTicketProps> = ({
  roundNumber,
}) => {
  const [onPresentMyTicketModal] = useModal(
    <MyTicketModal data={roundNumber} />
  );

  const onClickMyTicket = useCallback(() => {
    onPresentMyTicketModal();
  }, [onPresentMyTicketModal]);

  return (
    <StyledLink onClick={onClickMyTicket}>
      <Trans>View My Tickets</Trans>
      <img src={TicketIcon} style={{ height: 18, marginLeft: 4 }} />
    </StyledLink>
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

export default LotteryViewMyTicket;
