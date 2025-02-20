'use client';

import { ContentPageWrapper } from '@/app/commonPage.styles';
import DotLoadingSpinner from '@/components/Common/LoadingSpinner/DotLoadingSpinner';
import TopBar from '@/components/Common/TopBar/TopBar';
import LocationList from '@/components/Layout/Contents/Contents';
import useGetInfiniteContents from '@/hooks/contents/useGetInfiniteContents';
import useIntersectionObserver from '@/hooks/contents/useIntersectionObserver';
import {
  IntersectionObserverArea,
  NoContentText,
  LocationContent,
  LocationHeader,
  LocationLayout,
  SortHeader,
  SortText,
  TextHeader,
} from './Contents.styles';
import LocationSearchBox from '@/components/Layout/Contents/ContentSearchInput';
import LocationSearchModal from '@/components/Layout/Contents/ContentSearchModal';
import { useEffect, useRef, useState } from 'react';
import useControlScroll from '@/hooks/modal/useControlScroll';

const ContentsPage = () => {
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
  } = useGetInfiniteContents(sortType);
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

  const handleResetSortType = (newSortType: 'oldest' | 'recent') => {
    if (sortType !== newSortType) {
      initLocationList();
      setSortType(newSortType);
    }
  };

  // 모달 로직
  const [isModalOpen, setIsModalOpen] = useState(false);
  useControlScroll({ isModalOpen });
  return (
    <>
      <TopBar NavType="default" label="등록한 장소" />
      <ContentPageWrapper>
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
      </ContentPageWrapper>
      {isModalOpen && <LocationSearchModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
};

export default ContentsPage;
