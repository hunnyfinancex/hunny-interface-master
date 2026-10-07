import BigNumber from 'bignumber.js';

export const CACHE_KEY = {
  BNB_PRICE:
    process.env.REACT_APP_KEY_BNB_PRICE ||
    'c3653350-e3b3-4cb2-baa9-a8b0530bdfe5',
  TOTAL_MARKET_CAP:
    process.env.REACT_APP_KEY_TOTAL_MARKET_CAP ||
    '09fc129a-bf69-11eb-8529-0242ac130003',
  TOTAL_DEPOSITED:
    process.env.REACT_APP_KEY_TOTAL_DEPOSITED ||
    '98769e7c-ef29-4291-b3cd-4ae2731aea12',
  APY: process.env.REACT_APP_KEY_APY || '98769e7c-ef29-4291-b3cd-4ae27313212',
  APY_CACHED_TIME:
    process.env.REACT_APP_KEY_APY_CACHED_TIME ||
    '98769e7c-ef29-4291-b3cd-4ae2731aeasd',
};

export function saveCacheData(data: BigNumber, key: string) {
  if (data) localStorage.setItem(key, data.toString());
}

export function getCachedData(key: string): BigNumber {
  const value = localStorage.getItem(key);
  return value ? new BigNumber(localStorage.getItem(key)) : null;
}

export function saveStringData(data: string, key: string) {
  localStorage.setItem(key, data.toString());
}

export function getStringData(key: string): string {
  const value = localStorage.getItem(key);
  return value;
}

export function removeCachedData(key: string): void {
  localStorage.removeItem(key);
}
