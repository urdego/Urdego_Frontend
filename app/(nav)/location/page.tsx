import { PageWrapper } from '@/app/commonPage.styles';
import TopBar from '@/components/Common/TopBar/TopBar';
import useGetInfiniteLocationList from '@/hooks/locationList/useGetInfiniteLocationList';
import useIntersectionObserver from '@/hooks/locationList/useIntersectionObserver';

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
      <PageWrapper></PageWrapper>
    </>
  );
};

export default PlacePage;
