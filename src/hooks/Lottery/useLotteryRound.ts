import { useSelector } from 'react-redux';
import { LotteryRound } from '../../modules/models/lottery.models';
import { State } from '../../modules/models/state.model';


export const useLotteryRound = (roundNumber: number): LotteryRound => {

  return useSelector(
    (state: State) => state.lottery.currentRoundNumber == roundNumber
      ? state.lottery.currentRound
      : state.lottery.currentRoundNumber == Number(roundNumber) + 1
        ? state.lottery.latestRound
        : state.lottery.searchRound
  );

};
