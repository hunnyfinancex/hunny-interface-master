import React from 'react';
import {useState } from 'react';
import { HunnyToast } from '../modules/toastify';
import { SuccessTransactionDisplay } from '../components/ToastContent/ToastSuccessTransaction';
import { PendingTransactionDisplay } from '../components/ToastContent/ToastPendingTransaction';

const EXECUTE_TIMEOUT = 30000;

const useExecute = () => {
  const [isPending, setIsPending] = useState(false);

  const showPendingNotify = () => {
    return HunnyToast.showPendingToast(() => <PendingTransactionDisplay />, EXECUTE_TIMEOUT);
  };

  const execute = async (
    request: Promise<string>,
    callBack?: (hash: string) => void
  ): Promise<void> => {
    setIsPending(true);
    const toastId = showPendingNotify();
    let isExpiredTime = false;
    
    const timeOut = setTimeout(()=>{
      isExpiredTime = true;
      if (callBack) {
        callBack('');
      }
      HunnyToast.dismiss(toastId);
      HunnyToast.show('Please check and confirm transaction in your wallet app.');
      setIsPending(false);
    }, EXECUTE_TIMEOUT)

    const hash = await request;

    if(isExpiredTime){
      if (hash) {
        HunnyToast.show(() => <SuccessTransactionDisplay hash={ hash } />);
        callBack(hash);
      }
      return;
    }
    
    clearTimeout(timeOut);

    if (callBack) {
      callBack(hash);
    }

    HunnyToast.dismiss(toastId);
    if (hash) {
      HunnyToast.show(() => <SuccessTransactionDisplay hash={ hash } />);
    }

    setIsPending(false);
  };

  const executeRequest = (
    request: Promise<string>,
    callBack?: (hash: string) => void)=>{
    execute(request, callBack);
  }

  return {
    isPending,
    executeRequest
  }

};


export default useExecute;
