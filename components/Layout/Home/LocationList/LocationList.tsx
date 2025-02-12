import Image from 'next/image';
import {
  LocationListWrapper,
  LocationImageContainer,
  LocationContainer,
  LocationTitle,
  LocationDetail,
  SkeletonLocationContainer,
  IconContainer,
} from './LocationList.styles';
import Skeleton from '@/components/Common/Skeleton/Skeleton';
import { useState } from 'react';
import useScrollDetech from '@/hooks/locationList/useScrollDetech';
import { DeleteIcon } from '../../Location/ContentIcon';

interface LocationListProps {
  location: { contentName: string; address: string; url: string };
}

const LocationList = ({ location }: LocationListProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollRef, isSwipe, handleDragStart, handleDragMove, handleDragEnd } =
    useScrollDetech();
  return (
    <LocationListWrapper
      $isSwipe={isSwipe}
      ref={scrollRef}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
    >
      <LocationImageContainer>
        {isLoading ? <Skeleton width={48} height={48} /> : null}
        <Image
          src={location?.url}
          alt="Location Image"
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 430px) 100vw"
          priority={true}
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
      {isSwipe !== 0 && (
        <IconContainer>
          <DeleteIcon />
        </IconContainer>
      )}
    </LocationListWrapper>
  );
};

export default LocationList;
