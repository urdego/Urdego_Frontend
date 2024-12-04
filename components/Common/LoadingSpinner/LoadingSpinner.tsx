'use client';

import React from 'react';
import Image from 'next/image';
import LoadingSpinnerGif from '@/styles/Icon/LoadingSpinner.gif';
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
          src={LoadingSpinnerGif}
          alt="로딩 중..."
          width={185}
          height={185}
          loading="lazy"
        />
      </SpinnerWrapper>
    </LoadingOverlay>
  );
};

export default LoadingSpinnerComponent;
