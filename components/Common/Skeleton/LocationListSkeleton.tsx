import {
  SkeletonLocationContainer,
  LocationImageContainer,
  LocationListWrapper,
} from '@/components/Layout/Contents/Contents.styles';
import Skeleton from './Skeleton';

const LocationListSkeleton = () => {
  return (
    <LocationListWrapper>
      <LocationImageContainer>
        <Skeleton width={48} height={48} />
      </LocationImageContainer>
      <SkeletonLocationContainer>
        <Skeleton width={202} height={20} />
        <Skeleton width={202} height={20} />
      </SkeletonLocationContainer>
    </LocationListWrapper>
  );
};

export default LocationListSkeleton;
