import { TOKENS } from './tokens';
import HUNNY from '../assets/img/hunny-logo.png';
import HUNNY_BNB from '../assets/img/token-bnb-hunny.png';
import CAKE_BNB from '../assets/img/token-cake-bnb.png';
import BUSD_BNB from '../assets/img/token-busd-bnb.png';
import USDT_BNB from '../assets/img/token-usdt-bnb.png';
import BANANA from '../assets/img/token-banana.png';
import FIL from '../assets/img/token-fil.png';
import TUSD from '../assets/img/token-tusd.png';
import ALPACA from '../assets/img/token-alpaca.png';
import BANANA_BNB from '../assets/img/token-banana-bnb.png';
import BUNNY_BNB from '../assets/img/token-bunny-bnb.png';
import LINK_BNB from '../assets/img/token-link-bnb.png';
import CAKE from '../assets/img/token-cake.svg';
import BUSD from '../assets/img/token-busd.png';
import USDT from '../assets/img/token-usdt.png';
import USDC from '../assets/img/token-usdc.svg';
import BNB from '../assets/img/token-bnb.svg';
import BTCB from '../assets/img/token-btcb.png';
import ETH from '../assets/img/token-eth.png';
import DOGE_BNB from '../assets/img/token-doge-bnb.png';
import BABY from '../assets/img/token-baby.svg';
import APE_HUNNY_IMG from '../assets/img/ape-hunny.png';
import APE_HUNNY_MOBILE_IMG from '../assets/img/ape-hunny-mobile.png';
import AUTO_HUNNY_IMG from '../assets/img/auto-hunny.png';
import AUTO_HUNNY_MOBILE_IMG from '../assets/img/auto-hunny-mobile.png';
import APE_BNB_IMG from '../assets/img/ape-bnb.png';
import CAKE_HUNNY_MOBILE_IMG from '../assets/img/cake-hunny-mobile.png';
import CAKE_HUNNY_IMG from '../assets/img/cake-hunny.png';
import APE_BNB_MOBILE_IMG from '../assets/img/ape-bnb-mobile.png';

import CAKE_BNB_IMG from '../assets/img/cake-bnb-img.png';
import CAKE_BNB_MOBILE_IMG from '../assets/img/cake-bnb-img-mobile.png';

import CAKE_LOVE_IMG from '../assets/img/cake-love.png';
import CAKE_LOVE_MOBILE_IMG from '../assets/img/cake-love-mobile.png';

import DOGE_BNB_IMG from '../assets/img/doge-bnb-img.png';
import DOGE_BNB_MOBILE_IMG from '../assets/img/doge-bnb-img-mobile.png';

import BUNNY_BNB_IMG from '../assets/img/bunny-bnb-img.png';
import BUNNY_BNB_MOBILE_IMG from '../assets/img/bunny-bnb-img-mobile.png';

import LINK_BNB_IMG from '../assets/img/link-bnb-img.png';
import LINK_BNB_MOBILE_IMG from '../assets/img/link-bnb-img-mobile.png';

import HUNNY_ACE_MOBILE_IMG from '../assets/img/hunny-ace-mobile.png';
import HUNNY_ACE_IMG from '../assets/img/hunny-ace.png';

import { PoolCompoundingEnum } from '../modules/enums/Pool.enum';
import { AssetEnum } from 'modules/enums/Asset.enum';

export const POOL_TYPES = {
  HUNNY: 0,
  HUNNY_BNB: 1,
  CAKE: 2,
  FLIP2CAKE: 3,
  VENUS: 4,
  ALPACA: 5,
  ALPACA_RABBIT: 5,
  BABY: 6,
};

export const HUNNY_POOL = {
  id: 1,
  pancakePid: 0,
  type: POOL_TYPES.HUNNY,
  depositToken: TOKENS.HUNNY,
  addresses: {
    56: '0x389D2719a9Bcc29583Db89FD9454ADe9e57CD18d',
    97: '0xAf35Cf966817FE0e454ec81A4Cb2b681e1f99463',
  },
  tag: [AssetEnum.Finished, AssetEnum.Single, AssetEnum.Hunny],
  code: 'HUNNY-HIVE-Boost',
  logo: HUNNY,
  poolName: 'HUNNY Hive',
  description: 'Redistribution of fees',
  additionalContent: 'Boost!!',
  apyDescription: `hunnyPoolApyDescription`,
  earn: [TOKENS.WBNB],
  isBoost: true,
  compounding: PoolCompoundingEnum.Manual,
  displayGuild: true,
  isDisabled: false,
  isNoWithdrawFee: true,
  isHaveApr: true,
  isPause: true,
};

