export interface WindowChain {
  ethereum?: {
    isMetaMask?: true;
    networkVersion: string;
    request?: (...args: any[]) => void;
  };
  BinanceChain?: any;
}
