import BigNumber from 'bignumber.js';
import HunnyPoolBuild from '../../abis/HunnyPool.json';
import { getAddress, getBNBPrice, getHUNNYPrice } from '../../utils';
import { BasePool } from './BasePool';
import { getTokenBalance, getTokenTotalSupply } from '../../infura';
import { TOKENS } from '../../../constants/tokens';
import { MasterChef } from './MasterChef';
import { PANCAKE_MASTER_CHEF } from '../../../constants/contracts';
import { POOL_LIST } from '../../../constants/pools';

class HunnyPool extends BasePool {
  protected readonly _abi = HunnyPoolBuild.abi;

  constructor(contractAddress: string) {
    super(contractAddress);
  }

  public async tvl(): Promise<BigNumber> {
    const totalSupply = await this.totalSupply();
    const hunnyPrice = await getHUNNYPrice();

    return totalSupply.multipliedBy(hunnyPrice);
  }

  public async getProfitInUsd(account: string): Promise<BigNumber> {
    const profits = await this.profitOf(account);

    return profits[0].multipliedBy(await getBNBPrice());
  }

  public async getBalanceInUsd(account: string): Promise<BigNumber> {
    const hunnyDeposited = await this.balanceOf(account);

    // in wei value
    return hunnyDeposited.multipliedBy(await getHUNNYPrice());
  }

  // Outdated code
  public async compoundApy(): Promise<[BigNumber, BigNumber]> {
    const compoudApyData = this.CompoudApyData;
    if (compoudApyData) {
      return compoudApyData;
    }
    // get assets price
    const bnbPrice = await getBNBPrice();
    const hunnyPrice = await getHUNNYPrice();

    // calculate total bnb earn in 365 days
    const hunnyBnbLpBalance = await getTokenBalance(
      TOKENS.HUNNY_BNB_FLIP.addresses,
      this.Address
    );
    const totalHunnyBnbLpSupply = await getTokenTotalSupply(
      TOKENS.HUNNY_BNB_FLIP.addresses
    );
    const wbnbBalance = await getTokenBalance(
      TOKENS.WBNB.addresses,
      getAddress(TOKENS.HUNNY_BNB_FLIP.addresses)
    );
    const wbnbReward = hunnyBnbLpBalance
      .multipliedBy(wbnbBalance)
      .multipliedBy(2)
      .dividedBy(totalHunnyBnbLpSupply);

    const totalBnbInUsd = wbnbReward.multipliedBy(bnbPrice);
    const totalHunnyDeposited = await this.totalSupply();
    const totalHunnyDepositedInUsd =
      totalHunnyDeposited.multipliedBy(hunnyPrice);

    // assume deposit 1 HUNNY
    const usdEarnPerYear = new BigNumber(1).plus(
      totalBnbInUsd.dividedBy(totalHunnyDepositedInUsd)
    );

    const estimatedApr = usdEarnPerYear.multipliedBy(100);

    // assume start with 1 usd
    let balance = new BigNumber(1);
    for (let i = 0; i < 365; i++) {
      const earnedToday = usdEarnPerYear.div(365);
      balance = balance.plus(earnedToday);
    }

    const estimatedApy = balance.multipliedBy(100);

    this.CompoudApyData = [estimatedApy, estimatedApr];

    return [estimatedApy, estimatedApr];
  }

  public async depositedAt(account: string): Promise<number> {
    return 0;
  }
}

export default HunnyPool;
