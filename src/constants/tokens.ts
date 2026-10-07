import BNB_LOGO from '../assets/img/token-bnb.png';
import HUNNY_LOGO from '../assets/img/hunny-logo.png';
import HUNNY_BNB_LOGO from '../assets/img/token-bnb-hunny.png';
import LINK_BNB_LOGO from '../assets/img/token-link-bnb.png';
import BUNNY_BNB_LOGO from '../assets/img/token-bunny-bnb.png';
import CAKE_BNB_LOGO from '../assets/img/token-cake-bnb.png';
import BUSD_BNB_LOGO from '../assets/img/token-busd-bnb.png';
import USDT_BNB_LOGO from '../assets/img/token-usdt-bnb.png';
import DOGE_BNB_LOGO from '../assets/img/token-doge-bnb.png';
import WBNB_LOGO from '../assets/img/token-wbnb.svg';
import CAKE_LOGO from '../assets/img/token-cake.svg';
import BUNNY_LOGO from '../assets/img/token-bunny.svg';
import LINK_LOGO from '../assets/img/token-link.png';
import BUSD_LOGO from '../assets/img/token-busd.png';
import USDT_LOGO from '../assets/img/token-usdt.png';
import USDC_LOGO from '../assets/img/token-usdc.png';
import DOGE_LOGO from '../assets/img/token-doge.svg';
import BABY_LOGO from '../assets/img/token-baby.svg';
import FIL_LOGO from '../assets/img/token-fil.png';
import ALPACA_LOGO from '../assets/img/token-alpaca.png';
import TUSD_LOGO from '../assets/img/token-tusd.png';
import BANANA from '../assets/img/token-banana.png';
import BANANA_BNB from '../assets/img/token-banana-bnb.png';

