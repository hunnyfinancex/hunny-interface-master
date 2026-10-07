import { BasePool } from './BasePool';
import VaultCakeToCakeBuild from '../../abis/VaultCakeToCake.json';
import BigNumber from 'bignumber.js';
import {
  getAddress,
  getBNBPrice,
  getCAKEPrice,
  getHUNNYPrice,
} from '../../utils';
import { MasterChef } from './MasterChef';
import { PANCAKE_MASTER_CHEF } from '../../../constants/contracts';
import { HUNNY_PER_BNB_EARN } from '../../../constants/values';
import { toBaseUnitBN } from '../../number';

export default class CakeVault extends BasePool {
  protected readonly _abi = VaultCakeToCakeBuild.abi;

  constructor(contractAddress: string) {
    super(contractAddress);
  }

  public async tvl(): Promise<BigNumber> {
    const cakePrice = await getCAKEPrice();
    const balance = await this.getContract(null).methods.balance().call();
    return new BigNumber(balance).multipliedBy(cakePrice);
  }

  public async profitOf(account: string): Promise<BigNumber[]> {
    const contract = this.getContract(null);
    const { _cake, _hunny } = await contract.methods.profitOf(account).call();
    return [new BigNumber(_cake), new BigNumber(_hunny)];
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
    const cakePrice = await getCAKEPrice();
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
    const cakePrice = await getCAKEPrice();
    const bnbPrice = await getBNBPrice();
    const hunnyPrice = await getHUNNYPrice();

    // calculate apy of pancake CAKE pool
    let masterChef = new MasterChef(getAddress(PANCAKE_MASTER_CHEF));

    const {
      cakeEarnedByCakePoolPerYear,
      cakeEarnedByDepositOneCakePerYear,
      apy,
    } = await masterChef.compoundCakeApy(poolCode);

    const earnPerDay = apy.dividedBy(365);
    const yieldPerDay = new BigNumber(1)
      .multipliedBy(earnPerDay)
      .dividedBy(100);
    const balancePerDay = new BigNumber(1).plus(yieldPerDay);
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

    this.CompoudApyData = [poolApr, apy];
    return [poolApr, apy];
  }

  public async withdrawableBalanceOf(account: string): Promise<BigNumber> {
    const balance = this.balanceOf(account);
    return balance;
  }

  public async balanceOf(account: string): Promise<BigNumber> {
    const contract = this.getContract(null);
    const balance = await contract.methods.principalOf(account).call();
    return new BigNumber(balance);
  }

  public async depositedAt(account: string): Promise<number> {
    const contract = this.getContract(null);
    return await contract.methods.depositedAt(account).call();
  }

  public async withdraw(
    ethereum: any,
    account: string,
    amount: string
  ): Promise<string | null> {
    try {
      const contract = this.getContract(ethereum);
      const tx = await contract.methods
        .withdrawUnderlying(toBaseUnitBN(amount, 18).toString(10))
        .send({
          from: account,
          to: this._address,
        });
      if (tx && tx.transactionHash) return tx.transactionHash;
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
