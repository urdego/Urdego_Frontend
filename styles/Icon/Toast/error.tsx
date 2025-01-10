import React from 'react';
import Image from 'next/image';
import errorIcon from '@/styles/Icon/Toast/error.svg';

const ErrorIcon = () => {
  return <Image src={errorIcon} alt="error" />;
};

export default ErrorIcon;
