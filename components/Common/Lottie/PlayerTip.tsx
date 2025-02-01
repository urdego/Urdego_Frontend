import dynamic from 'next/dynamic';
import animationData from '@styles/lottie/tip.json';

const LottieComponent = dynamic(
  () => import('@components/Common/Lottie/LottieComponent'),
  { ssr: false }
);

const PlayerTip = () => {
  return <LottieComponent animationData={animationData} />;
};

export default PlayerTip;
