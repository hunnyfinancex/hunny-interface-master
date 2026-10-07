import BigNumber from 'bignumber.js';
import { AssetEnum } from 'modules/enums/Asset.enum';
import { PoolCompoundingEnum } from '../enums/Pool.enum';
import { TokenDisplay } from './tokenDisplay.model';

export class PoolCardItemViewModel {
  id: number;
  type: number;
  logo: string;
  code: string;
  apyDescription?: string;
  poolName: string;
  description: string;
  tag: AssetEnum[];
  earn: TokenDisplay[];
  isBoost: boolean;
  isDisabled: boolean;
  additionalContent: string;
  addresses: any;
  depositToken: TokenDisplay;
  isOnlyClaimAndWithdraw?: boolean;
  compounding: PoolCompoundingEnum;
  displayGuild?: boolean;

  tvl?: BigNumber;
  allowance?: BigNumber;
  apy?: [number, number];
  isWarning?: boolean;
  profit?: BigNumber[];
  profitInUsd?: BigNumber;
  balanceInUsd?: BigNumber;
  balance?: BigNumber;
  tokenBalance?: BigNumber;
  withdrawBalance?: BigNumber;
  isNew?: boolean;
  isComingSoon?: boolean;
  additionalImg?: string;
  additionalImgMobile?: string;
  isNoWithdrawFee?: boolean;
  isHaveApr?: boolean;

  isVesting?: boolean;
  tokenVestingAmount?: BigNumber;
  tokenVestingUnlocked?: BigNumber;
  tokenVestingClaimable?: BigNumber;
  tokenExitAmount?: BigNumber;

  isPause?: boolean;
}
