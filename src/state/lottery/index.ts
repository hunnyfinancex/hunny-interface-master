/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import { LotteryRound, LotteryState, MyPrize } from '../../modules/models/lottery.models';
import { initialLotteryState } from './initialState';
import {
  getLotteryDrawingPhase,
  getLotteryIssueIndex,
  getLotteryTicketsHaveReward,
  getLotteryTicketsInRoundOfAccount,
  getLotteryTotalAmount,
  getLotteryWinningNumbers,
} from '../../modules/lottery';
import {
  LOTTERY_MATCH_2_RATIO,
  LOTTERY_MATCH_3_RATIO,
  LOTTERY_MATCH_4_RATIO,
  LOTTERY_MATCH_BURN_RATIO,
} from '../../constants/values';
import { getTokenAllowance } from '../../modules/infura';
import { getAddress, loadLotteryCounter, loadLotteryWinners } from '../../modules/utils';
import { TOKENS } from '../../constants/tokens';
import { HUNNY_LOTTERY } from '../../constants/contracts';

const initialState: LotteryState = initialLotteryState;

export const fetchCurrentRoundNumber = () =>
  async (dispatch: any) => {
    const roundNumber = await getLotteryIssueIndex();

    dispatch(setCurrentRoundNumber(roundNumber));
  };

export const fetchMyPrize = (account: string) =>
  async (dispatch: any) => {
    if (account) {
      dispatch(setPrizeLoading(true));
      const tickets = await getLotteryTicketsHaveReward(account);
      let prize = new BigNumber(0);
      let ticketToClaims = [];
      for (let i = 0; i < tickets.length; i++) {
        prize = prize.plus(tickets[i].reward);
        ticketToClaims.push(tickets[i].token);
      }

      dispatch(setPrizeValue({ prize, tokens: ticketToClaims }));

      setTimeout(() => {
        dispatch(setPrizeLoading(false));
      }, 600)
    } else {
      dispatch(setPrizeValue({ prize: new BigNumber(0), tokens: [] }));
    }
  };

export const fetchLotteryRound = (roundNumber: number) =>
  async (dispatch: any) => {

    dispatch(setLotteryRoundLoading([true, roundNumber]));

    let winningNumbers = await getLotteryWinningNumbers(roundNumber);
    let winners = await loadLotteryWinners(roundNumber);

    if (winningNumbers[0] === 0) {
      winningNumbers = null;
    }
    const totalAmount = await getLotteryTotalAmount(roundNumber);
    const potDetails = [
      { number: 4, prize: totalAmount.multipliedBy(LOTTERY_MATCH_4_RATIO).dividedBy(100), winner: 0 },
      { number: 3, prize: totalAmount.multipliedBy(LOTTERY_MATCH_3_RATIO).dividedBy(100), winner: 0 },
      { number: 2, prize: totalAmount.multipliedBy(LOTTERY_MATCH_2_RATIO).dividedBy(100), winner: 0 },
      { number: -1, prize: totalAmount.multipliedBy(LOTTERY_MATCH_BURN_RATIO).dividedBy(100), winner: 0 }
    ]


    dispatch(setLotteryTotalAmount([totalAmount, potDetails, roundNumber, winners]));
    dispatch(setLotteryWinningNumbers([winningNumbers, roundNumber]));
    setTimeout(() => {
      dispatch(setLotteryRoundLoading([false, roundNumber]));
    }, 1000)
  };

export const fetchLotteryTotalAmount = (roundNumber: number, isFetchWinners = false) =>
  async (dispatch: any) => {

    const totalAmount = await getLotteryTotalAmount(roundNumber);
    let winners = isFetchWinners ? await loadLotteryWinners(roundNumber) : null;

    const potDetails = [
      { number: 4, prize: totalAmount.multipliedBy(LOTTERY_MATCH_4_RATIO).dividedBy(100), winner: 0 },
      { number: 3, prize: totalAmount.multipliedBy(LOTTERY_MATCH_3_RATIO).dividedBy(100), winner: 0 },
      { number: 2, prize: totalAmount.multipliedBy(LOTTERY_MATCH_2_RATIO).dividedBy(100), winner: 0 },
      { number: -1, prize: totalAmount.multipliedBy(LOTTERY_MATCH_BURN_RATIO).dividedBy(100), winner: 0 }
    ]

    dispatch(setLotteryTotalAmount([totalAmount, potDetails, roundNumber, winners]));
  };

export const fetchWinningNumbers = (roundNumber: number) =>
  async (dispatch: any) => {
    let winningNumbers = await getLotteryWinningNumbers(roundNumber);
    if (winningNumbers[0] === 0) {
      winningNumbers = null;
    }

    dispatch(setLotteryWinningNumbers([winningNumbers, roundNumber]));
  };

export const fetchLotteryCounter = () =>
  async (dispatch: any) => {
    const data = await loadLotteryCounter() as [string, string];
    dispatch(setLotteryCounter(data));

  };

