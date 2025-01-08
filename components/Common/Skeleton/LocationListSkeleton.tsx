import {
  LocationContainer,
  LocationImageContainer,
  LocationListWrapper,
} from '@/components/Layout/Home/LocationList/LocationList.styles';
import Skeleton from './Skeleton';

const LocationListSkeleton = () => {
  return (
    <LocationListWrapper>
      <LocationImageContainer>
        <Skeleton width={48} height={48} />
      </LocationImageContainer>
      <LocationContainer>
        <Skeleton width={202} height={20} />
        <Skeleton width={202} height={20} />
      </LocationContainer>
    </LocationListWrapper>
  );
};

export default LocationListSkeleton;
