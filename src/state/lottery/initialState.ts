import BigNumber from "bignumber.js";
import { LotteryState } from "../../modules/models/lottery.models";

export const initialLotteryState: LotteryState = {
  currentRoundNumber: null,
  currentRound: {
    isLoading: false,
    roundNumber: null,
    winningNumber: null,
    winners: null,
    totalPot: new BigNumber(0),
    potDetails: [
      { number: 4, prize: new BigNumber(0), winner: 0 },
      { number: 3, prize: new BigNumber(0), winner: 0 },
      { number: 2, prize: new BigNumber(0), winner: 0 },
      { number: -1, prize: new BigNumber(0), winner: 0 }
    ],
    myTickets: [],
    isLoadingTicket: true
  },
  latestRound: {
    isLoading: false,
    roundNumber: null,
    winningNumber: null,
    totalPot: new BigNumber(0),
    winners: null,
    potDetails: [
      { number: 4, prize: new BigNumber(0), winner: 0 },
      { number: 3, prize: new BigNumber(0), winner: 0 },
      { number: 2, prize: new BigNumber(0), winner: 0 },
      { number: -1, prize: new BigNumber(0), winner: 0 }
    ],
    myTickets: [],
    isLoadingTicket: true
  },
  searchRound: {
    isLoading: false,
    roundNumber: null,
    winningNumber: null,
    totalPot: new BigNumber(0),
    winners: null,
    potDetails: [
      { number: 4, prize: new BigNumber(0), winner: 0 },
      { number: 3, prize: new BigNumber(0), winner: 0 },
      { number: 2, prize: new BigNumber(0), winner: 0 },
      { number: -1, prize: new BigNumber(0), winner: 0 }
    ],
    myTickets: null,
    isLoadingTicket: true
  },
  allowance: new BigNumber(0),
  isDisableBuy: false,
  myPrize: { prize: new BigNumber(0), tokens: [] },
  isPrizeLoading: false,
  lotteryEndAtHours: null,
  lotteryStartAtHours: null
};
