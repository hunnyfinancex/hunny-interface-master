import VaultVestingBuild from '../../abis/VaultVesting.json';
import VaultCakeToLoveBuild from '../../abis/VaultCakeToLove.json';
import BigNumber from 'bignumber.js';
import { getAddress, getCAKEPrice, getLOVEPrice } from '../../utils';
import { BasePool } from './BasePool';
import { CAKE_LOVE_POOL } from '../../../constants/pools';

export default class VaultCakeToLove extends BasePool {
  protected readonly _abi = VaultCakeToLoveBuild.abi;

  constructor(contractAddress: string) {
    super(contractAddress);
  }

  public async tvl(): Promise<BigNumber> {
    const cakePrice = await getCAKEPrice();
    const balance = await this.getContract(null).methods.totalSupply().call();
    return new BigNumber(balance).multipliedBy(cakePrice);
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
    return profits[0].multipliedBy(await getLOVEPrice());
  }

  // it should return value in wei
  public async getBalanceInUsd(account: string): Promise<BigNumber> {
    const cakePrice = await getCAKEPrice();
    const balance = await this.balanceOf(account);
    return cakePrice.multipliedBy(balance);
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

  public async getTokenLockAmount(account: string): Promise<BigNumber> {
    const web3 = this.getWeb3(null);
    const vestingContract = new web3.eth.Contract(VaultVestingBuild.abi, getAddress(CAKE_LOVE_POOL.vestingAddresses));
    const { _available } = await vestingContract.methods.claimInfo(account).call();
    return new BigNumber(_available);
  }

  public async getTokenUnlockedAmount(account: string): Promise<BigNumber> {
    const web3 = this.getWeb3(null);
    const vestingContract = new web3.eth.Contract(VaultVestingBuild.abi, getAddress(CAKE_LOVE_POOL.vestingAddresses));
    const { _claimable, _penalty } = await vestingContract.methods.claimInfo(account).call();
    return new BigNumber(_claimable).plus(new BigNumber(_penalty));
  }

  public async getTokenPenalty(account: string): Promise<BigNumber> {
    const web3 = this.getWeb3(null);
    const vestingContract = new web3.eth.Contract(VaultVestingBuild.abi, getAddress(CAKE_LOVE_POOL.vestingAddresses));
    const { _penalty } = await vestingContract.methods.claimInfo(account).call();
    return new BigNumber(_penalty);
  }

  public async getTokenClaimable(account: string): Promise<BigNumber> {
    const web3 = this.getWeb3(null);
    const vestingContract = new web3.eth.Contract(VaultVestingBuild.abi, getAddress(CAKE_LOVE_POOL.vestingAddresses));
    const { _claimable } = await vestingContract.methods.claimInfo(account).call();
    return new BigNumber(_claimable);
  }

  public async claimVesting(ethereum: any, account: string): Promise<string> {
    try {
      const web3 = this.getWeb3(ethereum);
      const vestingContract = new web3.eth.Contract(VaultVestingBuild.abi, getAddress(CAKE_LOVE_POOL.vestingAddresses));
      const tx = await vestingContract.methods
        .claimVesting()
        .send({
          from: account,
          to: vestingContract.options.address,
        });
      if (tx && tx.transactionHash) return tx.transactionHash;
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
