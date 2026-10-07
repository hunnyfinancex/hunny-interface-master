import BigNumber from "bignumber.js";

export class PotDetails {
  // -1 is burn
  number: 2 | 3 | 4 | -1
  winner: number;
  prize: BigNumber;
}

export class LotteryRound {
  isLoading: boolean;
  roundNumber: number;
  winningNumber?: [number, number, number, number];
  // [match_four,  match_three, match_two]
  winners: number[];
  totalPot: BigNumber;
  potDetails: PotDetails[];

  myTickets?: [number, number, number, number][];
  isLoadingTicket: boolean;
}

export class MyPrize {
  prize: BigNumber;
  tokens: any[];
}

export class LotteryState {
  currentRoundNumber: number;
  currentRound: LotteryRound;
  latestRound: LotteryRound;
  searchRound: LotteryRound;

  allowance: BigNumber;
  isDisableBuy: boolean;
  myPrize: MyPrize;
  isPrizeLoading: boolean;

  lotteryStartAtHours: string;
  lotteryEndAtHours: string;

}