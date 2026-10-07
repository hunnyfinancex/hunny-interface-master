import { getSystemCurrentLotteryRound } from 'modules/utils';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useWallet } from 'use-wallet';
import { BLOCK_INTERVAL } from '../../constants/values';
import { State } from '../../modules/models/state.model';
import { useAppDispatch } from '../../state';
import { fetchCurrentRoundNumber, fetchLotteryAllowance, fetchLotteryCounter, fetchLotteryRound, fetchLotteryTotalAmount, fetchMyPrize, fetchMyTicket, fetchRoundStatus, fetchWinningNumbers } from '../../state/lottery';


export const useLottery = () => {
  const { account } = useWallet();

  const dispatch = useAppDispatch();

  const currentRoundNumber = useSelector(
    (state: State) => state.lottery.currentRoundNumber
  );

  const winningNumber = useSelector(
    (state: State) => state.lottery.currentRound.winningNumber
  );

  const isHaveWinnersList = useSelector(
    (state: State) => !!state.lottery.currentRound.winners
  );


  // fetch counter
  useEffect(() => {
    const fetch = async () => {
      dispatch(fetchLotteryCounter());
    };

    fetch();

    const interval = setInterval(fetch, 60000);
    return () => clearInterval(interval);
  }, []);

  // fetch current round number
  useEffect(() => {
    const fetch = async () => {
      dispatch(fetchCurrentRoundNumber());
    };

    fetch();

    const interval = setInterval(fetch, BLOCK_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // fetch curent round
  useEffect(() => {

    const fetch = async () => {
      if (currentRoundNumber) {
        let isFetchWinners = false;

        if (!!winningNumber && !isHaveWinnersList || true) {
          const systemCurrentRound = await getSystemCurrentLotteryRound();
          isFetchWinners = currentRoundNumber == systemCurrentRound;
        }

        dispatch(fetchLotteryTotalAmount(currentRoundNumber, isFetchWinners));

        dispatch(fetchWinningNumbers(currentRoundNumber));
        dispatch(fetchRoundStatus());
      }
    };

    fetch();

    const interval = setInterval(fetch, BLOCK_INTERVAL);
    return () => clearInterval(interval);
  }, [currentRoundNumber, !!winningNumber, !!isHaveWinnersList]);

  // fetch latest round
  useEffect(() => {
    if (currentRoundNumber) {
      const fetch = async () => {

        dispatch(fetchLotteryTotalAmount(currentRoundNumber - 1, true));
        dispatch(fetchWinningNumbers(currentRoundNumber - 1));
      };

      fetch();
    }

  }, [currentRoundNumber]);

  // fetch my ticket
  useEffect(() => {
    const fetch = async () => {
      dispatch(fetchLotteryAllowance(account));
      dispatch(fetchMyTicket(account, currentRoundNumber));
    };

    setTimeout(fetch);
  }, [account, currentRoundNumber]);

  // fetch my prize
  useEffect(() => {
    dispatch(fetchMyPrize(account));
  }, [account, !!winningNumber]);

};
