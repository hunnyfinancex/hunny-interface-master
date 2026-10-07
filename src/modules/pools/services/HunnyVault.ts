import HunnyChefBuild from '../../abis/HunnyChef.json';
import VaultHunnyBuild from '../../abis/VaultHunny.json';
import { BasePool } from './BasePool';
import BigNumber from 'bignumber.js';
import { getAddress, getCAKEPrice, getHUNNYPrice } from '../../utils';
import { HUNNY_MASTER_CHEF } from '../../../constants/contracts';

export default class HunnyVault extends BasePool {
  protected readonly _abi = VaultHunnyBuild.abi;

  constructor(contractAddress: string) {
    super(contractAddress);
  }

  public async tvl(): Promise<BigNumber> {
    const cakePrice = await getCAKEPrice();
    const balance = await this.getContract(null).methods.balance().call();
    return new BigNumber(balance).multipliedBy(cakePrice);
  }

  public async profitOf(account: string): Promise<BigNumber[]> {
    const web3 = this.getWeb3(null);
    const hunnyChef = new web3.eth.Contract(HunnyChefBuild.abi, getAddress(HUNNY_MASTER_CHEF));
    const pending = await hunnyChef.methods.pendingHunny(this.Address, account).call();

    return [new BigNumber(pending), new BigNumber(0)];
  }

  public async balanceOf(account: string): Promise<BigNumber> {
    const contract = this.getContract(null);
    const balance = await contract.methods.balanceOf(account).call();
    return new BigNumber(balance);
  }

  public async getProfitInUsd(account: string): Promise<BigNumber> {
    const profits = await this.profitOf(account);
    return profits[0].multipliedBy(await getHUNNYPrice())
  }

  public async getBalanceInUsd(account: string): Promise<BigNumber> {
    const hunnyPrice = await getHUNNYPrice();
    const balance = await this.balanceOf(account);
    return hunnyPrice.multipliedBy(balance);
  }

  public async compoundApy(poolCode?: string): Promise<[BigNumber, BigNumber]> {
    return [new BigNumber(0), new BigNumber(0)];
  }

  public async depositedAt(account: string): Promise<number> {
    return 0;
  }
}