export const HUNNY_BNB_POOL = {
  id: 2,
  pancakePid: 0,
  type: POOL_TYPES.HUNNY_BNB,
  depositToken: TOKENS.HUNNY_BNB_FLIP,
  addresses: {
    56: '0x434Af79fd4E96B5985719e3F5f766619DC185EAe',
    97: '0xB1C84Ac07613ED5405C6A62e918962421d01B746',
  },
  tag: [AssetEnum.Finished, AssetEnum.LP, AssetEnum.Hunny],
  code: 'HUNNY-BNB-LP',
  logo: HUNNY_BNB,
  poolName: 'HUNNY-BNB Hive ⚠️',
  description: 'Pool is no longer supported to earn HUNNY',
  additionalContent: 'Boost!!',
  apyDescription: `hunnyPoolApyDescription`,
  earn: [TOKENS.HUNNY],
  isDisabled: false,
  isOnlyClaimAndWithdraw: true,
  compounding: PoolCompoundingEnum.Manual,
  displayGuild: true,
  isBoost: true,
  isNoWithdrawFee: true,
  isHaveApr: true,
  isWarning: true,
};

export const CAKE_POOL = {
  id: 3,
  logo: CAKE,
  pancakePid: {
    56: 0,
    97: 5,
  },
  tag: [AssetEnum.Finished, AssetEnum.Single, AssetEnum.Pancake],
  type: POOL_TYPES.CAKE,
  depositToken: TOKENS.CAKE,
  code: 'CAKE',
  poolName: 'CAKE 🥞 🍯',
  description: 'Compound CAKE automatically',
  additionalContent: 'CAKE Maximizer',
  earn: [TOKENS.CAKE],
  contractAddress: '0x64af4A4312d5275e747eBc12E1Ea244f16283E2d',
  isBoost: false,
  compounding: PoolCompoundingEnum.Automatic,
  addresses: {
    56: '0xb7D43F1beD47eCba4Ad69CcD56dde4474B599965',
    97: '0xdDCB5dD86D18e8f7152133C505c5C52DA4E8ED46',
  },
  additionalImg: CAKE_HUNNY_IMG,
  additionalImgMobile: CAKE_HUNNY_MOBILE_IMG,
  isDisabled: false,
  isWarning: true,
  isOnlyClaimAndWithdraw: true,
};

export const CAKE_BNB_FLIP_POOL = {
  id: 4,
  pancakePid: {
    56: 251,
    97: 3,
  },
  type: POOL_TYPES.FLIP2CAKE,
  depositToken: TOKENS.CAKE_BNB_FLIP,
  addresses: {
    56: '0xBDb18B0C2fC2dD0DeD494F43c4101E8D23Fb596E',
    97: '0x63bf6F90c6ac040c9C4EbCd3069319b4258845DC',
  },
  tag: [AssetEnum.Finished, AssetEnum.LP, AssetEnum.Pancake],
  code: 'CAKE-BNB-LP',
  logo: CAKE_BNB,
  poolName: 'CAKE-BNB LP 🔥',
  description: 'Compound CAKE automatically',
  additionalContent: 'CAKE Maximizer',
  earn: [TOKENS.CAKE],
  isBoost: false,
  isDisabled: false,
  compounding: PoolCompoundingEnum.Automatic,
  additionalImg: CAKE_BNB_IMG,
  additionalImgMobile: CAKE_BNB_MOBILE_IMG,
  displayGuild: true,
  isWarning: true,
  isOnlyClaimAndWithdraw: true,
};

export const BANANA_POOL = {
  id: 5,
  logo: BANANA,
  depositToken: TOKENS.BANANA,
  code: 'BANANA',
  poolName: 'BANANA 🍌🍯',
  description: 'Compound BANANA automatically',
  additionalContent: 'BANANA Maximizer',
  earn: [TOKENS.BANANA],
  pancakePid: {
    56: 0,
    97: 5,
  },
  type: POOL_TYPES.CAKE,
  contractAddress: '0x64af4A4312d5275e747eBc12E1Ea244f16283E2d',
  isBoost: false,
  compounding: PoolCompoundingEnum.Automatic,
  addresses: {
    56: '0xAD4134F59C5241d0B4f6189731AA2f7b279D4104',
    97: '0xdDCB5dD86D18e8f7152133C505c5C52DA4E8ED46',
  },
  tag: [AssetEnum.Live, AssetEnum.Single, AssetEnum.Ape],
  isDisabled: false,
  additionalImg: APE_HUNNY_IMG,
  additionalImgMobile: APE_HUNNY_MOBILE_IMG,
  displayGuild: true,
};

