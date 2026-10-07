import { BasePool } from './BasePool';
import VaultVenusBuild from '../../abis/VaultVenus.json';
import BigNumber from 'bignumber.js';
import { toBaseUnitBN } from '../../number';
import { getCAKEPrice, getHUNNYPrice } from '../../utils';

export default class VaultVenus extends BasePool {
  protected readonly _abi = VaultVenusBuild.abi;

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
    const balance = await contract.methods.balanceOf(account).call();
    return new BigNumber(balance);
  }

  public async profitOf(account: string): Promise<BigNumber[]> {
    const contract = this.getContract(null);
    const { _usd, _hunny } = await contract.methods.profitOf(account).call();
    return [new BigNumber(_usd), new BigNumber(_hunny)];
  }

  public async getProfitInUsd(account: string): Promise<BigNumber> {
    const profits = await this.profitOf(account);

    const tokenProfit = profits[0];
    const hunnyProfit = profits[1].multipliedBy(await getHUNNYPrice());

    return tokenProfit.plus(hunnyProfit);
  }

  public async getBalanceInUsd(account: string): Promise<BigNumber> {
    return await this.balanceOf(account);
  }

  public async compoundApy(poolCode?: string): Promise<[BigNumber, BigNumber]> {
    return [new BigNumber(0), new BigNumber(0)];
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
