'use client';

import React from 'react';
import Image from 'next/image';
import LoadingSpinner from '@/styles/Icon/LoadingSpinner.gif';
import { LoadingOverlay, SpinnerWrapper } from './LoadingSpinner.style';

interface LoadingSpinnerComponentProps {
  isLocationRegister?: boolean;
}

const LoadingSpinnerComponent: React.FC<LoadingSpinnerComponentProps> = ({
  isLocationRegister = false,
}) => {
  return (
    <LoadingOverlay $isLocationRegister={isLocationRegister}>
      <SpinnerWrapper>
        <Image
          src={LoadingSpinner}
          alt="로딩 중..."
          width={185}
          height={185}
          priority
        />
      </SpinnerWrapper>
    </LoadingOverlay>
  );
};

export default LoadingSpinnerComponent;
