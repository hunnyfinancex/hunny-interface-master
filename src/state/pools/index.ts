/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import { HUNNY_AUTO_POOL, POOL_LIST } from 'constants/pools';
import { AssetEnum, AssetTypeEnum } from 'modules/enums/Asset.enum';
import { PoolTypeEnum } from '../../modules/enums/Pool.enum';
import { getTokenAllowance, getTokenBalance } from '../../modules/infura';
import { PoolInfo, PoolsState } from '../../modules/models/pool.model';
import { PoolCardItemViewModel } from '../../modules/models/poolCardItemViewmodel.model';
import { poolServiceMapper } from '../../modules/pools/BuildPoolMapper';
import {
  getAddress,
  getMaxHunnyTransferAmount,
  getTotalDepositAllPools,
  getTotalHunnyMarketCap,
  loadPoolInfoes,
} from '../../modules/utils';
import { initialPoolState } from './initialState';

const initialState: PoolsState = initialPoolState;

export const fetchPoolBalanceInUsd =
  (account: any, poolDetails: PoolCardItemViewModel) =>
    async (dispatch: any) => {
      const pool = poolServiceMapper.getBuildPool(
        getAddress(poolDetails.addresses)
      );
      let balanceInUsd = new BigNumber(0);
      if (account) {
        balanceInUsd = await pool.getBalanceInUsd(account);
      }

      dispatch(setPoolBalanceInUsd([balanceInUsd, poolDetails.id]));
    };

export const fetchVestingBalance =
  (account: any, poolDetails: PoolCardItemViewModel) =>
    async (dispatch: any) => {
      if (!poolDetails.isVesting) {
        return;
      }

      const pool = poolServiceMapper.getBuildPool(
        getAddress(poolDetails.addresses)
      );
      let tokenClaimable = new BigNumber(0);
      let tokenLockAmount = new BigNumber(0);
      let tokenUnlockedAmount = new BigNumber(0);
      let tokenPenalty = new BigNumber(0);

      if (account) {
        tokenClaimable = await pool.getTokenClaimable(account);
        tokenLockAmount = await pool.getTokenLockAmount(account);
        tokenUnlockedAmount = await pool.getTokenUnlockedAmount(account);
        tokenPenalty = await pool.getTokenPenalty(account);
      }

      dispatch(setPoolVestingBalance([tokenLockAmount, tokenUnlockedAmount, tokenClaimable, tokenPenalty, poolDetails.id]));
    };

export const fetchPoolProfitInUsd =
  (account: any, poolDetails: PoolCardItemViewModel) =>
    async (dispatch: any) => {
      const pool = poolServiceMapper.getBuildPool(
        getAddress(poolDetails.addresses)
      );
      let profitInUsd = new BigNumber(0);
      if (account && !poolDetails.tag.includes(AssetEnum.Hunny)) {
        profitInUsd = await pool.getProfitInUsd(account);
      }

      dispatch(setPoolProfitInUsd([profitInUsd, poolDetails.id]));
    };

export const fetchPoolProfit =
  (account: any, poolDetails: PoolCardItemViewModel) =>
    async (dispatch: any) => {
      const pool = poolServiceMapper.getBuildPool(
        getAddress(poolDetails.addresses)
      );
      let poolProfit = [new BigNumber(0), new BigNumber(0), new BigNumber(0)];
      if (account) {
        poolProfit = await pool.profitOf(account);
      }

      dispatch(setPoolProfit([poolProfit, poolDetails.id]));
    };

export const fetchPoolBalance =
  (account: any, poolDetails: PoolCardItemViewModel) =>
    async (dispatch: any) => {
      const pool = poolServiceMapper.getBuildPool(
        getAddress(poolDetails.addresses)
      );
      let balance = new BigNumber(0);
      if (account) {
        balance = await pool.balanceOf(account);
      }

      dispatch(setPoolBalance([balance, poolDetails.id]));
    };

export const fetchTotalDepositedValue = () => async (dispatch: any) => {
  const totalDepositInUsd = await getTotalDepositAllPools();

  dispatch(setTotalDepositedValue(totalDepositInUsd));
};

export const fetchTotalMarketCap = () => async (dispatch: any) => {
  const totalMcInUsd = await getTotalHunnyMarketCap();
  dispatch(setTotalMarketcap(totalMcInUsd));
};

export const fetchTotalDeposited =
  (poolDetails: PoolCardItemViewModel) => async (dispatch: any) => {
    const pool = poolServiceMapper.getBuildPool(
      getAddress(poolDetails.addresses)
    );

    const tvl = await pool.tvl();
    dispatch(setPoolTvl([tvl, poolDetails.code]));
  };

export const fetchPoolApy =
  (poolDetails: PoolCardItemViewModel) => async (dispatch: any) => {
    const pool = poolServiceMapper.getBuildPool(
      getAddress(poolDetails.addresses)
    );

    const apy = await pool.compoundApy(poolDetails.code);

    dispatch(setPoolApy([[
      Number(apy[0].toFixed(2)),
      Number(apy[1].toFixed(2))
    ], poolDetails.code]));
  };