export const BANANA_BNB_POOL = {
  id: 6,
  logo: BANANA_BNB,
  depositToken: TOKENS.BANANA_BNB_FLIP,
  code: 'BANANA-BNB-LP',
  poolName: 'BANANA-BNB LP',
  description: 'Compound BANANA automatically',
  additionalContent: 'BANANA Maximizer',
  earn: [TOKENS.BANANA],
  pancakePid: {
    56: 0,
    97: 5,
  },
  tag: [AssetEnum.Live, AssetEnum.LP, AssetEnum.Ape],
  type: POOL_TYPES.CAKE,
  contractAddress: '',
  isBoost: false,
  compounding: PoolCompoundingEnum.Automatic,
  addresses: {
    56: '0x65003459BF2506B096a9a9C8bC691e88430567D1',
    97: '0xdDCB5dD86D18e8f7152133C505c5C52DA4E8ED46',
  },
  isDisabled: false,
  additionalImg: APE_BNB_IMG,
  additionalImgMobile: APE_BNB_MOBILE_IMG,
  displayGuild: true,
};

export const BUSD_BNB_FLIP_POOL = {
  id: 7,
  pancakePid: {
    56: 252,
    97: 4,
  },
  tag: [AssetEnum.Finished, AssetEnum.LP, AssetEnum.Pancake],
  type: POOL_TYPES.FLIP2CAKE,
  depositToken: TOKENS.BUSD_BNB_FLIP,
  addresses: {
    56: '0xf36e82E42670DB17f08C9731a45689D9190fB8AC',
    97: '0x0251dd03b1f059d754319d88de0b81c3060fc68d',
  },
  code: 'BUSD-BNB-LP',
  logo: BUSD_BNB,
  poolName: 'BUSD-BNB LP 🔥',
  description: 'Compound CAKE automatically',
  additionalContent: 'CAKE Maximizer',
  earn: [TOKENS.CAKE],
  isBoost: false,
  isDisabled: false,
  compounding: PoolCompoundingEnum.Automatic,
  displayGuild: true,
};

export const USDT_BNB_FLIP_POOL = {
  id: 8,
  pancakePid: {
    56: 264,
    97: 5,
  },
  type: POOL_TYPES.FLIP2CAKE,
  depositToken: TOKENS.USDT_BNB_FLIP,
  addresses: {
    56: '0x4C8714d28Bf187E4B0aC47B880334090500dAFD4',
    97: '0xdDCB5dD86D18e8f7152133C505c5C52DA4E8ED46',
  },
  tag: [AssetEnum.Finished, AssetEnum.LP, AssetEnum.Pancake],
  code: 'USDT-BNB-LP',
  logo: USDT_BNB,
  poolName: 'USDT-BNB LP 🔥',
  description: 'Compound CAKE automatically',
  additionalContent: 'CAKE Maximizer',
  earn: [TOKENS.CAKE],
  isBoost: false,
  isDisabled: false,
  compounding: PoolCompoundingEnum.Automatic,
  displayGuild: true,
};

export const DOGE_BNB_FLIP_POOL = {
  id: 9,
  pancakePid: {
    56: 376,
    97: 5,
  },
  type: POOL_TYPES.FLIP2CAKE,
  depositToken: TOKENS.DOGE_BNB_FLIP,
  addresses: {
    56: '0xF0D4a0398D6D48B958d0777528D0eE9A24Fb8899',
    97: '0xdDCB5dD86D18e8f7152133C505c5C52DA4E8ED46',
  },
  tag: [AssetEnum.Finished, AssetEnum.LP, AssetEnum.Pancake],
  code: 'DOGE-BNB-LP',
  logo: DOGE_BNB,
  poolName: 'DOGE-BNB LP 🐶',
  description: 'Compound CAKE automatically',
  additionalContent: 'CAKE Maximizer',
  earn: [TOKENS.CAKE],
  isBoost: false,
  isDisabled: false,
  compounding: PoolCompoundingEnum.Automatic,
  displayGuild: true,
  additionalImg: DOGE_BNB_IMG,
  additionalImgMobile: DOGE_BNB_MOBILE_IMG,
};

