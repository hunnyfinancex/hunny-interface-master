import BigNumber from 'bignumber.js';
import { PoolCardItemViewModel } from './poolCardItemViewmodel.model';

export class PoolTypeCollection<T> {
  BSC: T[];
  ETH: T[];
}

export class PoolInfo {
  code: string;
  type: string;
  address: string;
  tvl: string;
  apy: {
    apr: string;
    apy: string;
    pool: string;
    hunny: string;
  }
}

export class PoolsState {
  selectedPoolType: 'BSC' | 'ETH';
  pools: PoolTypeCollection<PoolCardItemViewModel>;

  totalDepositedValue: BigNumber;
  totalMarketCap: BigNumber;
  searchValue: string;

  antiWhaleLimit: BigNumber;

  activePoolIds: PoolTypeCollection<number>;
  depositedPoolIds: PoolTypeCollection<number>;
  unsupportedPoolIds: PoolTypeCollection<number>;
  isAPIfailed: boolean;
  selectedAssets: any;
}
