import BigNumber from "bignumber.js";
import { AppState } from "../../modules/models/app.models";

export const initialAppState: AppState = {
  hunnyPrice: new BigNumber(0)
};