export const LINK_BNB_FLIP_POOL = {
  id: 10,
  pancakePid: {
    56: 257,
    97: 5,
  },
  type: POOL_TYPES.FLIP2CAKE,
  depositToken: TOKENS.LINK_BNB_FLIP,
  addresses: {
    56: '0x6c7eFFa3d0694f8fc2D6aEe501ff484c1FE6fcD2',
    97: '0x6c7eFFa3d0694f8fc2D6aEe501ff484c1FE6fcD2',
  },
  tag: [AssetEnum.Finished, AssetEnum.LP, AssetEnum.Pancake],
  code: 'LINK-BNB-LP',
  logo: LINK_BNB,
  poolName: 'LINK-BNB LP',
  description: 'Compound CAKE automatically',
  additionalContent: 'CAKE Maximizer',
  earn: [TOKENS.CAKE],
  isBoost: false,
  isDisabled: false,
  compounding: PoolCompoundingEnum.Automatic,
  displayGuild: true,
  additionalImg: LINK_BNB_IMG,
  additionalImgMobile: LINK_BNB_MOBILE_IMG,
};

export const BUNNY_BNB_FLIP_POOL = {
  id: 11,
  pancakePid: {
    56: 323,
    97: 5,
  },
  type: POOL_TYPES.FLIP2CAKE,
  depositToken: TOKENS.BUNNY_BNB_FLIP,
  addresses: {
    56: '0xdFe440fBe839E9D722F3d1c28773850F99692c76',
    97: '0xdFe440fBe839E9D722F3d1c28773850F99692c76',
  },
  tag: [AssetEnum.Finished, AssetEnum.LP, AssetEnum.Pancake],
  code: 'BUNNY-BNB-LP',
  logo: BUNNY_BNB,
  poolName: 'BUNNY-BNB LP',
  description: 'Compound CAKE automatically',
  additionalContent: 'CAKE Maximizer',
  earn: [TOKENS.CAKE],
  isBoost: false,
  isDisabled: false,
  compounding: PoolCompoundingEnum.Automatic,
  displayGuild: true,
  additionalImg: BUNNY_BNB_IMG,
  additionalImgMobile: BUNNY_BNB_MOBILE_IMG,
};

export const HUNNY_ACE_POOL = {
  id: 12,
  pancakePid: 0,
  type: POOL_TYPES.HUNNY,
  depositToken: TOKENS.HUNNY,
  addresses: {
    56: '0x24320c20499535d0D7a8F6adFb08e5E3f5694417',
    97: '0xAf35Cf966817FE0e454ec81A4Cb2b681e1f99463',
  },
  tag: [AssetEnum.Live, AssetEnum.Single, AssetEnum.Hunny],
  code: 'HUNNY-Ace',
  logo: HUNNY,
  poolName: 'HUNNY Ace Hive ⚡️',
  description: 'Time to boost HUNNY',
  additionalContent: 'Boost!!',
  apyDescription: `hunnyPoolApyDescription`,
  earn: [TOKENS.HUNNY],
  isBoost: false,
  compounding: PoolCompoundingEnum.Manual,
  displayGuild: true,
  isDisabled: false,
  isNoWithdrawFee: true,
  isHaveApr: true,
  additionalImg: HUNNY_ACE_IMG,
  additionalImgMobile: HUNNY_ACE_MOBILE_IMG,
};

export const BUSD_POOL = {
  id: 13,
  pancakePid: 0,
  type: POOL_TYPES.VENUS,
  depositToken: TOKENS.BUSD,
  addresses: {
    56: '0xe763D7E9a14ADB928766C19DF4bcE580fb6393B3',
    97: '0xd60E4f2518a48f74f269698689b0C706B20E90e7',
  },
  tag: [
    AssetEnum.Live,
    AssetEnum.StableCoin,
    AssetEnum.Single,
    AssetEnum.Venus,
  ],

  code: 'BUSD-Pool',
  logo: BUSD,
  poolName: 'BUSD',
  description: 'Auto-Compounding',
  additionalContent: 'Venus Farm',
  earn: [TOKENS.BUSD],
  isBoost: false,
  compounding: PoolCompoundingEnum.Automatic,
  isDisabled: false,
  isComingSoon: false,
};

