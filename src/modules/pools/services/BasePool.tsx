import Web3 from 'web3';
import { toBaseUnitBN } from '../../number';
import { getPublicProvider } from '../../utils';
import BigNumber from 'bignumber.js';
import { CACHE_KEY, getStringData, saveStringData } from '../../cacheData';

export abstract class BasePool {
  protected abstract _abi: any;
  protected _address: string;
  protected _compoudApyData: [BigNumber, BigNumber] = null;

  public get CompoudApyData(): [BigNumber, BigNumber] {
    if (this._compoudApyData) {
      return this._compoudApyData;
    }

    const timeCached = Number(
      getStringData(CACHE_KEY.APY_CACHED_TIME + this._address)
    );
    const currentTime = new Date().getTime();
    const apy = getStringData(CACHE_KEY.APY + this._address);

    if (!apy || !timeCached) {
      return null;
    } // Cached 10 minutes

    if (timeCached + 600000 < currentTime) {
      return null;
    } // Cached 10 minutes

    const parsed = apy.split('[]');
    return [new BigNumber(parsed[0]), new BigNumber(parsed[1])];
  }

  public set CompoudApyData(value: [BigNumber, BigNumber]) {
    saveStringData(
      new Date().getTime().toString(),
      CACHE_KEY.APY_CACHED_TIME + this._address
    );
    saveStringData(
      `${value[0].toString()}[]${value[1].toString()}`,
      CACHE_KEY.APY + this._address
    );
    this._compoudApyData = value;
  }

  constructor(contractAddress: string) {
    this._address = contractAddress;
  }

  public get Address(): string {
    return this._address;
  }

  public getWeb3(ethereum: any): any {
    if (ethereum) {
      return new Web3(ethereum);
    } else {
      return getPublicProvider();
    }
  }

  public getContract(ethereum: any): any {
    const web3 = this.getWeb3(ethereum);
    return new web3.eth.Contract(this._abi, this._address);
  }

  public async withdrawableBalanceOf(account: string): Promise<BigNumber> {
    const contract = this.getContract(null);
    const balance = await contract.methods
      .withdrawableBalanceOf(account)
      .call();
    return new BigNumber(balance);
  }

  public async balanceOf(account: string): Promise<BigNumber> {
    const contract = this.getContract(null);
    const balance = await contract.methods.balanceOf(account).call();
    return new BigNumber(balance);
  }

  public async profitOf(account: string): Promise<BigNumber[]> {
    const contract = this.getContract(null);
    const { _bnb } = await contract.methods.profitOf(account).call();
    return [new BigNumber(_bnb)];
  }

  public async apy(): Promise<any> {
    const contract = this.getContract(null);
    const { _usd, _hunny, _bnb } = await contract.methods.apy().call();
    return {
      usd: new BigNumber(_usd),
      hunny: new BigNumber(_hunny),
      bnb: new BigNumber(_bnb),
    };
  }

  public async tvl(): Promise<any> {
    const contract = this.getContract(null);
    const value = await contract.methods.tvl().call();
    return new BigNumber(value);
  }

  public async totalSupply(): Promise<BigNumber> {
    const contract = this.getContract(null);
    const totalSupply = await contract.methods.totalSupply().call();
    return new BigNumber(totalSupply);
  }

  public async deposit(
    ethereum: any,
    account: string,
    amount: string
  ): Promise<string | null> {
    try {
      console.log(amount);
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

  public async withdrawAll(
    ethereum: any,
    account: string
  ): Promise<string | null> {
    try {
      const contract = this.getContract(ethereum);
      const tx = await contract.methods.withdrawAll().send({
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

  public async getReward(
    ethereum: any,
    account: string
  ): Promise<string | null> {
    try {
      const contract = this.getContract(ethereum);
      const tx = await contract.methods.getReward().send({
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

  public async getTokenLockAmount(account: string): Promise<BigNumber> {
    return new BigNumber(0);
  }

  public async getTokenUnlockedAmount(account: string): Promise<BigNumber> {
    return new BigNumber(0);
  }

  public async getTokenPenalty(account: string): Promise<BigNumber> {
    return new BigNumber(0);
  }

  public async getTokenClaimable(account: string): Promise<BigNumber> {
    return new BigNumber(0);
  }

  public async claimVesting(ethereum: any, account: string): Promise<string> {
    return '';
  }

  public abstract getProfitInUsd(account: string): Promise<BigNumber>;
  public abstract getBalanceInUsd(account: string): Promise<BigNumber>;
  public abstract depositedAt(account: string): Promise<number>;

  // Outdated code
  public abstract compoundApy(
    poolCode?: string
  ): Promise<[BigNumber, BigNumber]>;
}