export const TOKENS = {
  WBNB: {
    logo: WBNB_LOGO,
    description: 'Wrap Binance Token',
    name: 'WBNB',
    shortName: 'WBNB',
    decimals: 18,
    addresses: {
      56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      97: '0x56b6a8b995d98f017bb16dd8afb7f532c2a2b4cc',
    },
  },
  HUNNY: {
    logo: HUNNY_LOGO,
    name: 'HUNNY',
    shortName: 'HUNNY',
    description: 'HUNNY Token',
    decimals: 18,
    addresses: {
      56: '0x565b72163f17849832A692A3c5928cc502f46D69',
      97: '0xFa454473F6B01DCa65F6beC24181316f605764b8',
    },
  },
  LOVE: {
    logo: HUNNY_LOGO,
    name: 'LOVE',
    shortName: 'LOVE',
    description: 'LOVE Token',
    decimals: 9,
    addresses: {
      56: '0x9505dbD77DaCD1F6C89F101b98522D4b871d88C5',
      97: '0xFa454473F6B01DCa65F6beC24181316f605764b8',
    },
  },
  HUNNY_BNB_FLIP: {
    name: 'HUNNY-BNB LP',
    shortName: 'LP',
    logo: HUNNY_BNB_LOGO,
    description: 'HUNNY-BNB LP',
    decimals: 18,
    addresses: {
      56: '0x36118142F8C21a1F3fd806D4A34F56f51F33504F',
      97: '0x4a63a1895e6319f06c70e8d652aecf70d24a289e',
    },
  },
  LOVE_BUSD_FLIP: {
    name: 'LOVE-BUSD LP',
    shortName: 'LP',
    logo: HUNNY_LOGO,
    description: 'LOVE-BUSD LP',
    decimals: 18,
    addresses: {
      56: '0x9e8Ae3a26536582823Ef82c155B69637a4A753F8',
      97: '',
    },
  },
  CAKE_BNB_FLIP: {
    name: 'CAKE-BNB LP',
    shortName: 'LP',
    logo: CAKE_BNB_LOGO,
    description: 'CAKE-BNB LP',
    decimals: 18,
    addresses: {
      56: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
      97: '0x9cFF88173B28bb68e16c166Da3459610b098cf9c',
    },
  },
  BANANA_BNB_FLIP: {
    name: 'BANANA-BNB LP',
    shortName: 'LP',
    logo: BANANA_BNB,
    description: 'BANANA-BNB LP',
    decimals: 18,
    addresses: {
      56: '0xf65c1c0478efde3c19b49ecbe7acc57bb6b1d713',
      97: '0x9cFF88173B28bb68e16c166Da3459610b098cf9c',
    },
    isApeSwap: true,
  },
  BUSD_BNB_FLIP: {
    name: 'BUSD-BNB LP',
    shortName: 'LP',
    logo: BUSD_BNB_LOGO,
    description: 'BUSD-BNB LP',
    decimals: 18,
    addresses: {
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
      97: '0x42a93eD4AcE1BF2AA7979cFC975D85568A51Cf3f',
    },
  },
  USDT_BNB_FLIP: {
    name: 'USDT-BNB LP',
    shortName: 'LP',
    logo: USDT_BNB_LOGO,
    description: 'USDT-BNB LP',
    decimals: 18,
    addresses: {
      56: '0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE',
      97: '0xdb1ed1beebca10896cc989162bf00a54944c91cb',
    },
  },
  DOGE_BNB_FLIP: {
    name: 'DOGE-BNB LP',
    shortName: 'LP',
    logo: DOGE_BNB_LOGO,
    description: 'DOGE-BNB LP',
    decimals: 18,
    addresses: {
      56: '0xac109C8025F272414fd9e2faA805a583708A017f',
      97: '0xdb1ed1beebca10896cc989162bf00a54944c91cb',
    },
  },
  BUNNY_BNB_FLIP: {
    name: 'BUNNY-BNB LP',
    shortName: 'LP',
    logo: BUNNY_BNB_LOGO,
    description: 'BUNNY-BNB LP',
    decimals: 18,
    addresses: {
      56: '0x5aFEf8567414F29f0f927A0F2787b188624c10E2',
      97: '0xdb1ed1beebca10896cc989162bf00a54944c91cb',
    },
  },
  LINK_BNB_FLIP: {
    name: 'LINK-BNB LP',
    shortName: 'LP',
    logo: LINK_BNB_LOGO,
    description: 'LINK-BNB LP',
    decimals: 18,
    addresses: {
      56: '0x824eb9faDFb377394430d2744fa7C42916DE3eCe',
      97: '0xdb1ed1beebca10896cc989162bf00a54944c91cb',
    },
  },
  BNB: {
    logo: BNB_LOGO,
    name: 'BNB',
    shortName: 'BNB',
    description: 'Binance Token',
    decimals: 18,
    addresses: {
      56: '',
      97: '',
    },
  },
  CAKE: {
    logo: CAKE_LOGO,
    name: 'CAKE',
    shortName: 'CAKE',
    description: 'Pancake Swap Token',
    decimals: 18,
    addresses: {
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
      97: '0xe5d917e53ddc8cde9281c14ec83c550f894d2626',
    },
  },
  BUSD: {
    logo: BUSD_LOGO,
    name: 'BUSD',
    shortName: 'BUSD',
    description: 'Binance-Peg BUSD Token',
    decimals: 18,
    addresses: {
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      97: '0x8301F2213c0eeD49a7E28Ae4c3e91722919B8B47',
    },
  },
  USDT: {
    logo: USDT_LOGO,
    name: 'USDT',
    shortName: 'USDT',
    description: 'Binance-Peg BUSD-T',
    decimals: 18,
    addresses: {
      56: '0x55d398326f99059ff775485246999027b3197955',
      97: '0x7f362a5de42b7b60185da7de831b06c35f626469',
    },
  },
  BUNNY: {
    logo: BUNNY_LOGO,
    name: 'BUNNY',
    shortName: 'BUNNY',
    description: 'Pancake BUNNY Token',
    decimals: 18,
    addresses: {
      56: '0xC9849E6fdB743d08fAeE3E34dd2D1bc69EA11a51',
      97: '0x2b8ff854c5e16cf35b9a792390cc3a2a60ec9ba2',
    },
  },
  LINK: {
    logo: LINK_LOGO,
    name: 'LINK',
    shortName: 'LINK',
    description: 'CHAINLINK Token',
    decimals: 18,
    addresses: {
      56: '0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD',
      97: '0x2b8ff854c5e16cf35b9a792390cc3a2a60ec9ba2',
    },
  },
  DOGE: {
    logo: DOGE_LOGO,
    name: 'DOGE',
    shortName: 'DOGE',
    description: 'DOGE token',
    decimals: 8,
    addresses: {
      56: '0xba2ae424d960c26247dd6c32edc70b295c744c43',
      97: '0x2b8ff854c5e16cf35b9a792390cc3a2a60ec9ba2',
    },
  },
  BANANA: {
    logo: BANANA,
    name: 'BANANA',
    shortName: 'BANANA',
    description: 'BANANA token',
    decimals: 18,
    addresses: {
      56: '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95',
      97: '0x2b8ff854c5e16cf35b9a792390cc3a2a60ec9ba2',
    },
  },
  USDC: {
    logo: BANANA,
    name: 'USDC',
    shortName: 'USDC',
    description: 'USDC token',
    decimals: 18,
    addresses: {
      56: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
      97: '0x2b8ff854c5e16cf35b9a792390cc3a2a60ec9ba2',
    },
  },
  BTCB: {
    logo: BANANA,
    name: 'BTCB',
    shortName: 'BTCB',
    description: 'BTCB token',
    decimals: 18,
    addresses: {
      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
      97: '0x2b8ff854c5e16cf35b9a792390cc3a2a60ec9ba2',
    },
  },
  ETH: {
    logo: BANANA,
    name: 'ETH',
    shortName: 'ETH',
    description: 'ETH token',
    decimals: 18,
    addresses: {
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
      97: '0x2b8ff854c5e16cf35b9a792390cc3a2a60ec9ba2',
    },
  },

  BABY: {
    logo: BABY_LOGO,
    name: 'BABY',
    shortName: 'BABY',
    description: 'BABY token',
    decimals: 18,
    addresses: {
      56: '0x53e562b9b7e5e94b81f10e96ee70ad06df3d2657',
      97: '0xd9f171df7329845e58a2267ec43402a27c9567a9',
    },
  },
  ALPACA: {
    logo: ALPACA_LOGO,
    name: 'ALPACA',
    shortName: 'ALPACA',
    description: 'ALPACA token',
    decimals: 18,
    addresses: {
      56: '0x8f0528ce5ef7b51152a59745befdd91d97091d2f',
      97: '',
    },
  },
  FIL: {
    logo: FIL_LOGO,
    name: 'FIL',
    shortName: 'FIL',
    description: 'FIL token',
    decimals: 18,
    addresses: {
      56: '0x0d8ce2a99bb6e3b7db580ed848240e4a0f9ae153',
      97: '',
    },
  },
  TUSD: {
    logo: TUSD_LOGO,
    name: 'TUSD',
    shortName: 'TUSD',
    description: 'TUSD token',
    decimals: 18,
    addresses: {
      56: '0x14016e85a25aeb13065688cafb43044c2ef86784',
      97: '',
    },
  },
};

