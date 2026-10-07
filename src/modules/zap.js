import Web3 from 'web3';

import HunnyZapBuild from './abis/HunnyZap.json';
import WethBuild from './abis/WETH.json';
import PancakeBuild from './abis/PancakeRouter.json';
import ApeBuild from './abis/ApeRouter.json';
import { getAddress, getPairToken, getPublicProvider } from './utils';
import { getTokenBalance, getTokenTotalSupply } from './infura';
import {
  APE_ROUTER,
  HUNNY_ZAP,
  PANCAKE_ROUTER,
  WETH,
} from '../constants/contracts';
import { TOKENS_ZAP } from '../constants/tokens';
import { toBaseUnitBN } from './number';
import BigNumber from 'bignumber.js';

const getWeb3 = (ethereum) => {
  if (ethereum) {
    return new Web3(ethereum);
  } else {
    return getPublicProvider();
  }
};

export const getPancakeRouterContract = (ethereum) => {
  const web3 = getWeb3(ethereum);
  return new web3.eth.Contract(PancakeBuild.abi, getAddress(PANCAKE_ROUTER));
};

export const getApeRouterContract = (ethereum) => {
  const web3 = getWeb3(ethereum);
  return new web3.eth.Contract(ApeBuild.abi, getAddress(APE_ROUTER));
};

const getWethContract = (ethereum) => {
  const web3 = getWeb3(ethereum);
  return new web3.eth.Contract(WethBuild.abi, getAddress(WETH));
};

const getZapContract = (ethereum) => {
  const web3 = getWeb3(ethereum);
  return new web3.eth.Contract(HunnyZapBuild.abi, getAddress(HUNNY_ZAP));
};

export const zapTokens = async (
  ethereum,
  account,
  payToken,
  amount,
  receiveToken,
  slippage
) => {
  const value = toBaseUnitBN(amount, payToken.decimals);
  const fromAddress = getAddress(payToken.addresses);
  const toAddress = getAddress(receiveToken.addresses);
  const slippageTolerance = toBaseUnitBN(slippage, 18);

  if (payToken.shortName === TOKENS_ZAP.BNB.shortName) {
    // From BNB to token or to LP
    if (receiveToken.name === TOKENS_ZAP.WBNB.name) {
      // In case, wrap BNB to WBNB
      return await depositWeth(ethereum, account, value);
    } else {
      return await zapIn(
        ethereum,
        account,
        value,
        toAddress,
        slippageTolerance
      );
    }
  } else if (payToken.shortName === TOKENS_ZAP.HUNNY_BNB_FLIP.shortName) {
    // From LP to tokens
    return await zapOut(
      ethereum,
      account,
      fromAddress,
      value,
      slippageTolerance
    );
  } else {
    // From token to token or to LP
    if (
      payToken.name === TOKENS_ZAP.WBNB.name &&
      receiveToken.name === TOKENS_ZAP.BNB.name
    ) {
      // In case, unwrap WBNB to BNB
      return await withdrawWeth(ethereum, account, value);
    } else {
      if (receiveToken.name === TOKENS_ZAP.BNB.name) {
        return await zapOut(
          ethereum,
          account,
          fromAddress,
          value,
          slippageTolerance
        );
      } else {
        return await zapInToken(
          ethereum,
          account,
          fromAddress,
          value,
          toAddress,
          slippageTolerance
        );
      }
    }
  }
};

export const zapIn = async (ethereum, account, value, toAddress, slippage) => {
  try {
    const contract = getZapContract(ethereum);
    const tx = await contract.methods
      .zapIn(toAddress, slippage.toString(10))
      .send({
        from: account,
        to: getAddress(HUNNY_ZAP),
        value: value,
      });
    if (tx && tx.transactionHash) return tx.transactionHash;
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const zapInToken = async (
  ethereum,
  account,
  fromAddress,
  amount,
  toAddress,
  slippage
) => {
  try {
    const contract = getZapContract(ethereum);

    const tx = await contract.methods
      .zapInToken(
        fromAddress,
        amount.toString(10),
        toAddress,
        slippage.toString(10)
      )
      .send({
        from: account,
        to: getAddress(HUNNY_ZAP),
      });

    if (tx && tx.transactionHash) return tx.transactionHash;
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const zapOut = async (
  ethereum,
  account,
  fromAddress,
  amount,
  slippage
) => {
  try {
    const contract = getZapContract(ethereum);
    const tx = await contract.methods
      .zapOut(fromAddress, amount.toString(10), slippage.toString(10))
      .send({
        from: account,
        to: getAddress(HUNNY_ZAP),
      });
    if (tx && tx.transactionHash) return tx.transactionHash;
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const depositWeth = async (ethereum, account, amount) => {
  try {
    const contract = getWethContract(ethereum);
    const tx = await contract.methods.deposit().send({
      from: account,
      to: getAddress(WETH),
      value: amount,
    });
    if (tx && tx.transactionHash) return tx.transactionHash;
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const withdrawWeth = async (ethereum, account, amount) => {
  try {
    const contract = getWethContract(ethereum);
    const tx = await contract.methods.withdraw(amount.toString(10)).send({
      from: account,
      to: getAddress(WETH),
    });
    if (tx && tx.transactionHash) return tx.transactionHash;
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const estimateGasZapIn = async (ethereum, account, toAddress, value) => {
  try {
    const slippageTolerance = toBaseUnitBN(3, 18); // Default is 3%
    const contract = getZapContract(ethereum);
    const gasLimit = await contract.methods
      .zapIn(toAddress, slippageTolerance.toString(10))
      .estimateGas({
        from: account,
        to: getAddress(HUNNY_ZAP),
        value: value,
      });
    let fee = 0;
    if (gasLimit) {
      fee = new BigNumber(gasLimit)
        .multipliedBy(new BigNumber('10'))
        .dividedBy(10 ** 9);
    }
    return fee;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getAmoutsOut = async (amountIn, path, payToken, receiveToken) => {
  const value = toBaseUnitBN(amountIn, payToken.decimals);

  let contract;
  if (
    payToken.name === TOKENS_ZAP.BANANA.name ||
    receiveToken.name === TOKENS_ZAP.BANANA.name
  ) {
    contract = getApeRouterContract(null);
  } else {
    contract = getPancakeRouterContract(null);
  }

  const amounts = await contract.methods
    .getAmountsOut(value.toString(10), path)
    .call();
  return new BigNumber(amounts[1]);
};

export const getLPAmountsOut = async (amountIn, payToken) => {
  let amounts = [];
  const value = toBaseUnitBN(amountIn, 18);

  const token = getPairToken(payToken.name);

  const LPTotalSupply = await getTokenTotalSupply(payToken.addresses);
  const tokenTotalBalance = await getTokenBalance(
    token.token0.addresses,
    getAddress(payToken.addresses)
  );
  const wbnbTotalBalance = await getTokenBalance(
    TOKENS_ZAP.WBNB.addresses,
    getAddress(payToken.addresses)
  );

  const tokenAmount = new BigNumber(value)
    .multipliedBy(tokenTotalBalance)
    .dividedBy(LPTotalSupply);
  const wbnbAmount = new BigNumber(value)
    .multipliedBy(wbnbTotalBalance)
    .dividedBy(LPTotalSupply);
  amounts.push(tokenAmount);
  amounts.push(wbnbAmount);

  return amounts;
};