export const USDT_POOL = {
  id: 14,
  pancakePid: 0,
  type: POOL_TYPES.VENUS,
  depositToken: TOKENS.USDT,
  addresses: {
    56: '0xBcCfD3e2Af166bB28B6b4Dfd6C1BF1F3f7F47632',
    97: '',
  },
  tag: [
    AssetEnum.Live,
    AssetEnum.StableCoin,
    ,
    AssetEnum.Single,
    AssetEnum.Venus,
  ],

  code: 'USDT-Pool',
  logo: USDT,
  poolName: 'USDT',
  description: 'Auto-Compounding',
  additionalContent: 'Venus Farm',
  earn: [TOKENS.USDT],
  isBoost: false,
  compounding: PoolCompoundingEnum.Automatic,
  isDisabled: false,
  isComingSoon: false,
};

export const USDC_POOL = {
  id: 15,
  pancakePid: 0,
  type: POOL_TYPES.VENUS,
  depositToken: TOKENS.USDC,
  addresses: {
    56: '0xc212ba7Dec34308A4cb380612830263387150310',
    97: '',
  },
  tag: [
    AssetEnum.Live,
    AssetEnum.Single,
    AssetEnum.StableCoin,
    AssetEnum.Venus,
  ],

  code: 'USDC-Pool',
  logo: USDC,
  poolName: 'USDC',
  description: 'Auto-Compounding',
  additionalContent: 'Venus Farm',
  earn: [TOKENS.USDC],
  isBoost: false,
  compounding: PoolCompoundingEnum.Automatic,
  isDisabled: false,
  isComingSoon: false,
};

export const BNB_POOL = {
  id: 16,
  pancakePid: 0,
  type: POOL_TYPES.ALPACA,
  depositToken: TOKENS.BNB,
  addresses: {
    56: '0x76Bd85dA85aA07c6f8565DE0d882356083f37115',
    97: '',
  },
  tag: [AssetEnum.Live, AssetEnum.Single, AssetEnum.Alpaca, AssetEnum.New],
  code: 'BNB-Pool',
  logo: BNB,
  poolName: 'BNB',
  description: 'Auto-Compounding',
  additionalContent: 'FOR THE LOVE OF BNB',
  earn: [TOKENS.BNB],
  isBoost: false,
  compounding: PoolCompoundingEnum.Automatic,
  isDisabled: false,
  isComingSoon: false,
};

export const HUNNY_AUTO_POOL = {
  id: 17,
  pancakePid: 0,
  type: POOL_TYPES.HUNNY,
  depositToken: TOKENS.HUNNY,
  addresses: {
    56: '0x8B2cf8CF0A30082111FB50D9a8FEBfe53C155B50',
    97: '0xAf35Cf966817FE0e454ec81A4Cb2b681e1f99463',
  },

  tag: [AssetEnum.Finished, AssetEnum.Single, AssetEnum.Hunny, AssetEnum.New],
  code: 'HUNNY-Maximizer',
  logo: HUNNY,
  poolName: 'Auto HUNNY Hive 🔥',
  description: 'Pool is no longer supported to earn HUNNY',
  additionalContent: 'Boost!!',
  apyDescription: '',
  earn: [TOKENS.HUNNY],
  isBoost: false,
  compounding: PoolCompoundingEnum.Automatic,
  displayGuild: true,
  isDisabled: false,
  isNoWithdrawFee: false,
  additionalImg: AUTO_HUNNY_IMG,
  additionalImgMobile: AUTO_HUNNY_MOBILE_IMG,
};

export const BUSD_ALPACA_POOL = {
  id: 18,
  pancakePid: 0,
  type: POOL_TYPES.ALPACA_RABBIT,
  depositToken: TOKENS.BUSD,
  addresses: {
    56: '0x9e84a8f7043601a2Ca497c5cF700FF5E099B55DD',
    97: '',
  },
  tag: [
    AssetEnum.Live,
    AssetEnum.StableCoin,
    AssetEnum.Single,
    AssetEnum.Alpaca,
    AssetEnum.New,
  ],
  code: 'Vault-BUSD',
  logo: BUSD,
  poolName: 'BUSD',
  description: 'Auto-Compounding',
  additionalContent: 'Stay Able, Stay Stable',
  earn: [TOKENS.BUSD],
  isBoost: false,
  compounding: PoolCompoundingEnum.Automatic,
  isDisabled: false,
  isComingSoon: false,
};

