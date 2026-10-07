/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import { TOKENS_ZAP, ZAP_TOKEN_LIST } from '../../constants/tokens';
import { ZapTabEnum } from '../../modules/enums/Zap.enum';
import { getBalance, getTokenBalance } from '../../modules/infura';
import { TokenDisplay, TokenLP } from '../../modules/models/tokenDisplay.model';
import { ZapState, ZapTokenBalance } from '../../modules/models/zap.model';
import { getPairToken } from '../../modules/utils';
import { initialAppState } from './initialState';

const initialState: ZapState = initialAppState;

export const fetchTokenBalance = (account: string) =>
  async (dispatch: any) => {
    const tokenList = [];
    for (let index = 0; index < ZAP_TOKEN_LIST.length; index++) {
      const token = ZAP_TOKEN_LIST[index];
      let res = new BigNumber(0);

      if (token.name === TOKENS_ZAP.BNB.name && account) {
        res = await getBalance(account);
      } else if (account) {
        res = await getTokenBalance(token.addresses, account);
      }

      tokenList.push({
        token,
        balance: res
      })
    }
    dispatch(setZapTokensBalance(tokenList));
  };

export const updatePayToken = (token: TokenDisplay) =>
  async (dispatch: any) => {
    dispatch(setPayToken(token));
  };

export const updateReceiveToken = (token: TokenDisplay) =>
  async (dispatch: any) => {
    dispatch(setReceiveToken(token));
  };

export const updateTab = (tab: ZapTabEnum) =>
  async (dispatch: any) => {
    dispatch(setTab(tab));
  };

export const ZapSlice = createSlice({
  name: 'Zap',
  initialState,
  reducers: {
    setZapTokensBalance: (state, action) => {
      let tokenList: ZapTokenBalance[] = action.payload;
      state.listTokenDropDown = tokenList.sort((item1, item2) => item1.balance.gt(item2.balance) ? -1 : 1);
      return state;
    },
    setPayToken: (state, action) => {
      let payToken: TokenDisplay = action.payload;
      const pair = getPairToken(payToken.name);

      if (pair) {
        state.receiveToken = pair;
      } else if (payToken.name === state.receiveToken?.name || state.receiveToken?.token1) {
        state.receiveToken = null;
      }
      state.payToken = payToken;
      return state;
    },
    setReceiveToken: (state, action) => {
      let receiveToken: TokenLP = action.payload;
      if (receiveToken?.name === state.payToken?.name) {
        state.payToken = null;
      }
      state.receiveToken = receiveToken;
      return state;
    },
    setTab: (state, action) => {
      let tab: ZapTabEnum = action.payload;
      state.tab = tab;
      return state;
    },
  },
  extraReducers: (builder) => { },
});

// Actions
export const {
  setZapTokensBalance,
  setPayToken,
  setReceiveToken,
  setTab
} = ZapSlice.actions;

export default ZapSlice.reducer;