export const TOKENS_ZAP = {
  WBNB: {
    logo: WBNB_LOGO,
    description: 'Wrap Binance Token',
    name: 'WBNB',
    shortName: 'WBNB',
    decimals: 18,
    addresses: {
      56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      97: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    },
  },
  USDC: {
    logo: USDC_LOGO,
    name: 'USDC',
    shortName: 'USDC',
    description: 'Binance-Peg USDC Token',
    decimals: 18,
    addresses: {
      56: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
      97: '0xba4f469a34cefb8520127175a49597ed5539c25e',
    },
  },
  BUSD: {
    logo: BUSD_LOGO,
    name: 'BUSD',
    shortName: 'BUSD',
    description: 'Binance-Peg BUSD Token',
    decimals: 18,
    addresses: {
      56: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
      97: '0xDEF11FBBA1e82249B8a511ae839c9884f9Be5c0E',
    },
  },
  USDT: {
    logo: USDT_LOGO,
    name: 'USDT',
    shortName: 'USDT',
    description: 'Binance-Peg BUSD-T',
    decimals: 18,
    addresses: {
      56: '0x55d398326f99059fF775485246999027B3197955',
      97: '0xd5d237072FF096210A4F10B11A848A8AC9eB756E',
    },
  },
  HUNNY: {
    logo: HUNNY_LOGO,
    name: 'HUNNY',
    shortName: 'HUNNY',
    description: 'HUNNY Token',
    decimals: 18,
    addresses: {
      56: '0x565b72163f17849832A692A3c5928cc502f46D69',
      97: '0xCAE4DE984C5D8eed13f183b08c9FcE3af728c565',
    },
  },
  BNB: {
    logo: BNB_LOGO,
    name: 'BNB',
    shortName: 'BNB',
    description: 'Binance Token',
    decimals: 18,
    addresses: {
      56: '',
      97: '',
    },
  },
  CAKE: {
    logo: CAKE_LOGO,
    name: 'CAKE',
    shortName: 'CAKE',
    description: 'Pancake Swap Token',
    decimals: 18,
    addresses: {
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
      97: '0x4a692f48F2069d50d4E9C341F8cB1B714D8AA0f9',
    },
  },
  BANANA: {
    logo: BANANA,
    name: 'BANANA',
    shortName: 'BANANA',
    description: 'BANANA token',
    decimals: 18,
    addresses: {
      56: '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95',
      97: '0xC22c6539CD3ecD25d645EA0760591D922666EE8D',
    },
  },
  BUNNY: {
    logo: BUNNY_LOGO,
    name: 'BUNNY',
    shortName: 'BUNNY',
    description: 'Pancake BUNNY Token',
    decimals: 18,
    addresses: {
      56: '0xC9849E6fdB743d08fAeE3E34dd2D1bc69EA11a51',
      97: '0x3BcA6f57eD93FF93c9Cff440095E5Ec92e240Cc2',
    },
  },
  LINK: {
    logo: LINK_LOGO,
    name: 'LINK',
    shortName: 'LINK',
    description: 'CHAINLINK Token',
    decimals: 18,
    addresses: {
      56: '0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD',
      97: '0x58875378cB820B0e7AEd56F62bCfD41e8879C104',
    },
  },
  DOGE: {
    logo: DOGE_LOGO,
    name: 'DOGE',
    shortName: 'DOGE',
    description: 'DOGE token',
    decimals: 8,
    addresses: {
      56: '0xba2ae424d960c26247dd6c32edc70b295c744c43',
      97: '0x7af5998B3214DCAa0Ca8cfC3CE44Fe148f40C744',
    },
  },
  HUNNY_BNB_FLIP: {
    name: 'HUNNY-BNB LP',
    shortName: 'LP',
    logo: HUNNY_BNB_LOGO,
    description: 'HUNNY-BNB LP',
    decimals: 18,
    addresses: {
      56: '0x36118142F8C21a1F3fd806D4A34F56f51F33504F',
      97: '0x570f41c8A46D8Ae880bDb39615378bFCdc96F38c',
    },
  },
  CAKE_BNB_FLIP: {
    name: 'CAKE-BNB LP',
    shortName: 'LP',
    logo: CAKE_BNB_LOGO,
    description: 'CAKE-BNB LP',
    decimals: 18,
    addresses: {
      56: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
      97: '0xC8303358747BC9Eb52f88a29a27f3601A03D9744',
    },
  },
  BUNNY_BNB_FLIP: {
    name: 'BUNNY-BNB LP',
    shortName: 'LP',
    logo: BUNNY_BNB_LOGO,
    description: 'BUNNY-BNB LP',
    decimals: 18,
    addresses: {
      56: '0x5aFEf8567414F29f0f927A0F2787b188624c10E2',
      97: '0x369168b001122E9304535dE5d30a25aC9283c8a9',
    },
  },
  LINK_BNB_FLIP: {
    name: 'LINK-BNB LP',
    shortName: 'LP',
    logo: LINK_BNB_LOGO,
    description: 'LINK-BNB LP',
    decimals: 18,
    addresses: {
      56: '0x824eb9faDFb377394430d2744fa7C42916DE3eCe',
      97: '0x5D8cC48485DE0b486A8b1019C5b2a902c266162f',
    },
  },
  BANANA_BNB_FLIP: {
    name: 'BANANA-BNB LP',
    shortName: 'LP',
    logo: BANANA_BNB,
    description: 'Coming soon',
    decimals: 18,
    addresses: {
      56: '0xf65c1c0478efde3c19b49ecbe7acc57bb6b1d713',
      97: '0x1187076980499Ea63eD4AFF4E14c42666224fAF1',
    },
    isApeSwap: true,
  },
  BUSD_BNB_FLIP: {
    name: 'BUSD-BNB LP',
    shortName: 'LP',
    logo: BUSD_BNB_LOGO,
    description: 'BUSD-BNB LP',
    decimals: 18,
    addresses: {
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
      97: '0xDc9a21c47bC72b2DE284Dde7758BA6b488A9Cd11',
    },
  },
  USDT_BNB_FLIP: {
    name: 'USDT-BNB LP',
    shortName: 'LP',
    logo: USDT_BNB_LOGO,
    description: 'USDT-BNB LP',
    decimals: 18,
    addresses: {
      56: '0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE',
      97: '0x98ab0968fd67fEc76A2A350Da22F29AEF4c54571',
    },
  },
  DOGE_BNB_FLIP: {
    name: 'DOGE-BNB LP',
    shortName: 'LP',
    logo: DOGE_BNB_LOGO,
    description: 'DOGE-BNB LP',
    decimals: 18,
    addresses: {
      56: '0xac109C8025F272414fd9e2faA805a583708A017f',
      97: '0x4139A50ddc49771a1ed2344C4150ff891d639E04',
    },
  }
};

export const ZAP_TOKEN_LIST = [
  TOKENS_ZAP.BNB,
  TOKENS_ZAP.WBNB,
  TOKENS_ZAP.HUNNY,
  TOKENS_ZAP.CAKE,
  TOKENS_ZAP.BUNNY,
  TOKENS_ZAP.LINK,
  TOKENS_ZAP.BANANA,
  TOKENS_ZAP.USDC,
  TOKENS_ZAP.BUSD,
  TOKENS_ZAP.USDT,
  TOKENS_ZAP.DOGE,
  TOKENS_ZAP.HUNNY_BNB_FLIP,
  TOKENS_ZAP.CAKE_BNB_FLIP,
  TOKENS_ZAP.BUNNY_BNB_FLIP,
  TOKENS_ZAP.LINK_BNB_FLIP,
  TOKENS_ZAP.BUSD_BNB_FLIP,
  TOKENS_ZAP.USDT_BNB_FLIP,
  TOKENS_ZAP.DOGE_BNB_FLIP,
  TOKENS_ZAP.BANANA_BNB_FLIP
];

export const TOKEN_NAMES = {
  WBNB: 'WBNB',
  HUNNY: 'HUNNY',
  HUNNY_BNB_FLIP: 'HUNNY BNB LP',
};
