import { SkeletonWrapper, Shimmer } from './Skeleton.styles';

interface ImageSkeletonProps {
  width: number | string;
  height: number;
}

const Skeleton = ({ width, height }: ImageSkeletonProps) => {
  return (
    <SkeletonWrapper width={width} height={height}>
      <Shimmer />
    </SkeletonWrapper>
  );
};

export default Skeleton;
