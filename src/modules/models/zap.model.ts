import BigNumber from "bignumber.js";
import { ZapTabEnum } from "../enums/Zap.enum";
import { TokenDisplay, TokenLP } from "./tokenDisplay.model";

export class ZapState {
  payToken: TokenDisplay;
  receiveToken: TokenLP;

  tab: ZapTabEnum;

  listTokenDropDown: ZapTokenBalance[];
}

export interface ZapTokenBalance {
  token: TokenDisplay;
  balance: BigNumber;
  disabled: boolean;
}