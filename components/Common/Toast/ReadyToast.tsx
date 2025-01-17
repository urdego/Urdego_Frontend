import React from 'react';
import toast from 'react-hot-toast';
import ErrorIcon from '@/styles/Icon/Toast/error';
import { ToastContainer, Message, IconWrapper } from './ReadyToast.styles';

interface ReadyToastProps {
  message: string;
}

const ReadyToast = ({ message }: ReadyToastProps) => (
  <ToastContainer>
    <IconWrapper>
      <ErrorIcon />
    </IconWrapper>
    <Message>{message}</Message>
  </ToastContainer>
);

export const showReadyToast = (message: string) => {
  toast.dismiss(); // 기존 토스트 제거
  toast.custom(<ReadyToast message={message} />, {
    duration: 2000,
    position: 'bottom-center',
    className: 'toast-animate',
    style: {
      animation: 'toast-slide-up 0.3s ease-out',
    },
  });
};

export default ReadyToast;