export const fetchPoolInfoes = () => async (dispatch: any) => {
  const data = await loadPoolInfoes() as PoolInfo[];

  if (!data) {
    dispatch(setAPIFailedStatus(true));
    return;
  } else {
    dispatch(setAPIFailedStatus(false));
  }

  let totalDepositedValue = new BigNumber(0);

  data.forEach(item => {
    if (!item.apy) {
      const tvl = new BigNumber(item.tvl);
      // add tlv from another product.
      totalDepositedValue = totalDepositedValue.plus(tvl);
      return;
    }

    let apy = [];
    if (item.apy.apy) {
      apy = [Number(item.apy.apy || 0), Number(item.apy.apr || 0)];
    } else {
      apy = [Number(item.apy.pool || 0), Number(item.apy.hunny || 0)];
    }
    dispatch(setPoolApy([apy, item.code]));
    const tvl = new BigNumber(item.tvl);
    dispatch(setPoolTvl([tvl, item.code]));

    if (item.code !== HUNNY_AUTO_POOL.code) {
      totalDepositedValue = totalDepositedValue.plus(tvl);
    }
  });

  dispatch(setTotalDepositedValue(totalDepositedValue));
};

export const fetchPoolAllowance =
  (account: any, poolDetails: PoolCardItemViewModel) =>
    async (dispatch: any) => {
      let allowance = null;

      if (account) {
        allowance = await getTokenAllowance(
          poolDetails.depositToken.addresses,
          account,
          getAddress(poolDetails.addresses)
        );
      }

      dispatch(setPoolAllowance([allowance, poolDetails.id]));
    };

export const fetchTokenBalance =
  (account: any, poolDetails: PoolCardItemViewModel) =>
    async (dispatch: any) => {
      let tokenBalance = new BigNumber(0);
      if (account) {
        tokenBalance = await getTokenBalance(
          poolDetails.depositToken.addresses,
          account
        );
      }

      dispatch(setPoolTokenBalance([tokenBalance, poolDetails.id]));
    };

export const fetchWithdrawBalance =
  (account: any, poolDetails: PoolCardItemViewModel) =>
    async (dispatch: any) => {
      let withdrawBalance = new BigNumber(0);
      const pool = poolServiceMapper.getBuildPool(
        getAddress(poolDetails.addresses)
      );

      if (account) {
        withdrawBalance = await pool?.withdrawableBalanceOf(account);
      }

      dispatch(setPoolWithdrawBalance([withdrawBalance, poolDetails.id]));
    };

export const fetchAntiWhaleLimit = () => async (dispatch: any) => {
  const antiWhaleLimit = await getMaxHunnyTransferAmount();

  dispatch(setAntiWhaleLimit(antiWhaleLimit));
};

