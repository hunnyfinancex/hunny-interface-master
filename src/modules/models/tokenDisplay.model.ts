import BigNumber from "bignumber.js";

export interface TokenDisplay {
  logo: string;
  name: string;
  shortName: string;
  addresses: any;
  description?: string;
  isApeSwap?: boolean;
  decimals: number;

  token0?: TokenDisplay;
  token1?: TokenDisplay;
}

export interface TokenLP {
  logo: string;
  name: string;
  shortName: string;
  addresses: any;
  description?: string;
  isApeSwap?: boolean;
  decimals: number;

  token0?: TokenDisplay;
  token1?: TokenDisplay;
}
