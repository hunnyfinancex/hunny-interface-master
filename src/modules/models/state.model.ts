import { AppState } from './app.models';
import { LotteryState } from './lottery.models';
import { PoolsState } from './pool.model';
import { ZapState } from './zap.model';

export interface State {
  pools: PoolsState;
  lottery: LotteryState;
  app: AppState;
  zap: ZapState;
}
