import HunnyBNBPoolBuild from '../../abis/HunnyBNBPool.json';
import { BasePool } from './BasePool';
import BigNumber from 'bignumber.js';
import { getAddress, getBNBPrice, getHUNNYPrice } from '../../utils';
import { getTokenBalance, getTokenTotalSupply } from '../../infura';
import { TOKENS } from '../../../constants/tokens';
import { HUNNY_PER_HUNNY_BNB_FLIP } from '../../../constants/values';

class HunnyBNBPool extends BasePool {
  protected readonly _abi = HunnyBNBPoolBuild.abi;

  constructor(contractAddress: string) {
    super(contractAddress);
  }

  public async tvl(): Promise<BigNumber> {
    // get assets price
    const bnbPrice = await getBNBPrice();

    // calculate value of 1 HUNNY-BNB FLIP
    const wbnbBalance = await getTokenBalance(
      TOKENS.WBNB.addresses,
      getAddress(TOKENS.HUNNY_BNB_FLIP.addresses)
    );

    const totalHunnyBnbFlipCapInUsd = wbnbBalance
      .multipliedBy(2)
      .multipliedBy(bnbPrice);

    const totalHunnyBnbFlipSupply = await getTokenTotalSupply(
      TOKENS.HUNNY_BNB_FLIP.addresses
    );

    const valueOfOneHunnyBnbFlipInUsd = totalHunnyBnbFlipCapInUsd
      .multipliedBy(1e18)
      .dividedBy(totalHunnyBnbFlipSupply);

    const totalFlipDeposited = await getTokenBalance(
      TOKENS.HUNNY_BNB_FLIP.addresses,
      this.Address
    );

    // in wei value
    return totalFlipDeposited
      .multipliedBy(valueOfOneHunnyBnbFlipInUsd)
      .div(1e18);
  }

  public async profitOf(account: string): Promise<BigNumber[]> {
    const contract = this.getContract(null);
    const { _hunny } = await contract.methods.profitOf(account).call();
    return [new BigNumber(_hunny)];
  }

  public async withdraw(
    ethereum: any,
    account: string
  ): Promise<string | null> {
    return await this.withdrawAll(ethereum, account);
  }

  // it should return value in wei, do not convert in this function
  // try convert wei value to readable value in the display step
  public async getProfitInUsd(account: string): Promise<BigNumber> {
    const profits = await this.profitOf(account);

    return profits[0].multipliedBy(await getHUNNYPrice());
  }

  // it should return value in wei
  public async getBalanceInUsd(account: string): Promise<BigNumber> {
    // get assets price
    const bnbPrice = await getBNBPrice();

    // calculate value of 1 HUNNY-BNB FLIP
    const wbnbBalance = await getTokenBalance(
      TOKENS.WBNB.addresses,
      getAddress(TOKENS.HUNNY_BNB_FLIP.addresses)
    );

    const totalHunnyBnbFlipCapInUsd = wbnbBalance
      .multipliedBy(2)
      .multipliedBy(bnbPrice);

    const totalHunnyBnbFlipSupply = await getTokenTotalSupply(
      TOKENS.HUNNY_BNB_FLIP.addresses
    );

    const valueOfOneHunnyBnbFlipInUsd = totalHunnyBnbFlipCapInUsd
      .multipliedBy(1e18)
      .dividedBy(totalHunnyBnbFlipSupply);

    const flipDeposited = await this.balanceOf(account);

    // in wei value
    return flipDeposited.multipliedBy(valueOfOneHunnyBnbFlipInUsd).div(1e18);
  }

  public async compoundApy(): Promise<[BigNumber, BigNumber]> {
    const compoudApyData = this.CompoudApyData;
    if (compoudApyData) {
      return compoudApyData;
    }
    // get assets price
    const bnbPrice = await getBNBPrice();
    const hunnyPrice = await getHUNNYPrice();

    // calculate value of 1 HUNNY-BNB FLIP
    const wbnbBalance = await getTokenBalance(
      TOKENS.WBNB.addresses,
      getAddress(TOKENS.HUNNY_BNB_FLIP.addresses)
    );

    const totalHunnyBnbFlipCapInUsd = wbnbBalance
      .multipliedBy(2)
      .multipliedBy(bnbPrice);

    const totalHunnyBnbFlipSupply = await getTokenTotalSupply(
      TOKENS.HUNNY_BNB_FLIP.addresses
    );

    const valueOfOneHunnyBnbFlipInUsd = totalHunnyBnbFlipCapInUsd
      .multipliedBy(1e18)
      .dividedBy(totalHunnyBnbFlipSupply);

    const earnedPerHunnyBnbFlipDepositedInUsd =
      HUNNY_PER_HUNNY_BNB_FLIP.multipliedBy(hunnyPrice);

    const estimatedApr = earnedPerHunnyBnbFlipDepositedInUsd
      .multipliedBy(100)
      .dividedBy(valueOfOneHunnyBnbFlipInUsd);

    const aprPerDay = estimatedApr.dividedBy(365);
    const apyPerDay = new BigNumber(1).plus(aprPerDay.dividedBy(100));
    const earnPerYear = apyPerDay.pow(parseInt(estimatedApr.toString(10)));

    const estimateApy = earnPerYear.multipliedBy(100);

    this.CompoudApyData = [estimateApy, estimatedApr];

    return [estimateApy, estimatedApr];
  }

  public async getReward(ethereum: any,
    account: string
  ): Promise<string | null> {
    return this.deposit(ethereum, account, '0');
  }

  public async depositedAt(account: string): Promise<number> {
    return 0;
  }
}

export default HunnyBNBPool;
