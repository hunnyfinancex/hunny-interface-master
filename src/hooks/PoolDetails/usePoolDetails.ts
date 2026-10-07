import { useEffect } from 'react';
import { useWallet } from 'use-wallet';
import { useSelector } from 'react-redux';
import { BLOCK_INTERVAL } from '../../constants/values';
import { PoolCardItemViewModel } from '../../modules/models/poolCardItemViewmodel.model';
import { State } from '../../modules/models/state.model';
import { useAppDispatch } from '../../state';
import {
  fetchAntiWhaleLimit,
  fetchPoolAllowance,
  fetchPoolApy,
  fetchPoolBalance,
  fetchPoolBalanceInUsd,
  fetchPoolInfoes,
  fetchPoolProfit,
  fetchPoolProfitInUsd,
  fetchTokenBalance,
  fetchVestingBalance,
  fetchWithdrawBalance,
} from '../../state/pools';

export const usePoolDetails = (poolDetails: PoolCardItemViewModel) => {
  const { account } = useWallet();
  const dispatch = useAppDispatch();

  const isAPIfailed = useSelector(
    (state: State) => state.pools.isAPIfailed
  );

  // fetch vesting claim
  useEffect(() => {
    if (!account) return;

    const fetch = async () => {
      dispatch(fetchVestingBalance(account, poolDetails));
    };

    fetch();

    const interval = setInterval(fetch, 20000);
    return () => clearInterval(interval);
  }, [account]);

  // fetch anti-whale limit
  useEffect(() => {
    const fetch = async () => {
      dispatch(fetchAntiWhaleLimit());
    };

    fetch();

    const interval = setInterval(fetch, 60000);
    return () => clearInterval(interval);
  }, []);

  // fetch pool apy apr deposited
  useEffect(() => {
    const fetch = async () => {
      if (!poolDetails.isDisabled) {
        dispatch(fetchPoolInfoes());
      }
    };

    fetch();
  }, []);

  // fetch pool apy apr deposited when api failed
  useEffect(() => {
    if (!isAPIfailed) return;

    const fetch = async () => {
      if (!poolDetails.isDisabled) {
        dispatch(fetchPoolApy(poolDetails));
      }
    };

    fetch();
  }, [isAPIfailed]);

  // fetch pool balance in usd
  useEffect(() => {
    const fetch = async () => {
      if (!poolDetails.isDisabled) {
        dispatch(fetchPoolBalanceInUsd(account, poolDetails));
      }
    };

    fetch();

    const interval = setInterval(fetch, BLOCK_INTERVAL);
    return () => clearInterval(interval);
  }, [account]);

  // fetch pool profit in usd
  useEffect(() => {
    const fetch = async () => {
      if (!poolDetails.isDisabled) {
        dispatch(fetchPoolProfitInUsd(account, poolDetails));
      }
    };

    fetch();

    const interval = setInterval(fetch, BLOCK_INTERVAL);
    return () => clearInterval(interval);
  }, [account]);

  // fetch pool profit
  useEffect(() => {
    const fetch = async () => {
      if (!poolDetails.isDisabled) {
        dispatch(fetchPoolProfit(account, poolDetails));
      }
    };

    fetch();

    const interval = setInterval(fetch, BLOCK_INTERVAL);
    return () => clearInterval(interval);
  }, [account]);

  // fetch pool balance
  useEffect(() => {
    const fetch = async () => {
      if (!poolDetails.isDisabled) {
        dispatch(fetchPoolBalance(account, poolDetails));
      }
    };

    fetch();

    const interval = setInterval(fetch, BLOCK_INTERVAL);
    return () => clearInterval(interval);
  }, [account]);

  // fetch pool token balance
  useEffect(() => {
    const fetch = async () => {
      if (!poolDetails.isDisabled) {
        dispatch(fetchTokenBalance(account, poolDetails));
      }
    };

    fetch();

    const interval = setInterval(fetch, BLOCK_INTERVAL);
    return () => clearInterval(interval);
  }, [account]);

  // fetch pool withdraw balance
  useEffect(() => {
    const fetch = async () => {
      if (!poolDetails.isDisabled) {
        dispatch(fetchWithdrawBalance(account, poolDetails));
      }
    };

    fetch();

    const interval = setInterval(fetch, BLOCK_INTERVAL);
    return () => clearInterval(interval);
  }, [account]);

  // fetch allowance
  useEffect(() => {
    const fetch = async () => {
      if (!poolDetails.isDisabled) {
        dispatch(fetchPoolAllowance(account, poolDetails));
      }
    };

    fetch();
  }, [account]);
};
