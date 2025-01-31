import Image from 'next/image';
import {
  LocationListWrapper,
  LocationImageContainer,
  LocationContainer,
  LocationTitle,
  LocationDetail,
  SkeletonLocationContainer,
} from './LocationList.styles';
import Skeleton from '@/components/Common/Skeleton/Skeleton';
import { useState } from 'react';

interface LocationListProps {
  location: { contentName: string; address: string; url: string };
}

const LocationList = ({ location }: LocationListProps) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <LocationListWrapper>
      <LocationImageContainer>
        {isLoading ? <Skeleton width={48} height={48} /> : null}
        <Image
          src={location?.url}
          alt="Location Image"
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 430px) 100vw"
          onLoad={() => setIsLoading(false)}
        />
      </LocationImageContainer>
      {isLoading ? (
        <SkeletonLocationContainer>
          <Skeleton width={330} height={20} />
          <Skeleton width={330} height={20} />
        </SkeletonLocationContainer>
      ) : (
        <LocationContainer>
          <LocationTitle>{location?.contentName}</LocationTitle>
          <LocationDetail>{location?.address}</LocationDetail>
        </LocationContainer>
      )}
    </LocationListWrapper>
  );
};

export default LocationList;
