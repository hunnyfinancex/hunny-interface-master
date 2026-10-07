import HunnyPresale from './abis/HunnyPresale.json';
import HunnyToken from './abis/HunnyToken.json';
import ERC20 from './abis/ERC20.json';

import { getAddress } from './utils';
import { PRESALE_CONTRACTS } from '../constants/contracts';
import BigNumber from 'bignumber.js';
import { getPublicProvider } from './utils';
import { TOKENS } from '../constants/tokens';

/*
 * Web3 utilities
 *
 */

const getWeb3 = () => {
  return getPublicProvider();
};

const getErc20Contract = (addresses) => {
  const web3 = getWeb3();
  return new web3.eth.Contract(ERC20.abi, getAddress(addresses));
};

export const getHunnyTokenContract = () => {
  const web3 = getWeb3();
  return new web3.eth.Contract(
    HunnyToken.abi,
    getAddress(TOKENS.HUNNY.addresses)
  );
};

const getHunnyPresaleContract = () => {
  const web3 = getWeb3();
  return new web3.eth.Contract(HunnyPresale.abi, getAddress(PRESALE_CONTRACTS));
};

export const getBalance = async (address) => {
  const web3 = getWeb3();
  const balance = await web3.eth.getBalance(address);
  return new BigNumber(balance);
};

/*
 * ERC20 utilities
 *
 */

export const getTokenAllowance = async (tokenAddresses, owner, spender) => {
  if (!getAddress(tokenAddresses)) {
    return new BigNumber(1);
  }

  const contract = getErc20Contract(tokenAddresses);
  const allowance = await contract.methods.allowance(owner, spender).call();
  return new BigNumber(allowance);
};

export const getTokenBalance = async (tokenAddresses, account) => {
  if (!getAddress(tokenAddresses)) {
    return getBalance(account);
  }
  const contract = getErc20Contract(tokenAddresses);
  const balance = await contract.methods.balanceOf(account).call();
  return new BigNumber(balance);
};

export const getTokenTotalSupply = async (tokenAddresses) => {
  const contract = getErc20Contract(tokenAddresses);
  const balance = await contract.methods.totalSupply().call();
  return new BigNumber(balance);
};

/*
 * HUNNY utilities
 *
 */

export const getPresaleBalanceOf = async (account) => {
  const contract = getHunnyPresaleContract();
  const balance = await contract.methods.balanceOf(account).call();
  return new BigNumber(balance);
};

export const getPresaleAvailableOf = async (account) => {
  const contract = getHunnyPresaleContract();
  const available = await contract.methods.availableOf(account).call();
  return new BigNumber(available);
};

export const getPresaleTotalBalance = async () => {
  const contract = getHunnyPresaleContract();
  const balance = await contract.methods.totalBalance().call();
  return new BigNumber(balance);
};

export const getPresaleBalance = async () => {
  const contract = getHunnyPresaleContract();
  const balance = await contract.methods.totalBalance().call();
  return new BigNumber(balance);
};
