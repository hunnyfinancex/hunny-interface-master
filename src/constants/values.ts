import BigNumber from 'bignumber.js';
import koreaFlag from './../assets/img/flag/korea.svg'
import chinaFlag from './../assets/img/flag/china.svg'
import hongkongFlag from './../assets/img/flag/hongkong.svg'
import englishFlag from './../assets/img/flag/english.svg'
import vietnameseFlag from './../assets/img/flag/vietnamese.svg'
import arabFlag from './../assets/img/flag/arab.svg'
import brazilFlag from './../assets/img/flag/brazil.svg'
import indoFlag from './../assets/img/flag/indo.svg'
import portugalFlag from './../assets/img/flag/portugal.svg'
import spainFlag from './../assets/img/flag/spain.svg'
import thailandFlag from './../assets/img/flag/thailand.svg'
import turkeyFlag from './../assets/img/flag/turkey.svg'
import franceFlag from './../assets/img/flag/france.svg'

export const PRESALE_EXCHANGE_RATE = new BigNumber(4000); // 1 BNB ~ 4000 HUNNY
export const PRESALE_MINIMUM_AMOUNT = new BigNumber('0.2'); // min 0.2 BNB per tx
export const PRESALE_START_DATE = new Date(`05/21/2021 10:00:00`);
export const PRESALE_END_DATE = new Date(`06/01/2021 16:00:00`);
export const WITHDRAWABLE_DATE = new Date(`06/01/2021 18:00:00`);

export const TIME_ZONE = 8; // singapore timezone

export const BSC_CHAINID = parseInt(process.env.REACT_APP_NETWORK_ID);
export const BSC_CHAINID_HEX = process.env.REACT_APP_NETWORK_ID_HEX;
export const BLOCK_INTERVAL = 10000;
export const BLOCK_PER_YEAR = 10512000; // 86400 / 3 * 365

export const HUNNY_PER_HUNNY_BNB_FLIP = new BigNumber(145e18);
export const HUNNY_PER_BNB_EARN = new BigNumber(3200e18);

export const UINT256_MAX =
  '115792089237316195423570985008687907853269984665640564039457584007913129639935';

export const EXPLORERS = {
  56: 'https://bscscan.com',
  97: 'https://testnet.bscscan.com',
};

export const EXCHANGES = {
  56: 'https://exchange.pancakeswap.finance',
  97: 'https://cake-exchange-testnet.herokuapp.com/',
};

/* LOTTERY VALUES */
export const LOTTERY_TICKET_MIN_PRICE = new BigNumber(100e18);

export const LOTTERY_MATCH_4_RATIO = 50; // 50%
export const LOTTERY_MATCH_3_RATIO = 30; // 30%
export const LOTTERY_MATCH_2_RATIO = 10; // 10%
export const LOTTERY_MATCH_BURN_RATIO = 10; // 10%
export const API_URL = process.env.REACT_APP_API_URL || 'https://gateway.hunny.finance/';

export const LOTTERY_FETCH_NUMBER_ROUND = 5;

export const LANGUAGES = [
  {
    logo: englishFlag,
    code: 'en',
    name: 'English'
  },
  {
    logo: arabFlag,
    code: 'ar',
    name: 'Arabic'
  },
  {
    logo: brazilFlag,
    code: 'pt-BR',
    name: 'Portugese'
  },
  {
    logo: chinaFlag,
    code: 'zh-Hans',
    name: '简体中文'
  },
  {
    logo: hongkongFlag,
    code: 'zh-Hant',
    name: '繁體中文'
  },
  {
    logo: franceFlag,
    code: 'fr',
    name: 'Français'
  },
  {
    logo: koreaFlag,
    code: 'ko',
    name: '한국어'
  },

  {
    logo: indoFlag,
    code: 'id',
    name: 'Bahasa'
  },
  {
    logo: portugalFlag,
    code: 'pt-PT',
    name: 'Portugese'
  },
  {
    logo: spainFlag,
    code: 'es',
    name: 'Español'
  },
  {
    logo: vietnameseFlag,
    code: 'vi',
    name: 'Tiếng Việt'
  },
  {
    logo: thailandFlag,
    code: 'th',
    name: 'Thai'
  },
  {
    logo: turkeyFlag,
    code: 'tr',
    name: 'Türk'
  }
]

export const HUNNY_PLAY_RELEASE = new Date(`07/23/2021 17:00:00`);
