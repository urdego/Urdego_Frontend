import {
  ContentHeader,
  ContentContainer,
  NoContentText,
  IntersectionObserverArea,
} from './ContentsBottomSheet.styles';
import LocationList from '@/components/Layout/Contents/Contents';
import useGetInfiniteLocationList from '@/hooks/contents/useGetInfiniteContents';
import useIntersectionObserver from '@/hooks/contents/useIntersectionObserver';
import BottomSheet from './BottomSheet';
import DotLoadingSpinner from '../LoadingSpinner/DotLoadingSpinner';

interface LocationListBottomSheetProps {
  setLocationListVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContentsBottomSheet = ({
  setLocationListVisible,
}: LocationListBottomSheetProps) => {
  // 무한 스크롤 로직
  const {
    locationList,
    setLocationList,
    isLoading,
    isLoadMore,
    fetchLocationList,
  } = useGetInfiniteLocationList();
  const targetElementRef = useIntersectionObserver({
    handleIntersect: () => {
      fetchLocationList();
    },
  });

  return (
    <>
      <BottomSheet setIsOpen={setLocationListVisible}>
        <ContentHeader>올린 장소 ({locationList.length})</ContentHeader>
        <ContentContainer>
          {locationList.map((location, index) => (
            <LocationList
              key={`key+${index}`}
              location={location}
              setLocationList={setLocationList}
            />
          ))}
          {isLoading && <DotLoadingSpinner />}
          {!isLoading && isLoadMore && (
            <IntersectionObserverArea ref={targetElementRef} />
          )}
          {!isLoadMore && locationList.length === 0 && (
            <NoContentText>
              올린 장소가 없습니다. 장소를 등록해주세요! 😊
            </NoContentText>
          )}
        </ContentContainer>
      </BottomSheet>
    </>
  );
};

export default ContentsBottomSheet;
