import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TOKENS_ZAP } from '../../constants/tokens';
import { State } from '../../modules/models/state.model';
import { toTokenUnitsBN } from '../../modules/number';
import { getAddress } from '../../modules/utils';
import { getAmoutsOut } from '../../modules/zap';


export const useEstimateReceiveValue = () => {
  const [convertRate, setConvertRate] = useState(null);

  const payToken = useSelector(
    (state: State) => state.zap.payToken
  );

  const receiveToken = useSelector(
    (state: State) => state.zap.receiveToken
  );

  useEffect(() => {
    const fetch = async () => {
      if (payToken && receiveToken) {
        const rate = await getAmountOut();
        setConvertRate(rate);
      }
    }

    fetch();
    const interval = setInterval(fetch, 10000);
    return () => clearInterval(interval);
  }, [payToken, receiveToken])

  const getAmountOut = async () => {
    let tokenIn = payToken;
    let tokenOut = receiveToken;
    // BNB - token
    if (payToken.name === TOKENS_ZAP.BNB.name) {
      tokenIn = TOKENS_ZAP.WBNB;
    }
    // token - BNB
    if (receiveToken.name === TOKENS_ZAP.BNB.name) {
      tokenOut = TOKENS_ZAP.WBNB
    }

    // BNB - WBNB or WBNB - BNB
    if ((payToken.name === TOKENS_ZAP.BNB.name && receiveToken.name === TOKENS_ZAP.WBNB.name)
      || (payToken.name === TOKENS_ZAP.WBNB.name && receiveToken.name === TOKENS_ZAP.BNB.name)) {
      return new BigNumber(1);

    } else {
      // caculate amount output
      if (payToken.name === TOKENS_ZAP.BNB.name || payToken.name === TOKENS_ZAP.WBNB.name
        || receiveToken.name === TOKENS_ZAP.BNB.name || receiveToken.name === TOKENS_ZAP.WBNB.name) {

        // check LP
        if (receiveToken.shortName === TOKENS_ZAP.HUNNY_BNB_FLIP.shortName) {
          return null;
        } else {

          // BNB/WBNB - token or token - WBNB/BNB
          const path = [getAddress(tokenIn.addresses), getAddress(tokenOut.addresses)];
          const amountOutput = await getAmoutsOut(new BigNumber(1), path, payToken, receiveToken);

          return toTokenUnitsBN(amountOutput, receiveToken.decimals);
        }
      } else {
        // token - token
        if (payToken.shortName === TOKENS_ZAP.HUNNY_BNB_FLIP.shortName ||
          receiveToken.shortName === TOKENS_ZAP.HUNNY_BNB_FLIP.shortName) {
          return null;
        } else {
          // EX: HUNNY - CAKE, convert HUNNY - WBNB -> WBNB - CAKE
          const path0 = [getAddress(payToken.addresses), getAddress(TOKENS_ZAP.WBNB.addresses)];
          const path1 = [getAddress(TOKENS_ZAP.WBNB.addresses), getAddress(receiveToken.addresses)];

          const amountOutputWBNB = await getAmoutsOut(new BigNumber(1), path0, payToken, TOKENS_ZAP.WBNB);
          const amountOutput = await getAmoutsOut(toTokenUnitsBN(amountOutputWBNB, 18).toString(10), path1, TOKENS_ZAP.WBNB, receiveToken);

          return toTokenUnitsBN(amountOutput, receiveToken.decimals)
        }
      }
    }
  }

  return { convertRate }
};
