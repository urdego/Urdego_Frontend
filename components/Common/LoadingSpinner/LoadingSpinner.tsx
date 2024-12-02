'use client';

import React from 'react';
import Image from 'next/image';
import useLoadingStore from '@/stores/loadingStore';
import LoadingSpinner from '@/styles/Icon/LoadingSpinner.gif';
import { LoadingOverlay, SpinnerWrapper } from './LoadingSpinner.style';

const LoadingSpinnerComponent: React.FC = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);

  if (!isLoading) return null;

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
