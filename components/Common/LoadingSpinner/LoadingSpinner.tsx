'use client';

import React from 'react';
import Image from 'next/image';
import LoadingSpinner from '@/styles/Icon/LoadingSpinner.gif';
import { LoadingOverlay, SpinnerWrapper } from './LoadingSpinner.style';

const LoadingSpinnerComponent: React.FC = () => {
  return (
    <LoadingOverlay>
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
