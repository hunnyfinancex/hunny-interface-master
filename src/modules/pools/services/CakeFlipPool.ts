import CakeFlipPoolBuild from '../../abis/CakeFlipVault.json';
import { BasePool } from './BasePool';
import BigNumber from 'bignumber.js';
import {
  getAddress,
  getBNBPrice,
  getCAKEPrice,
  getDepositToken,
  getHUNNYPrice,
} from '../../utils';
import { getTokenBalance, getTokenTotalSupply } from '../../infura';
import { TOKENS } from '../../../constants/tokens';
import { MasterChef } from './MasterChef';
import { PANCAKE_MASTER_CHEF } from '../../../constants/contracts';
import { HUNNY_PER_BNB_EARN } from '../../../constants/values';

export default class CakeFlipPool extends BasePool {
  protected readonly _abi = CakeFlipPoolBuild.abi;

  constructor(contractAddress: string) {
    super(contractAddress);
  }

  public async tvl(): Promise<BigNumber> {
    // get assets price
    const bnbPrice = await getBNBPrice();

    const depositToken = getDepositToken(this.Address);

    // calculate value of 1 HUNNY-BNB FLIP
    const wbnbBalance = await getTokenBalance(
      TOKENS.WBNB.addresses,
      getAddress(depositToken)
    );

    const totalFlipCapInUsd = wbnbBalance
      .multipliedBy(2)
      .multipliedBy(bnbPrice);

    const totalFlipSupply = await getTokenTotalSupply(depositToken);

    const valueOfOneFlipInUsd = totalFlipCapInUsd
      .multipliedBy(1e18)
      .dividedBy(totalFlipSupply);

    const totalFlipDeposited = await this.totalSupply();

    // in wei value
    return totalFlipDeposited.multipliedBy(valueOfOneFlipInUsd).div(1e18);
  }

  public async withdrawableBalanceOf(account: string): Promise<BigNumber> {
    const balance = this.balanceOf(account);
    return balance;
  }

  public async profitOf(account: string): Promise<BigNumber[]> {
    const contract = this.getContract(null);
    const { _usd, _hunny } = await contract.methods.profitOf(account).call();
    return [new BigNumber(_usd), new BigNumber(_hunny)];
  }

  // it should return value in wei, do not convert in this function
  // try convert wei value to readable value in the display step
  public async getProfitInUsd(account: string): Promise<BigNumber> {
    const profits = await this.profitOf(account);

    const cakeProfit = profits[0].multipliedBy(await getCAKEPrice());
    const hunnyProfit = profits[1].multipliedBy(await getHUNNYPrice());

    return cakeProfit.plus(hunnyProfit);
  }

  // it should return value in wei
  public async getBalanceInUsd(account: string): Promise<BigNumber> {
    // get assets price
    const bnbPrice = await getBNBPrice();

    const depositToken = getDepositToken(this.Address);

    // calculate value of 1 HUNNY-BNB FLIP
    const wbnbBalance = await getTokenBalance(
      TOKENS.WBNB.addresses,
      getAddress(depositToken)
    );

    const totalFlipCapInUsd = wbnbBalance
      .multipliedBy(2)
      .multipliedBy(bnbPrice);

    const totalFlipSupply = await getTokenTotalSupply(depositToken);

    const valueOfOneFlipInUsd = totalFlipCapInUsd
      .multipliedBy(1e18)
      .dividedBy(totalFlipSupply);

    const totalFlipDeposited = await this.balanceOf(account);

    // in wei value
    return totalFlipDeposited.multipliedBy(valueOfOneFlipInUsd).div(1e18);
  }

  // Outdated code
  public async compoundApy(poolCode?: string): Promise<[BigNumber, BigNumber]> {
    const compoudApyData = this.CompoudApyData;
    if (compoudApyData) {
      return compoudApyData;
    }

    // compound cake apy from pancake
    const masterChef = new MasterChef(getAddress(PANCAKE_MASTER_CHEF));
    const { valueOfOneLpTokenInUsd, usdEarnPerYearByOneLpToken, apy } =
      await masterChef.compoundApy(poolCode);

    // compound hunny apy
    const amountUsdToMintHunny = usdEarnPerYearByOneLpToken
      .multipliedBy(30)
      .dividedBy(100); // 30% performance fee
    const amountBNBtoMintHunny = amountUsdToMintHunny.dividedBy(
      await getBNBPrice()
    );
    const amountHunnyToMint =
      amountBNBtoMintHunny.multipliedBy(HUNNY_PER_BNB_EARN);
    const usdEarnFromHunnyMinted = amountHunnyToMint.multipliedBy(
      await getHUNNYPrice()
    );

    let poolApr = usdEarnFromHunnyMinted
      .multipliedBy(100)
      .dividedBy(valueOfOneLpTokenInUsd)
      .dividedBy(1e18);
    // if (
    //   getAddress(CAKE_BNB_FLIP_POOL.addresses) === this.Address ||
    //   getAddress(BUSD_BNB_FLIP_POOL.addresses) === this.Address ||
    //   getAddress(USDT_BNB_FLIP_POOL.addresses) === this.Address ||
    //   getAddress(DOGE_BNB_FLIP_POOL.addresses) === this.Address
    // ) {
    //
    //   const earnPerDay = poolApr.dividedBy(365);
    //   const yieldPerDay = new BigNumber(1)
    //     .multipliedBy(earnPerDay)
    //     .dividedBy(100);
    //   const balancePerDay = new BigNumber(1).plus(yieldPerDay);
    //   poolApy = balancePerDay.pow(365).minus(1).dividedBy(1).multipliedBy(100);
    // }

    this.CompoudApyData = [poolApr, apy];
    return [poolApr, apy];
  }

  public async depositedAt(account: string): Promise<number> {
    const contract = this.getContract(null);
    return await contract.methods.depositedAt(account).call();
  }

  public getTokenLockAmount(account: string): Promise<BigNumber> {
    throw new Error('Method not implemented.');
  }
  public getTokenUnlockedAmount(account: string): Promise<BigNumber> {
    throw new Error('Method not implemented.');
  }
  public getTokenClaimable(account: string): Promise<BigNumber> {
    throw new Error('Method not implemented.');
  }
}
