import CakeFlipPool from './CakeFlipPool';
import VaultFlipToBananaBuild from '../../abis/VaultFlipToBanana.json';
import BigNumber from 'bignumber.js';
import { getAddress, getBANANAPrice, getBNBPrice, getHUNNYPrice } from '../../utils';
import {
  APE_MASTER_CHEF,
} from '../../../constants/contracts';
import { HUNNY_PER_BNB_EARN } from '../../../constants/values';
import { MasterApe } from './MasterApe';

export default class BananaFlipPool extends CakeFlipPool {
  protected readonly _abi = VaultFlipToBananaBuild.abi;

  constructor(contractAddress: string) {
    super(contractAddress);
  }

  public async profitOf(account: string): Promise<BigNumber[]> {
    const contract = this.getContract(null);
    const { _cake, _hunny } = await contract.methods.profitOf(account).call();
    return [new BigNumber(_cake), new BigNumber(_hunny)];
  }

  public async getProfitInUsd(account: string): Promise<BigNumber> {
    const profits = await this.profitOf(account);

    const cakeProfit = profits[0].multipliedBy(await getBANANAPrice());
    const hunnyProfit = profits[1].multipliedBy(await getHUNNYPrice());

    return cakeProfit.plus(hunnyProfit);
  }

  // Outdated code
  public async compoundApy(poolCode?: string): Promise<[BigNumber, BigNumber]> {
    const compoudApyData = this.CompoudApyData;
    if (compoudApyData) {
      return compoudApyData;
    }

    // compound cake apy from master ape
    const masterChef = new MasterApe(getAddress(APE_MASTER_CHEF));
    const { valueOfOneLpTokenInUsd, usdEarnPerYearByOneLpToken, apr } =
      await masterChef.compoundApy(poolCode);

    // compound hunny apy
    const amountUsdToMintHunny = usdEarnPerYearByOneLpToken
      .multipliedBy(30)
      .dividedBy(100); // 30% performance fee

    const amountBNBtoMintHunny = amountUsdToMintHunny.dividedBy(
      await getBNBPrice()
    );
    const amountHunnyToMint =
      amountBNBtoMintHunny.multipliedBy(HUNNY_PER_BNB_EARN);

    const usdEarnFromHunnyMinted = amountHunnyToMint.multipliedBy(
      await getHUNNYPrice()
    );

    const poolApr = usdEarnFromHunnyMinted
      .multipliedBy(100)
      .dividedBy(valueOfOneLpTokenInUsd)
      .dividedBy(1e18);

    // const earnPerDay = poolApr.dividedBy(365);
    // const yieldPerDay = new BigNumber(1)
    //   .multipliedBy(earnPerDay)
    //   .dividedBy(100);
    // const balancePerDay = new BigNumber(1).plus(yieldPerDay);
    // const poolApy = balancePerDay
    //   .pow(365)
    //   .minus(1)
    //   .dividedBy(1)
    //   .multipliedBy(100);

    this.CompoudApyData = [poolApr, apr];
    return [poolApr, apr];
  }
}
