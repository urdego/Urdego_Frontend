import Image from 'next/image';
import {
  LocationListWrapper,
  LocationImageContainer,
  LocationContainer,
  LocationTitle,
  LocationDetail,
  SkeletonLocationContainer,
  IconContainer,
  ScrollWapper,
} from './Contents.styles';
import Skeleton from '@/components/Common/Skeleton/Skeleton';
import { useState } from 'react';
import useScrollDetech from '@/hooks/contents/useScrollDetech';
import { DeleteIcon } from './ContentIcon';
import { Location } from '@/hooks/contents/useGetInfiniteContents';
import useDeleteLocation from '@/hooks/contents/useDeleteContent';

interface LocationListProps {
  location: Location;
  setLocationList: React.Dispatch<React.SetStateAction<Location[]>>;
}

const Contents = ({ location, setLocationList }: LocationListProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    scrollRef,
    isSwipe,
    setIsSwipe,
    handleScrollStart,
    handleScrollMove,
    handleScrollEnd,
  } = useScrollDetech();
  const { handleDeleteLocation } = useDeleteLocation({
    contentId: location.contentId,
    setLocationList,
    setIsSwipe,
  });

  return (
    <ScrollWapper>
      <LocationListWrapper
        $isSwipe={isSwipe}
        ref={scrollRef}
        onTouchStart={handleScrollStart}
        onTouchMove={handleScrollMove}
        onTouchEnd={handleScrollEnd}
        onMouseDown={handleScrollStart}
        onMouseMove={handleScrollMove}
        onMouseUp={handleScrollEnd}
        style={{ touchAction: 'none' }}
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
      </LocationListWrapper>
      {isSwipe !== 0 && (
        <IconContainer onClick={handleDeleteLocation}>
          <DeleteIcon />
        </IconContainer>
      )}
    </ScrollWapper>
  );
};

export default Contents;
