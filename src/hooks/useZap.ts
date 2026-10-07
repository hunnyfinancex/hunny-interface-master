import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import useRefresh from './useRefresh';
import { useWallet } from 'use-wallet';
import { getBalance, getTokenAllowance, getTokenBalance } from '../modules/infura';
import { getAddress } from '../modules/utils';
import { TokenDisplay } from '../modules/models/tokenDisplay.model';
import { TOKENS_ZAP } from '../constants/tokens';

export const useGetTokenAllowance = (token: TokenDisplay, owner: string, spender: string) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account } = useWallet();
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchAllowance = async (token: TokenDisplay) => {
      if (token.name !== TOKENS_ZAP.BNB.name) {
        const res = await getTokenAllowance(token.addresses, owner, spender);
        setAllowance(new BigNumber(res));
      }
    }

    if (account && token) {
      fetchAllowance(token);
    }

  }, [account, token, fastRefresh])

  return allowance;
}

export const useGetTokenBalance = (token: TokenDisplay) => {
  const [balance, setBalance] = useState(new BigNumber(0));
  const { account } = useWallet();
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    const fetchBalance = async () => {
      if (token.name === TOKENS_ZAP.BNB.name) {
        const res = await getBalance(account);
        setBalance(new BigNumber(res));
      } else {
        const res = await getTokenBalance(token.addresses, account);
        setBalance(new BigNumber(res));
      }
    }
    if (account && token) {
      fetchBalance()
    }
  }, [account, token, fastRefresh])

  return balance;
}