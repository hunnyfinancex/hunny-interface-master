import Web3 from 'web3';

import HunnyPresale from './abis/HunnyPresale.json';
import ERC20 from './abis/ERC20.json';

import { getAddress } from './utils';
import { UINT256_MAX } from '../constants/values';
import { PRESALE_CONTRACTS } from '../constants/contracts';
import { toBaseUnitBN } from './number';
import BigNumber from 'bignumber.js';

const getWeb3 = (ethereum) => {
  return new Web3(ethereum);
};

const getHunnyPresaleContract = (ethereum) => {
  const web3 = getWeb3(ethereum);
  return new web3.eth.Contract(HunnyPresale.abi, getAddress(PRESALE_CONTRACTS));
};

const getErc20Contract = (ethereum, tokenAddresses) => {
  const web3 = getWeb3(ethereum);
  return new web3.eth.Contract(ERC20.abi, getAddress(tokenAddresses));
};


/* ERC20 utilities */
export const approve = async (ethereum, tokenAddresses, owner, spender) => {
  const contract = getErc20Contract(ethereum, tokenAddresses);
  try {
    const tx = await contract.methods.approve(spender, UINT256_MAX).send({
      from: owner,
      to: contract.options.address,
    });
    if (tx && tx.transactionHash) return tx.transactionHash;
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

/* HUNNY utilities */

export const sendPresaleDeposit = async (
  ethereum,
  account,
  balance,
  amount
) => {
  const contract = getHunnyPresaleContract(ethereum);
  const GAS_LIMIT = 800000; // safe gas
  const GAS_PRICE = 10000000000; // 10 gwei
  let depositAmount = toBaseUnitBN(new BigNumber(amount), 18);
  try {
    if (balance.lte(toBaseUnitBN(new BigNumber(amount), 18))) {
      // user send all balance
      const feeAmount = new BigNumber(GAS_PRICE).multipliedBy(
        new BigNumber(GAS_LIMIT)
      );
      depositAmount = balance.minus(feeAmount);

      const tx = await contract.methods.deposit().send({
        from: account,
        gasLimit: GAS_LIMIT,
        gasPrice: GAS_PRICE,
        to: contract.options.address,
        value: depositAmount.toString(10),
      });
      if (tx && tx.transactionHash) return tx.transactionHash;
      return null;
    } else {
      const tx = await contract.methods.deposit().send({
        from: account,
        to: contract.options.address,
        value: depositAmount.toString(10),
      });
      if (tx && tx.transactionHash) return tx.transactionHash;
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

