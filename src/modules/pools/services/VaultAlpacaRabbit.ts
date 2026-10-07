import { BasePool } from './BasePool';
import VaultAlpacaRabbitBuild from '../../abis/VaultStrategyAlpacaRabbit.json';
import BigNumber from 'bignumber.js';
import { getBNBPrice, getCAKEPrice, getHUNNYPrice, getPoolByAddress, getUndefinedTokenPrice } from '../../utils';
import { toBaseUnitBN } from '../../number';

export default class VaultAlpacaRabbit extends BasePool {
  protected readonly _abi = VaultAlpacaRabbitBuild.abi;

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

    let price = 0;
    const pool = getPoolByAddress(this._address);
    if (pool) {
      price = await getUndefinedTokenPrice(pool.depositToken.name === 'BTCB' ? 'BTC' : pool.depositToken.name);
    }
    const cakeProfit = profits[0].multipliedBy(price);
    const hunnyProfit = profits[1].multipliedBy(await getHUNNYPrice());

    return cakeProfit.plus(hunnyProfit);
  }

  public async getBalanceInUsd(account: string): Promise<BigNumber> {
    // will fix this later
    // current supported stable coin only, so mul by 1
    let price = 0;
    const pool = getPoolByAddress(this._address);
    if (pool) {
      price = await getUndefinedTokenPrice(pool.depositToken.name === 'BTCB' ? 'BTC' : pool.depositToken.name);
    }
    return new BigNumber(await this.balanceOf(account)).multipliedBy(price);
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
        });
      if (tx && tx.transactionHash) return tx.transactionHash;
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
