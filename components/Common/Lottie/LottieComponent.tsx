'use client';

import { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';

interface LottiComponentProps {
  animationData: unknown;
}
const LottieComponent = ({ animationData }: LottiComponentProps) => {
  const animationContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!animationContainer.current) return;

    const animation = Lottie.loadAnimation({
      container: animationContainer.current as HTMLDivElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    return () => {
      animation.destroy();
    };
  }, [animationData]);

  return <div ref={animationContainer} />;
};

export default LottieComponent;