// TODO integration
export const fetchLotteryWinners = (roundNumber: number) =>
  async (dispatch: any) => {

  };

export const fetchRoundStatus = () =>
  async (dispatch: any) => {
    const isBuyable = await getLotteryDrawingPhase();

    dispatch(setDisableBuy(!isBuyable));
  };

export const fetchLotteryAllowance = (account: string) =>
  async (dispatch: any) => {
    if (!account) {
      return;
    }
    const allowance = await getTokenAllowance(TOKENS.HUNNY.addresses, account, getAddress(HUNNY_LOTTERY));

    dispatch(setLotteryAllowance(allowance));
  };

export const fetchMyTicket = (account: string, roundNumber: number) =>
  async (dispatch: any) => {
    if (!roundNumber) {
      return;
    }

    if (!account) {
      dispatch(setMyTicket([null, roundNumber]));
      dispatch(setLoadingTicket([false, roundNumber]));
      return;
    }
    dispatch(setLoadingTicket([true, roundNumber]));
    const myTickets = await getLotteryTicketsInRoundOfAccount(account, roundNumber)
    dispatch(setMyTicket([myTickets, roundNumber]));
    dispatch(setLoadingTicket([false, roundNumber]));
  };


export const LotterySlice = createSlice({
  name: 'Lottery',
  initialState,
  reducers: {
    setCurrentRoundNumber: (state, action) => {
      let currentRoundNumber: number = action.payload;
      state.currentRoundNumber = currentRoundNumber;
      state.currentRound.roundNumber = currentRoundNumber;
      state.latestRound.roundNumber = currentRoundNumber - 1;
      return state;
    },
    setLotteryRound: (state, action) => {
      let lotteryRound: LotteryRound = action.payload;
      if (lotteryRound.roundNumber === state.currentRoundNumber) {
        state.currentRound = lotteryRound;
      } else if (lotteryRound.roundNumber === state.currentRoundNumber - 1) {
        state.latestRound = lotteryRound;
      } else if (lotteryRound.roundNumber < state.currentRoundNumber) {
        state.searchRound = lotteryRound
      }

      return state;
    },
    setLotteryTotalAmount: (state, action) => {
      let [totalAmount, potDetails, roundNumber, winners]: [BigNumber, any, number, number[]] = action.payload;


      const round = getRound(state, roundNumber);
      round.winners = winners || round.winners;
      round.totalPot = totalAmount;
      round.potDetails = potDetails;

      return state;
    },
    setLotteryWinningNumbers: (state, action) => {
      let [winningNumber, roundNumber]: [[number, number, number, number], number] = action.payload;

      const round = getRound(state, roundNumber);
      round.winningNumber = winningNumber;

      return state;
    },
    setLotteryRoundLoading: (state, action) => {
      let [isLoading, roundNumber]: [boolean, number] = action.payload;

      const round = getRound(state, roundNumber);
      round.isLoading = isLoading;

      return state;
    },
    setMyTicket: (state, action) => {
      const [myTickets, roundNumber]: [any, number] = action.payload;

      const round = getRound(state, roundNumber);
      round.myTickets = myTickets;

      return state;
    },
    setLoadingTicket: (state, action) => {
      const [isLoading, roundNumber]: [boolean, number] = action.payload;
      const round = getRound(state, roundNumber);
      round.isLoadingTicket = isLoading;

      return state;
    },
    setLotteryAllowance: (state, action) => {
      let allowance: BigNumber = action.payload;
      state.allowance = allowance;
      return state;
    },
    setDisableBuy: (state, action) => {
      let disableBuy: boolean = action.payload;
      state.isDisableBuy = disableBuy;
      return state;
    },
    setPrizeValue: (state, action) => {
      let prize: MyPrize = action.payload;
      state.myPrize = prize;
      return state;
    },
    setPrizeLoading: (state, action) => {
      let isLoading: boolean = action.payload;
      state.isPrizeLoading = isLoading;
      return state;
    },
    setLotteryCounter: (state, action) => {
      let [start, end]: [string, string] = action.payload;
      state.lotteryStartAtHours = start;
      state.lotteryEndAtHours = end;
      return state;
    }
  },
  extraReducers: (builder) => { },
});


// helper get round by round number
const getRound = (state: any, roundNumber: number): LotteryRound => {
  if (Number(roundNumber) === Number(state.currentRoundNumber)) {
    return state.currentRound;
  } else if (Number(roundNumber) === Number(state.currentRoundNumber - 1)) {
    return state.latestRound;
  } else if (Number(roundNumber) < Number(state.currentRoundNumber)) {
    return state.searchRound;
  }
}

// Actions
export const {
  setCurrentRoundNumber,
  setLotteryRound,
  setLotteryAllowance,
  setMyTicket,
  setLoadingTicket,
  setDisableBuy,
  setLotteryTotalAmount,
  setLotteryWinningNumbers,
  setLotteryRoundLoading,
  setPrizeValue,
  setPrizeLoading,
  setLotteryCounter
} = LotterySlice.actions;

export default LotterySlice.reducer;
