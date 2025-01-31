'use client';

import React from 'react';
import { LoadingOverlay } from './LoadingSpinner.style';
import LottieComponent from '@/components/Common/Lottie/LottieComponent';
import animationData from '@styles/lottie/loading.json';

interface LoadingSpinnerComponentProps {
  isLocationRegister?: boolean;
}

const LoadingSpinnerComponent: React.FC<LoadingSpinnerComponentProps> = ({
  isLocationRegister = false,
}) => {
  return (
    <LoadingOverlay $isLocationRegister={isLocationRegister}>
      <LottieComponent animationData={animationData} />
    </LoadingOverlay>
  );
};

export default LoadingSpinnerComponent;
