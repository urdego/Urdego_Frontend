'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { LoadingOverlay } from './LoadingSpinner.style';
import animationData from '@styles/lottie/loading.json';

interface LoadingSpinnerComponentProps {
  isLocationRegister?: boolean;
}

// 동적 import로 LottieComponent 가져오는 방법으로 변경
const LottieComponent = dynamic(
  () => import('@components/Common/Lottie/LottieComponent'),
  { ssr: false }
);

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
