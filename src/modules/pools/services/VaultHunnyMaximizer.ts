import VaultHunnyMaximizerBuild from '../../abis/VaultHunnyMaximizer.json';
import BigNumber from 'bignumber.js';
import { getHUNNYPrice } from '../../utils';
import { toBaseUnitBN } from '../../number';
import { BasePool } from './BasePool';

export default class VaultHunnyMaximizer extends BasePool {
  protected readonly _abi = VaultHunnyMaximizerBuild.abi;

  constructor(contractAddress: string) {
    super(contractAddress);
  }

  public async tvl(): Promise<BigNumber> {
    const hunnyPrice = await getHUNNYPrice();
    const balance = await this.getContract(null).methods.balance().call();
    return new BigNumber(balance).multipliedBy(hunnyPrice);
  }

  public async profitOf(account: string): Promise<BigNumber[]> {
    const contract = this.getContract(null);
    const { _hunny } = await contract.methods.profitOf(account).call();
    return [new BigNumber(_hunny)];
  }

  // it should return value in wei, do not convert in this function
  // try convert wei value to readable value in the display step
  public async getProfitInUsd(account: string): Promise<BigNumber> {
    const profits = await this.profitOf(account);
    return profits[0].multipliedBy(await getHUNNYPrice());
  }

  // it should return value in wei
  public async getBalanceInUsd(account: string): Promise<BigNumber> {
    const hunnyPrice = await getHUNNYPrice();
    const balance = await this.balanceOf(account);
    return hunnyPrice.multipliedBy(balance);
  }

  // Outdated code
  public async compoundApy(poolCode?: string): Promise<[BigNumber, BigNumber]> {
    return [new BigNumber(0), new BigNumber(0)];
  }

  public async withdrawableBalanceOf(account: string): Promise<BigNumber> {
    return this.balanceOf(account);
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
        .withdraw(toBaseUnitBN(amount, 18).toString(10))
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
