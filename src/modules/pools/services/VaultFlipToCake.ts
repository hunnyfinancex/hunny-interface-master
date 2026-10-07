import CakeFlipPool from './CakeFlipPool';
import VaultFlipToCakeBuild from '../../abis/VaultFlipToCake.json';
import BigNumber from 'bignumber.js';

export default class VaultFlipToCake extends CakeFlipPool {
  protected readonly _abi = VaultFlipToCakeBuild.abi;

  constructor(contractAddress: string) {
    super(contractAddress);
  }

  public async profitOf(account: string): Promise<BigNumber[]> {
    const contract = this.getContract(null);
    const { _cake, _hunny } = await contract.methods.profitOf(account).call();
    return [new BigNumber(_cake), new BigNumber(_hunny)];
  }
}
