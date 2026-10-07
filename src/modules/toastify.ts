import React from 'react';
import { toast, ToastOptions } from 'react-toastify';
import { grey, purple, red } from '../theme/colors';

const toastContainerStyle = {
  backgroundColor: 'rgba(2,12,32,0.9)',
  border: `1px solid ${purple[100]}`,
  borderRadius: `5px`,
  color: grey[300],
};

const toastErrorContainerStyle = {
  ...toastContainerStyle,
  border: `1px solid ${red[900]}`,
  fontWeight: 'bold',
  color: red[900],
  backgroundColor: '#402b28',
};

const toastProcessStyle = {
  height: '3px',
  background:
    'linear-gradient(89.92deg, #F3C622 2.1%, rgba(255, 38, 194, 0.78) 102.54%)',
};

function _showToast(
  content: string | React.FC,
  config?: ToastOptions,
  isError = false
) {
  return toast(content, {
    style: isError ? toastErrorContainerStyle : toastContainerStyle,
    progressStyle: toastProcessStyle,
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    ...config,
  });
}

export const HunnyToast = {
  show: (content: string | React.FC, config?: ToastOptions) => {
    return _showToast(content, config);
  },
  error: (content: string | React.FC, config?: ToastOptions) => {
    return _showToast(`❌ ${content}`, config, true);
  },
  dismiss: (toastId: React.ReactText) => {
    toast.dismiss(toastId);
  },
  showInfinityToast: (content: string | React.FC) =>
    _showToast(content, {
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
    }),
  showPendingToast: (content: string | React.FC, duration: number) =>
    _showToast(content, {
      closeOnClick: false,
      closeButton: false,
      autoClose: duration,
    }),
};
