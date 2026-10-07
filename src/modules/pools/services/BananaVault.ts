import CakeVault from './CakeVault';
import BigNumber from 'bignumber.js';
import {
  getAddress,
  getBANANAPrice,
  getBNBPrice,
  getCAKEPrice,
  getHUNNYPrice,
} from '../../utils';
import { MasterChef } from './MasterChef';
import { APE_MASTER_CHEF } from '../../../constants/contracts';
import { HUNNY_PER_BNB_EARN } from '../../../constants/values';

export class BananaVault extends CakeVault {
  public async tvl(): Promise<BigNumber> {
    const cakePrice = await getBANANAPrice();
    const balance = await this.getContract(null).methods.balance().call();
    return new BigNumber(balance).multipliedBy(cakePrice);
  }

  // it should return value in wei, do not convert in this function
  // try convert wei value to readable value in the display step
  public async getProfitInUsd(account: string): Promise<BigNumber> {
    const profits = await this.profitOf(account);

    const cakeProfit = profits[0].multipliedBy(await getBANANAPrice());
    const hunnyProfit = profits[1].multipliedBy(await getHUNNYPrice());

    return cakeProfit.plus(hunnyProfit);
  }

  // it should return value in wei
  public async getBalanceInUsd(account: string): Promise<BigNumber> {
    const cakePrice = await getBANANAPrice();
    const balance = await this.balanceOf(account);
    return cakePrice.multipliedBy(balance);
  }

  // Outdated code
  public async compoundApy(poolCode?: string): Promise<[BigNumber, BigNumber]> {
    const compoudApyData = this.CompoudApyData;
    if (compoudApyData) {
      return compoudApyData;
    }

    // get assets price
    const cakePrice = await getBANANAPrice();
    const bnbPrice = await getBNBPrice();
    const hunnyPrice = await getHUNNYPrice();

    // calculate apy of pancake CAKE pool
    let masterChef = new MasterChef(getAddress(APE_MASTER_CHEF));

    const {
      cakeEarnedByCakePoolPerYear,
      cakeEarnedByDepositOneCakePerYear,
      apy,
    } = await masterChef.compoundCakeApy(poolCode);

    // unuse code
    // const earnPerDay = apy.dividedBy(365);
    // const yieldPerDay = new BigNumber(1)
    //   .multipliedBy(earnPerDay)
    //   .dividedBy(100);
    // const balancePerDay = new BigNumber(1).plus(yieldPerDay);
    // const cakeApy = balancePerDay
    //   .pow(365)
    //   .minus(1)
    //   .dividedBy(1)
    //   .multipliedBy(100);

    const bnbPerCake = cakePrice
      .dividedBy(bnbPrice)
      .multipliedBy(cakeEarnedByDepositOneCakePerYear);
    const hunnyMintPerCake = bnbPerCake.multipliedBy(HUNNY_PER_BNB_EARN);
    const hunnyEarnPerCakeInUsd = hunnyMintPerCake
      .multipliedBy(hunnyPrice)
      .multipliedBy(30)
      .dividedBy(100);
    const poolApr = hunnyEarnPerCakeInUsd
      .dividedBy(cakePrice)
      .multipliedBy(100)
      .dividedBy(1e18);

    // const earnHunnyPerDay = poolApr.dividedBy(365);
    // const yieldHunnyPerDay = new BigNumber(1)
    //   .multipliedBy(earnHunnyPerDay)
    //   .dividedBy(100);
    // const balanceHunnyPerDay = new BigNumber(1).plus(yieldHunnyPerDay);
    // const poolApy = balanceHunnyPerDay
    //   .pow(365)
    //   .minus(1)
    //   .dividedBy(1)
    //   .multipliedBy(100);

    this.CompoudApyData = [poolApr, apy];
    return [poolApr, apy];
  }
}
