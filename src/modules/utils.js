import axios from 'axios';
import { EXCHANGES, EXPLORERS } from '../constants/values';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { getTokenBalance, getHunnyTokenContract } from './infura';
import { TOKENS } from '../constants/tokens';
import {
  BUSD_BNB_FLIP_POOL,
  CAKE_BNB_FLIP_POOL,
  USDT_BNB_FLIP_LEGACY_POOL,
  BUSD_BNB_FLIP_LEGACY_POOL,
  CAKE_BNB_FLIP_LEGACY_POOL,
  USDT_BNB_FLIP_POOL,
  DOGE_BNB_FLIP_POOL,
  DOGE_BNB_FLIP_LEGACY_POOL,
  BANANA_BNB_POOL,
  POOL_LIST,
  BUNNY_BNB_FLIP_POOL,
  LINK_BNB_FLIP_POOL,
} from '../constants/pools';

import { LANGUAGES } from '../constants/values';

import { API_URL } from '../constants/values';
import { poolServiceMapper } from './pools/BuildPoolMapper';
import { CACHE_KEY, getCachedData, saveCacheData } from './cacheData';
import { PAIRS, ZAP_PAIRS } from '../constants/pair';

import { getPancakeRouterContract } from './zap';
import { toBaseUnitBN, toTokenUnitsBN } from './number';

export const getAddress = (addresses) => {
  if (!addresses) return;
  return String(addresses[process.env.REACT_APP_NETWORK_ID]).toLowerCase();
};

export const getPancakePid = (pids) => {
  return pids[process.env.REACT_APP_NETWORK_ID];
};

export const getExchange = () => {
  return EXCHANGES[process.env.REACT_APP_NETWORK_ID];
};

export const getExplorer = () => {
  return EXPLORERS[process.env.REACT_APP_NETWORK_ID];
};

export const getPairTokenAddresses = (pairName) => {
  for (let i = 0; i < PAIRS.length; i++) {
    if (PAIRS[i].name === pairName) {
      if (PAIRS[i].token0.name === 'WBNB') {
        return {
          token0: 'BNB',
          token1: getAddress(PAIRS[i].token1.addresses),
        };
      } else if (PAIRS[i].token1.name === 'WBNB') {
        return {
          token0: 'BNB',
          token1: getAddress(PAIRS[i].token0.addresses),
        };
      } else {
        return {
          token0: getAddress(PAIRS[i].token0.addresses),
          token1: getAddress(PAIRS[i].token1.addresses),
        };
      }
    }
  }
};

export const getPairToken = (pairName) => {
  return ZAP_PAIRS.find((item) => item.name === pairName);
};

export const loadBNBPrice = async () => {
  try {
    const value = toBaseUnitBN(1, 18);
    const contract = getPancakeRouterContract(null);

    const path = [
      getAddress(TOKENS.WBNB.addresses),
      getAddress(TOKENS.USDT.addresses),
    ];

    const amounts = await contract.methods
      .getAmountsOut(value.toString(10), path)
      .call();

    const price = toTokenUnitsBN(amounts[1], 18);

    saveCacheData(price, CACHE_KEY.BNB_PRICE);
    return toTokenUnitsBN(price, 18);
  } catch (e) {
    console.log(e);
    const cachedPrice = getCachedData(CACHE_KEY.BNB_PRICE);

    if (!cachedPrice) {
      saveCacheData(new BigNumber(0), CACHE_KEY.BNB_PRICE);
    }
    return new BigNumber(0);
  }
};