export const USDT_ALPACA_POOL = {
  id: 19,
  pancakePid: 0,
  type: POOL_TYPES.ALPACA_RABBIT,
  depositToken: TOKENS.USDT,
  addresses: {
    56: '0xf78b82BFA4596c6862720E3e13E6eaA24B74e4f8',
    97: '',
  },
  tag: [
    AssetEnum.Live,
    AssetEnum.StableCoin,
    AssetEnum.Single,
    AssetEnum.Alpaca,
    AssetEnum.New,
  ],
  code: 'Vault-USDT',
  logo: USDT,
  poolName: 'USDT',
  description: 'Auto-Compounding',
  additionalContent: 'Flexibility Is Stability',
  earn: [TOKENS.USDT],
  isBoost: false,
  compounding: PoolCompoundingEnum.Automatic,
  isDisabled: false,
  isComingSoon: false,
};

export const BTCB_ALPACA_POOL = {
  id: 20,
  pancakePid: 0,
  type: POOL_TYPES.ALPACA_RABBIT,
  depositToken: TOKENS.BTCB,
  addresses: {
    56: '0x8d58AF27477Aa9B0F79A0F7825689Af015BaC8F2',
    97: '',
  },
  tag: [AssetEnum.Finished, AssetEnum.Single, AssetEnum.Alpaca],
  code: 'Vault-BTCB',
  logo: BTCB,
  poolName: 'BTCB',
  description: 'Auto-Compounding',
  additionalContent: 'Get Rich or Die Farming',
  earn: [TOKENS.BTCB],
  isBoost: false,
  compounding: PoolCompoundingEnum.Automatic,
  isDisabled: false,
  isComingSoon: false,
  isWarning: true,
  isOnlyClaimAndWithdraw: true,
};

export const ETH_ALPACA_POOL = {
  id: 21,
  pancakePid: 0,
  type: POOL_TYPES.ALPACA_RABBIT,
  depositToken: TOKENS.ETH,
  addresses: {
    56: '0xeAC4584f446eb608CCd9C173B84a1E277db62C9B',
    97: '',
  },
  tag: [AssetEnum.Finished, AssetEnum.Single, AssetEnum.Alpaca],
  code: 'Vault-ETH',
  logo: ETH,
  poolName: 'ETH',
  description: 'Auto-Compounding',
  additionalContent: 'Eat. Sleep. Farm. Repeat',
  earn: [TOKENS.ETH],
  isBoost: false,
  compounding: PoolCompoundingEnum.Automatic,
  isDisabled: false,
  isComingSoon: false,
  isWarning: true,
  isOnlyClaimAndWithdraw: true,
};

export const BABY_POOL = {
  id: 22,
  pancakePid: 0,
  type: POOL_TYPES.BABY,
  depositToken: TOKENS.BABY,
  addresses: {
    56: '0x7969EF7B7D6f79a798e85367C5824B835C2D644F',
    97: '',
  },
  tag: [AssetEnum.Live, AssetEnum.Single, AssetEnum.Baby, AssetEnum.New],
  code: 'Vault-BABY',
  logo: BABY,
  poolName: 'BABY',
  description: 'Auto-Compounding',
  additionalContent: 'Hunting Profit',
  earn: [TOKENS.BABY],
  isBoost: false,
  compounding: PoolCompoundingEnum.Automatic,
  isDisabled: false,
  isComingSoon: false,
};

export const ALPACA_POOL = {
  id: 23,
  pancakePid: 0,
  type: POOL_TYPES.ALPACA_RABBIT,
  depositToken: TOKENS.ALPACA,
  addresses: {
    56: '0xc77D795856A78148Fa5C07A9Ba63d053a19d9D32',
    97: '',
  },
  tag: [AssetEnum.Live, AssetEnum.Single, AssetEnum.Alpaca, AssetEnum.New],
  code: 'Vault-ALPACA',
  logo: ALPACA,
  poolName: 'ALPACA',
  description: 'Auto-Compounding',
  additionalContent: 'Hunting profit',
  earn: [TOKENS.ALPACA],
  isBoost: false,
  compounding: PoolCompoundingEnum.Automatic,
  isDisabled: false,
  isComingSoon: false,
};

