import React from 'react';
import { Toaster, ToasterProps } from 'react-hot-toast';
import ErrorIcon from '@/styles/Icon/Toast/error';
import { ToastStyles } from './ReadyToast.styles';

interface ReadyToastProps extends Partial<ToasterProps> {
  icon?: React.ReactNode;
  duration?: number;
}

const ReadyToast = ({
  duration = 3000,
  position = 'bottom-center',
  reverseOrder = false,
  ...props
}: ReadyToastProps) => {
  return (
    <>
      <ToastStyles />
      <Toaster
        position={position}
        reverseOrder={reverseOrder}
        toastOptions={{
          className: 'toast',
          duration,
          icon: <ErrorIcon />,
        }}
        {...props}
      />
    </>
  );
};

export default ReadyToast;