export const loadPoolInfoes = async () => {
  try {
    const { data } = await axios.get('https://api.hunny.finance/');

    return data.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const loadLotteryCounter = async () => {
  try {
    const { data } = await axios.get(`${API_URL}v1/lottery/time/get/`);
    return [data.data['open_hour'], data.data['close_hour']];
  } catch (e) {
    console.log(e);
    return [null, null];
  }
};

export const loadLotteryWinners = async (round) => {
  try {
    const { data } = await axios.post(`${API_URL}v1/lottery/round/get/`, {
      round: Number(round),
    });
    return (
      data.data['winning_stat'] && [
        data.data['winning_stat']['match_four'],
        data.data['winning_stat']['match_three'],
        data.data['winning_stat']['match_two'],
      ]
    );
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getSystemCurrentLotteryRound = async () => {
  try {
    const { data } = await axios.post(`${API_URL}v1/lottery/last/round/get/`);
    return data?.data['last_round'];
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getBNBPrice = async () => {
  return getCachedData(CACHE_KEY.BNB_PRICE);
};

export const getHUNNYPrice = async () => {
  try {
    const bnbPrice = await getBNBPrice();
    const bnbReserve = await getTokenBalance(
      TOKENS.WBNB.addresses,
      getAddress(TOKENS.HUNNY_BNB_FLIP.addresses)
    );
    const hunnyReserve = await getTokenBalance(
      TOKENS.HUNNY.addresses,
      getAddress(TOKENS.HUNNY_BNB_FLIP.addresses)
    );

    return new BigNumber(bnbReserve)
      .div(new BigNumber(hunnyReserve))
      .multipliedBy(bnbPrice);
  } catch (e) {
    console.log(e);
    return new BigNumber(0);
  }
};

export const getCAKEPrice = async () => {
  try {
    const bnbPrice = await getBNBPrice();
    const bnbReserve = await getTokenBalance(
      TOKENS.WBNB.addresses,
      getAddress(TOKENS.CAKE_BNB_FLIP.addresses)
    );
    const cakeReserve = await getTokenBalance(
      TOKENS.CAKE.addresses,
      getAddress(TOKENS.CAKE_BNB_FLIP.addresses)
    );

    return new BigNumber(bnbReserve)
      .div(new BigNumber(cakeReserve))
      .multipliedBy(bnbPrice);
  } catch (e) {
    console.log(e);
    return new BigNumber(0);
  }
};

export const getBANANAPrice = async () => {
  try {
    const bnbPrice = await getBNBPrice();
    const bnbReserve = await getTokenBalance(
      TOKENS.WBNB.addresses,
      getAddress(TOKENS.BANANA_BNB_FLIP.addresses)
    );
    const cakeReserve = await getTokenBalance(
      TOKENS.BANANA.addresses,
      getAddress(TOKENS.BANANA_BNB_FLIP.addresses)
    );

    return new BigNumber(bnbReserve)
      .div(new BigNumber(cakeReserve))
      .multipliedBy(bnbPrice);
  } catch (e) {
    console.log(e);
    return new BigNumber(0);
  }
};

export const getLOVEPrice = async () => {
  try {
    const busdReserve = await getTokenBalance(
      TOKENS.BUSD.addresses,
      getAddress(TOKENS.LOVE_BUSD_FLIP.addresses)
    );
    const loveReserve = await getTokenBalance(
      TOKENS.LOVE.addresses,
      getAddress(TOKENS.LOVE_BUSD_FLIP.addresses)
    );

    return new BigNumber(busdReserve)
      .div(new BigNumber(loveReserve)).div(1e9);
  } catch (e) {
    console.log(e);
    return new BigNumber(0);
  }
};

export const getPublicProvider = () => {
  const rpcCollection = process.env.REACT_APP_RPC_COLLECTION?.split(',') || [];
  const randomIndex = Math.floor(Math.random() * 3);
  return new Web3(
    rpcCollection[randomIndex]
      ? rpcCollection[randomIndex]
      : process.env.REACT_APP_RPC
  );
};

export const getDepositToken = (poolAddress) => {
  switch (poolAddress) {
    case getAddress(CAKE_BNB_FLIP_LEGACY_POOL.addresses): {
      return TOKENS.CAKE_BNB_FLIP.addresses;
    }
    case getAddress(USDT_BNB_FLIP_LEGACY_POOL.addresses): {
      return TOKENS.USDT_BNB_FLIP.addresses;
    }
    case getAddress(BUSD_BNB_FLIP_LEGACY_POOL.addresses): {
      return TOKENS.BUSD_BNB_FLIP.addresses;
    }
    case getAddress(DOGE_BNB_FLIP_LEGACY_POOL.addresses): {
      return TOKENS.DOGE_BNB_FLIP.addresses;
    }
    case getAddress(CAKE_BNB_FLIP_POOL.addresses): {
      return TOKENS.CAKE_BNB_FLIP.addresses;
    }
    case getAddress(USDT_BNB_FLIP_POOL.addresses): {
      return TOKENS.USDT_BNB_FLIP.addresses;
    }
    case getAddress(BUSD_BNB_FLIP_POOL.addresses): {
      return TOKENS.BUSD_BNB_FLIP.addresses;
    }
    case getAddress(DOGE_BNB_FLIP_POOL.addresses): {
      return TOKENS.DOGE_BNB_FLIP.addresses;
    }
    case getAddress(BANANA_BNB_POOL.addresses): {
      return TOKENS.BANANA_BNB_FLIP.addresses;
    }
    case getAddress(BUNNY_BNB_FLIP_POOL.addresses): {
      return TOKENS.BUNNY_BNB_FLIP.addresses;
    }
    case getAddress(LINK_BNB_FLIP_POOL.addresses): {
      return TOKENS.LINK_BNB_FLIP.addresses;
    }
  }
};

export const getTotalDepositAllPools = async () => {
  const mapper = poolServiceMapper;
  let total = new BigNumber(0);

  for (let i = 0; i < POOL_LIST.length; i++) {
    const pool = mapper.getBuildPool(getAddress(POOL_LIST[i].addresses));
    total = total.plus(await pool.tvl());
  }
  saveCacheData(total, CACHE_KEY.TOTAL_DEPOSITED);
  return total;
};

export const getTotalHunnyMarketCap = async () => {
  const bnbPrice = await getBNBPrice();
  const wbnbBalance = await getTokenBalance(
    TOKENS.WBNB.addresses,
    getAddress(TOKENS.HUNNY_BNB_FLIP.addresses)
  );

  const totalMarketCap = wbnbBalance.multipliedBy(2).multipliedBy(bnbPrice);
  saveCacheData(totalMarketCap, CACHE_KEY.TOTAL_MARKET_CAP);
  return totalMarketCap;
};

export const getMaxHunnyTransferAmount = async () => {
  const hunny = getHunnyTokenContract();
  const amount = await hunny.methods.maxTransferAmount().call();
  return new BigNumber(amount);
};

export const addTokenToMetaMask = async (token, tokenImg) => {
  const provider = window.ethereum;
  if (provider) {
    try {
      provider.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: getAddress(token.addresses),
            symbol: token.name,
            decimals: 18,
            image: tokenImg, //'https://hunny.finance/logo-hunny.png',
          },
        },
      });
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};

export const forkjoinRequest = async (promises) => {
  const result = [];

  for (let index = 0; index < promises.length; index++) {
    result.push(await promises[index]);
  }

  return result;
};

export const getPoolDetailsByCode = (code) =>
  POOL_LIST.find((item) => item.code === code);

export const getLangCodeByBCP47 = (code) => {
  const supportedLng = LANGUAGES.map((item) => item.code);
  let _lang = 'en';

  const parsedCode = code.toLowerCase();
  if (parsedCode.includes('ko')) {
    _lang = 'ko';
  }

  if (parsedCode.includes('zh')) {
    _lang = code === 'zh-cn' ? 'zh-Hans' : 'zh-Hant';
  }

  if (parsedCode.includes('vi')) {
    _lang = 'vi';
  }

  if (parsedCode.includes('ar')) {
    _lang = 'ar';
  }

  if (parsedCode.includes('pt-BR')) {
    _lang = 'pt-BR';
  }

  if (parsedCode.includes('pt-PT')) {
    _lang = 'pt-PT';
  }

  if (parsedCode.includes('fr')) {
    _lang = 'fr';
  }

  if (parsedCode.includes('pt-PT')) {
    _lang = 'pt-PT';
  }

  if (parsedCode.includes('id')) {
    _lang = 'id';
  }

  if (parsedCode.includes('es')) {
    _lang = 'es';
  }

  if (parsedCode.includes('tr')) {
    _lang = 'tr';
  }

  return supportedLng.includes(_lang) ? _lang : 'en';
};

export const getPoolByAddress = (address) => {
  for (let i = 0; i < POOL_LIST.length; i++) {
    if (getAddress(POOL_LIST[i].addresses).toLowerCase() === address.toLowerCase()) {
      return POOL_LIST[i];
    }
  }

  return null;
}

// example symbol: ETH, BTC
export const getUndefinedTokenPrice = async (symbol) => {
  const TICKERS = [
    'binance-usd',
    'tether',
    'ethereum',
    'bitcoin',
    'true-usd',
    'alpaca-finance',
    'rabbit-finance',
    'mdex',
    'pancakeswap-token',
    'polkadot',
    'chainlink',
    'venus',
    'uniswap',
    'cardano',
    'litecoin',
    'filecoin',
    'babyswap'
  ]

  let url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=binancecoin';

  TICKERS.map((item) => {
    url += `,${item}`;
  })

  const { data } = await axios.get(url);
  if (data) {
    for (let i = 0; i < data.length; i++) {
      if (symbol.toLowerCase() === data[i]['symbol']) {
        return data[i]['current_price'];
      }
    }
  }

  return 0;
}
