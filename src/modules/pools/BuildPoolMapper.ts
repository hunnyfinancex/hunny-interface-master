import {
  HUNNY_ACE_POOL,
  BANANA_BNB_POOL,
  BANANA_POOL,
  BNB_POOL,
  BUNNY_BNB_FLIP_POOL,
  BUSD_BNB_FLIP_LEGACY_POOL,
  BUSD_BNB_FLIP_POOL,
  BUSD_POOL,
  CAKE_BNB_FLIP_LEGACY_POOL,
  CAKE_BNB_FLIP_POOL,
  CAKE_POOL,
  DOGE_BNB_FLIP_LEGACY_POOL,
  DOGE_BNB_FLIP_POOL,
  HUNNY_BNB_POOL,
  HUNNY_POOL,
  LINK_BNB_FLIP_POOL,
  USDC_POOL,
  USDT_BNB_FLIP_LEGACY_POOL,
  USDT_BNB_FLIP_POOL,
  USDT_POOL,
  HUNNY_AUTO_POOL,
  BUSD_ALPACA_POOL,
  USDT_ALPACA_POOL,
  ETH_ALPACA_POOL,
  BTCB_ALPACA_POOL,
  BABY_POOL, ALPACA_POOL, TUSD_ALPACA_POOL, FIL_ALPACA_POOL, CAKE_LOVE_POOL,
} from '../../constants/pools';
import { getAddress } from '../utils';
import { BasePool } from './services/BasePool';
import HunnyBNBPool from './services/HunnyBNBPool';
import HunnyPool from './services/HunnyPool';
import CakeFlipPool from './services/CakeFlipPool';
import CakeVault from './services/CakeVault';
import { BananaVault } from './services/BananaVault';
import BananaFlipPool from './services/BananaFlipPool';
import VaultFlipToCake from './services/VaultFlipToCake';
import HunnyVault from './services/HunnyVault';
import VaultVenus from './services/VaultVenus';
import VaultAlpacaBNB from './services/VaultAlpacaBNB';
import VaultHunnyMaximizer from './services/VaultHunnyMaximizer';
import VaultAlpacaRabbit from './services/VaultAlpacaRabbit';
import BabyVault from './services/BabyVault';
import VaultCakeToLove from './services/VaultCakeToLove';

class BuildPoolMapper {
  private _mapper: Map<string, BasePool> = new Map();

  public getBuildPool(address: string) {
    let pool = this._mapper.get(address);
    if (pool) {
      return pool;
    }

    switch (address) {
      case getAddress(CAKE_LOVE_POOL.addresses):
        pool = new VaultCakeToLove(address);
        this._mapper.set(address, pool);
        break;

      case getAddress(HUNNY_ACE_POOL.addresses):
        pool = new HunnyVault(address);
        this._mapper.set(address, pool);
        break;

      case getAddress(HUNNY_POOL.addresses):
        pool = new HunnyPool(address);
        this._mapper.set(address, pool);
        break;

      case getAddress(HUNNY_BNB_POOL.addresses):
        pool = new HunnyBNBPool(address);
        this._mapper.set(address, pool);
        break;

      case getAddress(HUNNY_AUTO_POOL.addresses):
        pool = new VaultHunnyMaximizer(address);
        this._mapper.set(address, pool);
        break;

      case getAddress(CAKE_POOL.addresses):
        pool = new CakeVault(address);
        this._mapper.set(address, pool);
        break;

      case getAddress(BANANA_POOL.addresses):
        pool = new BananaVault(address);
        this._mapper.set(address, pool);
        break;

      case getAddress(BANANA_BNB_POOL.addresses):
        pool = new BananaFlipPool(address);
        this._mapper.set(address, pool);
        break;

      case getAddress(CAKE_BNB_FLIP_LEGACY_POOL.addresses):
        pool = new CakeFlipPool(address);
        this._mapper.set(address, pool);
        break;
      case getAddress(CAKE_BNB_FLIP_POOL.addresses):
        pool = new VaultFlipToCake(address);
        this._mapper.set(address, pool);
        break;

      case getAddress(BUSD_BNB_FLIP_LEGACY_POOL.addresses):
        pool = new CakeFlipPool(address);
        this._mapper.set(address, pool);
        break;

      case getAddress(BUSD_BNB_FLIP_POOL.addresses):
        pool = new VaultFlipToCake(address);
        this._mapper.set(address, pool);
        break;

      case getAddress(USDT_BNB_FLIP_LEGACY_POOL.addresses):
        pool = new CakeFlipPool(address);
        this._mapper.set(address, pool);
        break;

      case getAddress(USDT_BNB_FLIP_POOL.addresses):
        pool = new VaultFlipToCake(address);
        this._mapper.set(address, pool);
        break;

      case getAddress(DOGE_BNB_FLIP_POOL.addresses):
        pool = new VaultFlipToCake(address);
        this._mapper.set(address, pool);
        break;

      case getAddress(DOGE_BNB_FLIP_LEGACY_POOL.addresses):
        pool = new CakeFlipPool(address);
        this._mapper.set(address, pool);
        break;

      case getAddress(LINK_BNB_FLIP_POOL.addresses):
        pool = new VaultFlipToCake(address);
        this._mapper.set(address, pool);
        break;

      case getAddress(BUNNY_BNB_FLIP_POOL.addresses):
        pool = new VaultFlipToCake(address);
        this._mapper.set(address, pool);
        break;

      case getAddress(BUSD_POOL.addresses):
        pool = new VaultVenus(address);
        this._mapper.set(address, pool);
        break;

      case getAddress(USDT_POOL.addresses):
        pool = new VaultVenus(address);
        this._mapper.set(address, pool);
        break;

      case getAddress(USDC_POOL.addresses):
        pool = new VaultVenus(address);
        this._mapper.set(address, pool);
        break;

      case getAddress(BNB_POOL.addresses):
        pool = new VaultAlpacaBNB(address);
        this._mapper.set(address, pool);
        break;

      case getAddress(BUSD_ALPACA_POOL.addresses):
      case getAddress(USDT_ALPACA_POOL.addresses):
      case getAddress(ETH_ALPACA_POOL.addresses):
      case getAddress(BTCB_ALPACA_POOL.addresses):
      case getAddress(ALPACA_POOL.addresses):
      case getAddress(TUSD_ALPACA_POOL.addresses):
      case getAddress(FIL_ALPACA_POOL.addresses):
        pool = new VaultAlpacaRabbit(address);
        this._mapper.set(address, pool);
        break;

      case getAddress(BABY_POOL.addresses):
        pool = new BabyVault(address);
        this._mapper.set(address, pool);
          break;

      default:
        return null;
    }

    return pool;
  }
}

export const poolServiceMapper = new BuildPoolMapper();

export default BuildPoolMapper;
