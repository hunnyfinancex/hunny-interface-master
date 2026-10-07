import BigNumber from "bignumber.js";
import { TOKENS_ZAP, ZAP_TOKEN_LIST } from "../../constants/tokens";
import { ZapTabEnum } from "../../modules/enums/Zap.enum";
import { ZapState, ZapTokenBalance } from "../../modules/models/zap.model";

export const initialAppState: ZapState = {
  payToken: TOKENS_ZAP.BNB,
  receiveToken: TOKENS_ZAP.HUNNY,
  tab: ZapTabEnum.Dashboard,

  listTokenDropDown: ZAP_TOKEN_LIST.map((item) => ({ token: item, balance: new BigNumber(0), disabled: false } as ZapTokenBalance))
};
