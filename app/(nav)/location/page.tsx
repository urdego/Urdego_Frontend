'use client';

import { LocationPageWrapper } from '@/app/commonPage.styles';
import DotLoadingSpinner from '@/components/Common/LoadingSpinner/DotLoadingSpinner';
import TopBar from '@/components/Common/TopBar/TopBar';
import LocationList from '@/components/Layout/Home/LocationList/LocationList';
import useGetInfiniteLocationList from '@/hooks/locationList/useGetInfiniteLocationList';
import useIntersectionObserver from '@/hooks/locationList/useIntersectionObserver';
import {
  IntersectionObserverArea,
  NoContentText,
  LocationContent,
  LocationHeader,
  LocationLayout,
  InHeader,
} from './Location.styles';
import LocationSearchBox from '@/components/Layout/Location/LocationSearchBox';
import LocationSearchModal from '@/components/Layout/Location/LocationSearchModal';
import { useState } from 'react';
import Link from 'next/link';

const LocationPage = () => {
  // 무한 스크롤 로직
  const { locationList, totalCount, isLoading, isLoadMore, fetchLocationList } =
    useGetInfiniteLocationList();
  const targetElementRef = useIntersectionObserver({
    handleIntersect: () => {
      fetchLocationList();
    },
  });

  // 모달 로직
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <TopBar NavType="default" label="등록한 장소" />
      <LocationPageWrapper>
        <LocationLayout>
          <LocationHeader>
            <p>총 {totalCount}곳</p>
            <InHeader>
              <p>등록순</p>
              <p>&middot;</p>
              <p>최신순</p>
            </InHeader>
            <p>편집</p>
          </LocationHeader>
          <LocationSearchBox onClick={() => setIsModalOpen(true)} />
          <LocationContent>
            {locationList.map((location, index) => (
              <Link
                href={`/location/update/${location.contentId}`}
                key={`key+${index}`}
              >
                <LocationList location={location} />
              </Link>
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
          </LocationContent>
        </LocationLayout>
      </LocationPageWrapper>
      {isModalOpen && <LocationSearchModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
};

export default LocationPage;
