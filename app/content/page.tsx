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
  SortHeader,
  SortText,
  TextHeader,
} from './Location.styles';
import LocationSearchBox from '@/components/Layout/Location/LocationSearchBox';
import LocationSearchModal from '@/components/Layout/Location/LocationSearchModal';
import { useEffect, useRef, useState } from 'react';
import useControlScroll from '@/hooks/modal/useControlScroll';

const LocationPage = () => {
  const [sortType, setSortType] = useState<'oldest' | 'recent'>('oldest');
  const isInitialMount = useRef(true);

  // 무한 스크롤 로직
  const {
    locationList,
    setLocationList,
    isLoading,
    isLoadMore,
    fetchLocationList,
    initLocationList,
  } = useGetInfiniteLocationList(sortType);
  const targetElementRef = useIntersectionObserver({
    handleIntersect: () => {
      fetchLocationList();
    },
  });

  // 컨텐츠 재로딩 로직
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    initLocationList();
    fetchLocationList();
  }, [sortType]);
  const handleResetSortType = (sortType: 'oldest' | 'recent') => {
    initLocationList();
    setSortType(sortType);
  };

  // 모달 로직
  const [isModalOpen, setIsModalOpen] = useState(false);
  useControlScroll({ isModalOpen });
  return (
    <>
      <TopBar NavType="default" label="등록한 장소" />
      <LocationPageWrapper>
        <LocationLayout>
          <LocationHeader>
            <TextHeader>
              <p>총 {locationList.length}곳</p>
              <SortHeader>
                <SortText
                  $isActive={sortType === 'oldest'}
                  onClick={() => handleResetSortType('oldest')}
                >
                  등록순
                </SortText>
                <p>&middot;</p>
                <SortText
                  $isActive={sortType === 'recent'}
                  onClick={() => handleResetSortType('recent')}
                >
                  최신순
                </SortText>
              </SortHeader>
            </TextHeader>
            <LocationSearchBox onClick={() => setIsModalOpen(true)} />
          </LocationHeader>
          <LocationContent>
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
            {!isLoading && !isLoadMore && locationList.length === 0 && (
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
