import { useState } from 'react';
import {
  BackgroundOverlay,
  BottomSheet,
  ContentHeader,
  ContentContainer,
  ContentWrapper,
  HeaderWrapper,
  HeaderHandler,
  NoContentText,
  IntersectionObserverArea,
  LoadingText,
} from './LocationListBottomSheet.styles';
import LocationList from '@/components/Layout/Home/LocationList/LocationList';
import useGetInfiniteLocationList from '@/hooks/locationList/useGetInfiniteLocationList';
import useIntersectionObserver from '@/hooks/locationList/useIntersectionObserver';

interface LocationListBottomSheetProps {
  setLocationListVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const LocationListBottomSheet = ({
  setLocationListVisible,
}: LocationListBottomSheetProps) => {
  // bottomSheet 최대 영역 확인하는 로직
  const [isExpand, setIsExpand] = useState(false);

  // 무한 스크롤 로직
  const {
    locationList,
    totalCount,
    isInitialLoad,
    isLoading,
    isLoadMore,
    loadMore,
  } = useGetInfiniteLocationList();
  const targetElementRef = useIntersectionObserver({
    handleIntersect: () => {
      loadMore();
    },
  });

  return (
    <>
      <>
        <BackgroundOverlay initial={{ x: '-50%' }} />
        <BottomSheet
          $isExpand={isExpand}
          initial={{ x: '-50%' }}
          animate={{ y: '0%' }}
          exit={{ y: '100%' }}
          transition={{ type: 'tween' }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={(event, info) => {
            const isScrollToBottom = info.delta.y > 5 || info.offset.y > 150;
            if (isScrollToBottom) {
              // 스크롤 아래로 내리는 경우
              setIsExpand(false);
              setLocationListVisible(false);
            } else {
              // 스크롤 위로 올리는 경우
              setIsExpand(true);
            }
          }}
        >
          <HeaderWrapper>
            <HeaderHandler />
          </HeaderWrapper>
          <ContentWrapper>
            <ContentHeader>올린 장소 ({totalCount})</ContentHeader>
            <ContentContainer $isExpand={isExpand}>
              {locationList.map((location, index) => (
                <LocationList key={`key+${index}`} location={location} />
              ))}
              {isLoading && <LoadingText>장소를 불러오는중...🔍</LoadingText>}
              {!isLoading && !isInitialLoad && isLoadMore && (
                <IntersectionObserverArea ref={targetElementRef} />
              )}
              {!isInitialLoad && locationList.length === 0 && (
                <NoContentText $isExpand={isExpand}>
                  올린 장소가 없습니다. 장소를 등록해주세요! 😊
                </NoContentText>
              )}
            </ContentContainer>
          </ContentWrapper>
        </BottomSheet>
      </>
    </>
  );
};

export default LocationListBottomSheet;