export const CAKE_LOVE_POOL = {
  id: 24,
  logo: CAKE,
  pancakePid: {
    56: 0,
    97: 5,
  },
  tag: [AssetEnum.Finished, AssetEnum.Single, AssetEnum.HunnyDao],
  type: POOL_TYPES.CAKE,
  depositToken: TOKENS.CAKE,
  code: 'CAKE-LOVE-Vault',
  poolName: 'CAKE',
  description: 'Pool is no longer supported to earn LOVE',
  additionalContent: 'LOVE Maximizer',
  earn: [TOKENS.LOVE],
  contractAddress: '0x64af4A4312d5275e747eBc12E1Ea244f16283E2d', // clone cake pool unknown
  isBoost: false,
  compounding: PoolCompoundingEnum.Automatic,
  addresses: {
    56: '0x848391a2509646cD380fca7f9c740E6F3B6e516F',
    97: '',
  },
  isVesting: true,
  vestingAddresses: {
    56: '0x5167d2bC27eC982e06658aFC09AdD41511AF97b3',
    97: '',
  },
  additionalImg: CAKE_LOVE_IMG,
  additionalImgMobile: CAKE_LOVE_MOBILE_IMG,
  isDisabled: false,
  isOnlyClaimAndWithdraw: true,
  isWarning: true,
};

export const FIL_ALPACA_POOL = {
  id: 124,
  pancakePid: 0,
  type: POOL_TYPES.ALPACA_RABBIT,
  depositToken: TOKENS.FIL,
  addresses: {
    56: '0x2ea6676c106e200Eef203331d794c7B4A01CaAB5',
    97: '',
  },
  tag: [AssetEnum.Finished, AssetEnum.Single, AssetEnum.Alpaca],
  code: 'Vault-FIL',
  logo: FIL,
  poolName: 'FIL ⚠️',
  description: 'Pool is no longer supported to earn HUNNY',
  additionalContent: '',
  earn: [TOKENS.FIL],
  isBoost: false,
  compounding: PoolCompoundingEnum.Automatic,
  isDisabled: false,
  isComingSoon: false,
  isWarning: true,
  isOnlyClaimAndWithdraw: true,
};

export const TUSD_ALPACA_POOL = {
  id: 125,
  pancakePid: 0,
  type: POOL_TYPES.ALPACA_RABBIT,
  depositToken: TOKENS.TUSD,
  addresses: {
    56: '0xef43313e8218f25Fe63D5ae76D98182D7A4797CC',
    97: '',
  },
  tag: [
    AssetEnum.Finished,
    AssetEnum.StableCoin,
    AssetEnum.Single,
    AssetEnum.Alpaca,
  ],
  code: 'Vault-TUSD',
  logo: TUSD,
  poolName: 'TUSD ⚠️',
  description: 'Pool is no longer supported to earn HUNNY',
  additionalContent: '',
  earn: [TOKENS.TUSD],
  isBoost: false,
  compounding: PoolCompoundingEnum.Automatic,
  isDisabled: false,
  isComingSoon: false,
  isWarning: true,
  isOnlyClaimAndWithdraw: true,
};

export const CAKE_BNB_FLIP_LEGACY_POOL = {
  id: 104,
  pancakePid: {
    56: 251,
    97: 3,
  },
  type: POOL_TYPES.FLIP2CAKE,
  depositToken: TOKENS.CAKE_BNB_FLIP,
  addresses: {
    56: '0x12180BB36DdBce325b3be0c087d61Fce39b8f5A4',
    97: '0x63bf6F90c6ac040c9C4EbCd3069319b4258845DC',
  },
  tag: [AssetEnum.Finished, AssetEnum.LP, AssetEnum.Pancake],
  code: 'CAKE-BNB-LP-legacy',
  logo: CAKE_BNB,
  poolName: 'CAKE-BNB LP ⚠️',
  description: 'Pool is no longer supported to earn HUNNY',
  additionalContent: '',
  earn: [TOKENS.CAKE],
  isBoost: false,
  isDisabled: false,
  compounding: PoolCompoundingEnum.Automatic,
  displayGuild: false,
  isWarning: true,
  isOnlyClaimAndWithdraw: true,
};

export const BUSD_BNB_FLIP_LEGACY_POOL = {
  id: 107,
  pancakePid: {
    56: 252,
    97: 4,
  },
  type: POOL_TYPES.FLIP2CAKE,
  depositToken: TOKENS.BUSD_BNB_FLIP,
  addresses: {
    56: '0xD87F461a52E2eB9E57463B9A4E0e97c7026A5DCB',
    97: '0x0251dd03b1f059d754319d88de0b81c3060fc68d',
  },
  tag: [AssetEnum.Finished, AssetEnum.LP, AssetEnum.Pancake],
  code: 'BUSD-BNB-LP-legacy',
  logo: BUSD_BNB,
  poolName: 'BUSD-BNB LP ⚠️',
  description: 'Pool is no longer supported to earn HUNNY',
  additionalContent: '',
  earn: [TOKENS.CAKE],
  isBoost: false,
  isDisabled: false,
  compounding: PoolCompoundingEnum.Automatic,
  displayGuild: false,
  isWarning: true,
  isOnlyClaimAndWithdraw: true,
};