export const PoolsSlice = createSlice({
  name: 'Pools',
  initialState,
  reducers: {
    setPoolBalanceInUsd: (state, action) => {
      let [balanceInUsd, poolId]: [BigNumber, number] = action.payload;

      const poolDetails = state.pools[state.selectedPoolType].find(
        (item) => item.id === poolId
      );
      if (
        !poolDetails.balanceInUsd ||
        !poolDetails.balanceInUsd.isEqualTo(balanceInUsd)
      ) {
        poolDetails.balanceInUsd = balanceInUsd;

        const ids = [...state.depositedPoolIds[state.selectedPoolType]];

        if (!balanceInUsd.isEqualTo(0) && !ids.includes(poolId)) {
          ids.push(poolId);
          state.depositedPoolIds[state.selectedPoolType] = ids.sort(
            (a, b) => a - b
          );
        }

        if (balanceInUsd.isEqualTo(0) && ids.includes(poolId)) {
          ids.splice(ids.indexOf(poolId), 1);
          state.depositedPoolIds[state.selectedPoolType] = ids;
        }
      }

      return state;
    },
    setPoolVestingBalance: (state, action) => {
      let [tokenLockAmount, tokenUnlockedAmount, tokenClaimable, tokenExitAmount, poolId]: [BigNumber, BigNumber, BigNumber, BigNumber, number] = action.payload;

      const poolDetails = state.pools[state.selectedPoolType].find(
        (item) => item.id === poolId
      );

      poolDetails.tokenVestingAmount = tokenLockAmount;
      poolDetails.tokenVestingUnlocked = tokenUnlockedAmount
      poolDetails.tokenVestingClaimable = tokenClaimable
      poolDetails.tokenExitAmount = tokenExitAmount

      return state;
    },
    setPoolBalance: (state, action) => {
      let [balance, poolId]: [BigNumber, number] = action.payload;
      const poolDetails = state.pools[state.selectedPoolType].find(
        (item) => item.id === poolId
      );
      if (!poolDetails.balance || !poolDetails.balance.isEqualTo(balance)) {
        poolDetails.balance = balance;
      }

      return state;
    },
    setPoolProfitInUsd: (state, action) => {
      let [profitInUsd, poolId]: [BigNumber, number] = action.payload;
      const poolDetails = state.pools[state.selectedPoolType].find(
        (item) => item.id === poolId
      );
      if (
        !poolDetails.profitInUsd ||
        !poolDetails.profitInUsd.isEqualTo(profitInUsd)
      ) {
        poolDetails.profitInUsd = profitInUsd;
      }

      return state;
    },
    setPoolProfit: (state, action) => {
      let [profit, poolId]: [BigNumber[], number] = action.payload;
      const poolDetails = state.pools[state.selectedPoolType].find(
        (item) => item.id === poolId
      );
      poolDetails.profit = profit;

      return state;
    },
    setPoolTvl: (state, action) => {
      let [tvl, poolCode]: [BigNumber, string] = action.payload;
      const poolDetails = state.pools[state.selectedPoolType].find(
        (item) => item.code === poolCode
      );

      if (!poolDetails) {
        return state;
      }

      if (!poolDetails.tvl || !poolDetails.tvl.isEqualTo(tvl)) {
        poolDetails.tvl = tvl;
      }

      return state;
    },
    setPoolAllowance: (state, action) => {
      let [allowance, poolId]: [BigNumber, number] = action.payload;
      const poolDetails = state.pools[state.selectedPoolType].find(
        (item) => item.id === poolId
      );
      if (
        !poolDetails.allowance ||
        !poolDetails.allowance.isEqualTo(allowance)
      ) {
        poolDetails.allowance = allowance;
      }

      return state;
    },
    setPoolApy: (state, action) => {
      let [apy, poolCode]: [[number, number], string] = action.payload;
      const poolDetails = state.pools[state.selectedPoolType].find(
        (item) => item.code === poolCode
      );

      if (!poolDetails) {
        return state;
      }

      poolDetails.apy = apy;

      return state;
    },
    setSelectedPoolType: (state, action) => {
      let poolType: PoolTypeEnum = action.payload;
      state.selectedPoolType = poolType;

      return state;
    },
    setTotalMarketcap: (state, action) => {
      let totalMarketcap: BigNumber = action.payload;
      state.totalMarketCap = totalMarketcap;

      return state;
    },
    setTotalDepositedValue: (state, action) => {
      let totalDepositedValue: BigNumber = action.payload;
      state.totalDepositedValue = totalDepositedValue;

      return state;
    },
    setPoolTokenBalance: (state, action) => {
      let [tokenBalance, poolId]: [BigNumber, number] = action.payload;
      const poolDetails = state.pools[state.selectedPoolType].find(
        (item) => item.id === poolId
      );
      if (
        !poolDetails.tokenBalance ||
        !poolDetails.tokenBalance.isEqualTo(tokenBalance)
      ) {
        poolDetails.tokenBalance = tokenBalance;
      }

      return state;
    },
    setPoolWithdrawBalance: (state, action) => {
      let [withdrawBalance, poolId]: [BigNumber, number] = action.payload;
      const poolDetails = state.pools[state.selectedPoolType].find(
        (item) => item.id === poolId
      );
      if (
        !poolDetails.withdrawBalance ||
        !poolDetails.withdrawBalance.isEqualTo(withdrawBalance)
      ) {
        poolDetails.withdrawBalance = withdrawBalance;
      }

      return state;
    },
    setAntiWhaleLimit: (state, action) => {
      let antiWhaleLimit: BigNumber = action.payload;
      if (
        !state.antiWhaleLimit ||
        !state.antiWhaleLimit.isEqualTo(antiWhaleLimit)
      ) {
        state.antiWhaleLimit = antiWhaleLimit;
      }

      return state;
    },
    setAPIFailedStatus: (state, action) => {
      let isAPIfailed: boolean = action.payload;
      state.isAPIfailed = isAPIfailed;

      return state;
    },
    setSelectedAssets: (state, action) => {
      let selectedAssets: any = action.payload;

      state.selectedAssets = selectedAssets;
      return state;
    },

    setSearchValue: (state, action) => {
      let searchValue: any = action.payload;
      state.searchValue = searchValue;
      return state;
    },
  },
  extraReducers: (builder) => { },
});

// Actions
export const {
  setAntiWhaleLimit,
  setPoolWithdrawBalance,
  setPoolTokenBalance,
  setPoolBalanceInUsd,
  setPoolBalance,
  setPoolTvl,
  setSelectedPoolType,
  setTotalMarketcap,
  setTotalDepositedValue,
  setPoolApy,
  setPoolAllowance,
  setPoolProfit,
  setPoolProfitInUsd,
  setAPIFailedStatus,
  setSelectedAssets,
  setSearchValue,
  setPoolVestingBalance
} = PoolsSlice.actions;

export default PoolsSlice.reducer;
