/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import { AppState } from '../../modules/models/app.models';
import { getHUNNYPrice } from '../../modules/utils';
import { initialAppState } from './initialState';

const initialState: AppState = initialAppState;

export const fetchHunnyPrice = () =>
  async (dispatch: any) => {
    const hunnyPrice = await getHUNNYPrice();

    dispatch(setHunnyPrice(hunnyPrice));
  };

export const LotterySlice = createSlice({
  name: 'Lottery',
  initialState,
  reducers: {
    setHunnyPrice: (state, action) => {
      let hunnyPrice: BigNumber = action.payload;
      state.hunnyPrice = hunnyPrice;
      return state;
    }
  },
  extraReducers: (builder) => { },
});

// Actions
export const {
  setHunnyPrice
} = LotterySlice.actions;

export default LotterySlice.reducer;
