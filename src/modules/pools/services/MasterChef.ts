import Web3 from 'web3';
import {
  getAddress,
  getBNBPrice,
  getCAKEPrice,
  getPancakePid,
  getPoolDetailsByCode,
  getPublicProvider,
} from '../../utils';
import IMasterChef from '../../abis/IMasterChef.json';
import BigNumber from 'bignumber.js';
import { getTokenBalance, getTokenTotalSupply } from '../../infura';
import { BLOCK_PER_YEAR } from '../../../constants/values';
import { TOKENS } from '../../../constants/tokens';

export class MasterChef {
  protected _abi: any;
  protected _address: string;

  constructor(address: string) {
    this._address = address;
    this._abi = IMasterChef.abi;
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

  public async cakePerBlock(): Promise<BigNumber> {
    const contract = this.getContract(null);
    const value = await contract.methods.cakePerBlock().call();
    return new BigNumber(value);
  }

  public async totalAllocPoint(): Promise<BigNumber> {
    const contract = this.getContract(null);
    const value = await contract.methods.totalAllocPoint().call();
    return new BigNumber(value);
  }

  public async compoundCakeApy(poolCode: string): Promise<any> {
    const poolDetails = getPoolDetailsByCode(poolCode);

    const contract = this.getContract(null);
    const { allocPoint } = await contract.methods.poolInfo(0).call();
    const totalAllocPoint = await contract.methods.totalAllocPoint().call();

    const totalDepositedAtPancake = await getTokenBalance(
      poolDetails.depositToken.addresses,
      this.Address
    );
    const cakePerYear = new BigNumber(BLOCK_PER_YEAR).multipliedBy(
      await this.cakePerBlock()
    );

    const cakeEarnedByCakePoolPerYear = cakePerYear
      .multipliedBy(allocPoint)
      .dividedBy(totalAllocPoint);
    const cakeEarnedByDepositOneCakePerYear =
      cakeEarnedByCakePoolPerYear.dividedBy(totalDepositedAtPancake);

    return {
      cakeEarnedByCakePoolPerYear: cakeEarnedByCakePoolPerYear,
      cakeEarnedByDepositOneCakePerYear: cakeEarnedByDepositOneCakePerYear,
      apy: cakeEarnedByDepositOneCakePerYear.multipliedBy(100),
    };
  }

  // Outdated code
  public async compoundApy(poolCode: string): Promise<any> {
    const poolDetails = getPoolDetailsByCode(poolCode);

    const contract = this.getContract(null);
    const { allocPoint } = await contract.methods
      .poolInfo(getPancakePid(poolDetails.pancakePid))
      .call();
    const totalAllocPoint = await contract.methods.totalAllocPoint().call();

    const cakePrice = await getCAKEPrice();
    const bnbPrice = await getBNBPrice();

    const totalDepositedAtPancake = await getTokenBalance(
      poolDetails.depositToken.addresses,
      this.Address
    );
    const cakePerYear = new BigNumber(BLOCK_PER_YEAR).multipliedBy(
      await this.cakePerBlock()
    );

    const wbnbBalance = await getTokenBalance(
      TOKENS.WBNB.addresses,
      getAddress(poolDetails.depositToken.addresses)
    );
    const totalLpSupply = await getTokenTotalSupply(
      poolDetails.depositToken.addresses
    );
    const valueOfOneLpTokenInUsd = wbnbBalance
      .multipliedBy(2)
      .multipliedBy(bnbPrice)
      .dividedBy(totalLpSupply);

    const totalUsdDepositAtPancake = totalDepositedAtPancake.multipliedBy(
      valueOfOneLpTokenInUsd
    );
    const usdEarnPerYearByThisPool = cakePerYear
      .multipliedBy(new BigNumber(allocPoint))
      .dividedBy(totalAllocPoint)
      .multipliedBy(cakePrice);
    const usdEarnPerYearByOneLpToken = valueOfOneLpTokenInUsd
      .multipliedBy(usdEarnPerYearByThisPool)
      .dividedBy(totalUsdDepositAtPancake);
    const apr = usdEarnPerYearByOneLpToken
      .multipliedBy(100)
      .dividedBy(valueOfOneLpTokenInUsd);

    const earnPerDay = apr.dividedBy(365);
    const yieldPerDay = new BigNumber(1)
      .multipliedBy(earnPerDay)
      .dividedBy(100);
    const balancePerDay = new BigNumber(1).plus(yieldPerDay);
    const apy = balancePerDay.pow(365).minus(1).dividedBy(1).multipliedBy(100);

    return {
      valueOfOneLpTokenInUsd: valueOfOneLpTokenInUsd,
      usdEarnPerYearByOneLpToken: usdEarnPerYearByOneLpToken,
      apr: apr,
      apy: apy,
    };
  }
}
