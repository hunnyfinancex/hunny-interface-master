import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import poolsReducer from './pools';
import lotteryReducer from './lottery';
import appReducer from './app';
import zapReducer from './zap';

const store = configureStore({
  reducer: {
    pools: poolsReducer,
    lottery: lotteryReducer,
    app: appReducer,
    zap: zapReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
