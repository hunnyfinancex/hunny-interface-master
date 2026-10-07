import CakeFlipPool from './CakeFlipPool';
import VaultFlipBananaBuild from '../../abis/VaultFlipToBanana.json';

export default class VaultFlipBanana extends CakeFlipPool {
  protected readonly _abi = VaultFlipBananaBuild.abi;

  constructor(contractAddress: string) {
    super(contractAddress);
  }
}
