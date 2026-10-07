import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useWallet } from 'use-wallet';
import { State } from '../../modules/models/state.model';
import { useAppDispatch } from '../../state';
import {
  fetchPoolInfoes,
  fetchPoolBalanceInUsd,
  fetchTotalMarketCap,
  fetchTotalDeposited,
  fetchPoolApy,
  fetchTotalDepositedValue,
  fetchAntiWhaleLimit,
} from '../../state/pools';

export const usePoolList = () => {
  const { account } = useWallet();

  const dispatch = useAppDispatch();

  const isAPIfailed = useSelector(
    (state: State) => state.pools.isAPIfailed
  );

  const poolList = useSelector(
    (state: State) => state.pools.pools[state.pools.selectedPoolType]
  );

  const selectedPoolType = useSelector(
    (state: State) => state.pools.selectedPoolType
  );

  // fetch anti-whale limit
  useEffect(() => {
    const fetch = async () => {
      dispatch(fetchAntiWhaleLimit());
    };

    fetch();

    const interval = setInterval(fetch, 60000);
    return () => clearInterval(interval);
  }, []);

  // fetch pool infoes
  useEffect(() => {
    const fetch = async () => {
      dispatch(fetchPoolInfoes());
    };

    fetch();

    const interval = setInterval(fetch, 20000);
    return () => clearInterval(interval);
  }, []);


  // fetch pool total deposited when api failed
  useEffect(() => {
    const fetch = async () => {
      if (!isAPIfailed) return;
      poolList.forEach((item) => {
        if (!item.isDisabled) {
          dispatch(fetchTotalDeposited(item));
        }
      });
    };

    fetch();

    const interval = setInterval(fetch, 29000);
    return () => clearInterval(interval);
  }, [selectedPoolType, isAPIfailed]);

  // fetch pool apy apr deposited when api failed
  useEffect(() => {
    if (!isAPIfailed) return;

    const fetch = async () => {
      poolList.forEach((item) => {
        if (!item.isDisabled) {
          dispatch(fetchPoolApy(item));
        }
      });
    };

    fetch();
  }, [selectedPoolType, isAPIfailed]);

  // fetch pool balance
  useEffect(() => {
    const fetch = async () => {
      poolList.forEach((item) => {
        if (!item.isDisabled) {
          dispatch(fetchPoolBalanceInUsd(account, item));
        }
      });
    };

    fetch();
  }, [account, selectedPoolType]);

  //fetch total deposited total market cap
  useEffect(() => {
    const fetch = async () => {
      if (isAPIfailed) {
        dispatch(fetchTotalDepositedValue());
      }
      dispatch(fetchTotalMarketCap());
    };

    fetch();

    const interval = setInterval(fetch, 31000);
    return () => clearInterval(interval);
  }, [isAPIfailed]);

  return;
};
