import {
  ContentHeader,
  ContentContainer,
  NoContentText,
  IntersectionObserverArea,
  LoadingText,
} from './LocationListBottomSheet.styles';
import LocationList from '@/components/Layout/Home/LocationList/LocationList';
import useGetInfiniteLocationList from '@/hooks/locationList/useGetInfiniteLocationList';
import useIntersectionObserver from '@/hooks/locationList/useIntersectionObserver';
import BottomSheet from './BottomSheet';

interface LocationListBottomSheetProps {
  setLocationListVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const LocationListBottomSheet = ({
  setLocationListVisible,
}: LocationListBottomSheetProps) => {
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
      <BottomSheet setIsOpen={setLocationListVisible}>
        <ContentHeader>올린 장소 ({totalCount})</ContentHeader>
        <ContentContainer>
          {locationList.map((location, index) => (
            <LocationList key={`key+${index}`} location={location} />
          ))}
          {isLoading && <LoadingText>장소를 불러오는중...🔍</LoadingText>}
          {!isLoading && !isInitialLoad && isLoadMore && (
            <IntersectionObserverArea ref={targetElementRef} />
          )}
          {!isInitialLoad && locationList.length === 0 && (
            <NoContentText>
              올린 장소가 없습니다. 장소를 등록해주세요! 😊
            </NoContentText>
          )}
        </ContentContainer>
      </BottomSheet>
    </>
  );
};

export default LocationListBottomSheet;