export const USDT_BNB_FLIP_LEGACY_POOL = {
  id: 108,
  pancakePid: {
    56: 264,
    97: 5,
  },
  type: POOL_TYPES.FLIP2CAKE,
  depositToken: TOKENS.USDT_BNB_FLIP,
  addresses: {
    56: '0x31972e7bfaaee72f2eb3a7f68ff71d0c61162e81',
    97: '0xdDCB5dD86D18e8f7152133C505c5C52DA4E8ED46',
  },
  tag: [AssetEnum.Finished, AssetEnum.LP, AssetEnum.Pancake],
  code: 'USDT-BNB-LP-legacy',
  logo: USDT_BNB,
  poolName: 'USDT-BNB LP ⚠️',
  description: 'Pool is no longer supported to earn HUNNY',
  additionalContent: '',
  earn: [TOKENS.CAKE],
  isBoost: false,
  isDisabled: false,
  compounding: PoolCompoundingEnum.Automatic,
  displayGuild: false,
  isWarning: true,
  isOnlyClaimAndWithdraw: true,
};

export const DOGE_BNB_FLIP_LEGACY_POOL = {
  id: 109,
  pancakePid: {
    56: 376,
    97: 5,
  },
  type: POOL_TYPES.FLIP2CAKE,
  depositToken: TOKENS.DOGE_BNB_FLIP,
  addresses: {
    56: '0x3B34AA6825fA731c69C63d4925d7a2E3F6c7f13C',
    97: '0xdDCB5dD86D18e8f7152133C505c5C52DA4E8ED46',
  },
  tag: [AssetEnum.Finished, AssetEnum.LP, AssetEnum.Pancake],
  code: 'DOGE-BNB-LP-legacy',
  logo: DOGE_BNB,
  poolName: 'DOGE-BNB LP ⚠️',
  description: 'Pool is no longer supported to earn HUNNY',
  additionalContent: '',
  earn: [TOKENS.CAKE],
  isBoost: false,
  isDisabled: false,
  compounding: PoolCompoundingEnum.Automatic,
  displayGuild: false,
  isWarning: true,
  isOnlyClaimAndWithdraw: true,
};

// Reopen when user want to withdraw $3
// export const USDT_BNB_FLIP_POOL = {
//   id: 102,
//   pid: 8,
//   pancakePid: {
//     56: 264,
//     97: 5,
//   },
//   type: POOL_TYPES.FLIP2CAKE,
//   depositToken: TOKENS.USDT_BNB_FLIP,
//   addresses: {
//     56: '0x79c9DAB3603d61E6410E8b547BC5FdCac943D612',
//     97: '0xdDCB5dD86D18e8f7152133C505c5C52DA4E8ED46',
//   },
//   code: 'USDT-BNB-LP',
//   logo: USDT_BNB,
//   poolName: 'USDT-BNB v1 ⚠️',
//   description: '',
//   additionalContent: 'Pool is no longer supported.',
//   earn: [TOKENS.CAKE, TOKENS.HUNNY],
//   isBoost: false,
//   isDisabled: false,
//   compounding: PoolCompoundingEnum.Automatic,
//   displayGuild: true,
//   isWarning: true,
//   isOnlyClaimAndWithdraw: true,
// };

export const POOL_LIST = [
  // HUNNY_POOL,
  // HUNNY_BNB_POOL,
  // BANANA_POOL,
  // CAKE_POOL,
  // CAKE_BNB_FLIP_POOL,
  // BUSD_BNB_FLIP_POOL,
  // USDT_BNB_FLIP_POOL,
  // DOGE_BNB_FLIP_POOL,
  // BANANA_BNB_POOL,
  // BUNNY_BNB_FLIP_POOL,
  // LINK_BNB_FLIP_POOL,
  // HUNNY_ACE_POOL,
  BUSD_POOL,
  USDT_POOL,
  USDC_POOL,
  BABY_POOL,
  ALPACA_POOL,
  TUSD_ALPACA_POOL,
  FIL_ALPACA_POOL,

  BUSD_ALPACA_POOL,
  USDT_ALPACA_POOL,
  ETH_ALPACA_POOL,
  // BTCB_ALPACA_POOL,

  CAKE_LOVE_POOL,
];
