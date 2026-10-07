import { BasePool } from './BasePool';
import VaultAlpacaBNBBuild from '../../abis/VaultStrategyAlpacaRabbitBNB.json';
import BigNumber from 'bignumber.js';
import { getBNBPrice, getHUNNYPrice } from '../../utils';
import { toBaseUnitBN } from '../../number';

export default class VaultAlpacaBNB extends BasePool {
  protected readonly _abi = VaultAlpacaBNBBuild.abi;

  constructor(contractAddress: string) {
    super(contractAddress);
  }

  public async tvl(): Promise<BigNumber> {
    const contract = this.getContract(null);
    const value = await contract.methods.balance().call();
    return new BigNumber(value);
  }

  public async balanceOf(account: string): Promise<BigNumber> {
    const contract = this.getContract(null);
    const balance = await contract.methods.principalOf(account).call();
    return new BigNumber(balance);
  }

  public async withdrawableBalanceOf(account: string): Promise<BigNumber> {
    const contract = this.getContract(null);
    const balance = await contract.methods.principalOf(account).call();
    return new BigNumber(balance);
  }

  public async profitOf(account: string): Promise<BigNumber[]> {
    const contract = this.getContract(null);
    const { _cake, _hunny } = await contract.methods.profitOf(account).call();
    return [new BigNumber(_cake), new BigNumber(_hunny)];
  }

  public async getProfitInUsd(account: string): Promise<BigNumber> {
    const profits = await this.profitOf(account);

    const cakeProfit = profits[0].multipliedBy(await getBNBPrice());
    const hunnyProfit = profits[1].multipliedBy(await getHUNNYPrice());

    return cakeProfit.plus(hunnyProfit);
  }

  public async getBalanceInUsd(account: string): Promise<BigNumber> {
    return new BigNumber(await this.balanceOf(account)).multipliedBy(await getBNBPrice());
  }

  public async compoundApy(poolCode?: string): Promise<[BigNumber, BigNumber]> {
    return [new BigNumber(0), new BigNumber(0)];
  }

  public async depositedAt(account: string): Promise<number> {
    const contract = this.getContract(null);
    return await contract.methods.depositedAt(account).call();
  }

  public async deposit(
    ethereum: any,
    account: string,
    amount: string
  ): Promise<string | null> {
    try {
      const contract = this.getContract(ethereum);
      const tx = await contract.methods
        .deposit(toBaseUnitBN(amount, 18).toString(10))
        .send({
          from: account,
          to: this._address,
          value: toBaseUnitBN(amount, 18).toString(10),
        });
      if (tx && tx.transactionHash) return tx.transactionHash;
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
