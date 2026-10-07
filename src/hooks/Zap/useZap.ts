import { useEffect } from 'react';
import { useWallet } from 'use-wallet';
import { useAppDispatch } from '../../state';
import { fetchTokenBalance } from '../../state/zap';


export const useZap = () => {
  const { account } = useWallet();

  const dispatch = useAppDispatch();

  // fetch curent round
  useEffect(() => {
    const fetch = async () => {
      dispatch(fetchTokenBalance(account));
    };

    fetch();
    const interval = setInterval(fetch, 30000);
    return () => clearInterval(interval);
  }, [account]);

};
