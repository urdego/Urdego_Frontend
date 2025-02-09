import { PageWrapper } from '@/app/commonPage.styles';
import DotLoadingSpinner from '@/components/Common/LoadingSpinner/DotLoadingSpinner';
import TopBar from '@/components/Common/TopBar/TopBar';
import LocationList from '@/components/Layout/Home/LocationList/LocationList';
import useGetInfiniteLocationList from '@/hooks/locationList/useGetInfiniteLocationList';
import useIntersectionObserver from '@/hooks/locationList/useIntersectionObserver';
import { IntersectionObserverArea, NoContentText } from './Location.styles';

const PlacePage = () => {
  // 무한 스크롤 로직
  const { locationList, totalCount, isLoading, isLoadMore, fetchLocationList } =
    useGetInfiniteLocationList();
  const targetElementRef = useIntersectionObserver({
    handleIntersect: () => {
      fetchLocationList();
    },
  });
  return (
    <>
      <TopBar NavType="default" label="등록한 장소" />
      <PageWrapper>
        {locationList.map((location, index) => (
          <LocationList key={`key+${index}`} location={location} />
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
      </PageWrapper>
    </>
  );
};

export default PlacePage;
