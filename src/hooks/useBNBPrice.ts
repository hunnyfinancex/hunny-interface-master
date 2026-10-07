import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { CACHE_KEY, removeCachedData } from '../modules/cacheData';
import { loadBNBPrice } from '../modules/utils';

export const useBNBPrice = () => {
  const [price, setPrice] = useState(new BigNumber(0));
  const [isFirstLoadingBNBPrice, setIsFirstLoadingBNBPrice] = useState(true);

  useEffect(() => {
    removeCachedData(CACHE_KEY.BNB_PRICE);

    const fetch = async () => {
      const price = await loadBNBPrice();
      setPrice(price);
      setIsFirstLoadingBNBPrice(false);
    };

    fetch();

    const interval = setInterval(fetch, 15000);
    return () => clearInterval(interval);
  }, [setPrice]);

  return { price, setPrice, isFirstLoadingBNBPrice };
};