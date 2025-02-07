import { useState, useEffect, useRef } from 'react';
import {
  BackgroundOverlay,
  BottomSheet,
  HeaderWrapper,
  HeaderHandler,
  HeaderTitle,
  ContentWrapper,
  GridContainer,
  GridItem,
  SelectNumber,
  TitleContainer,
  LocationName,
  SelectIndicator,
} from '@/components/Layout/AddContents/AddContents.styles';
import useGetInfiniteLocationList from '@/hooks/locationList/useGetInfiniteLocationList';
import Image from 'next/image';
import SearchBar from '@/components/Common/SearchBar/SearchBar';

interface AddContentsProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
}

const AddContents = ({ isVisible, setIsVisible, title }: AddContentsProps) => {
  const [isExpand, setIsExpand] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState(''); // ✅ 검색어 상태 유지
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    locationList: contents,
    fetchLocationList,
    isLoading,
    isLoadMore,
  } = useGetInfiniteLocationList();

  const isInitialLoad = contents.length === 0;
  const isFetched = useRef(false);

  useEffect(() => {
    const currentRef = contentRef.current;

    const handleScroll = () => {
      if (currentRef) {
        const { scrollTop, scrollHeight, clientHeight } = currentRef;
        if (
          scrollHeight - scrollTop <= clientHeight + 1 &&
          !isLoading &&
          isLoadMore
        ) {
          fetchLocationList();
        }
      }
    };

    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isLoading, isLoadMore, fetchLocationList]);

  useEffect(() => {
    if (isVisible && contents.length === 0 && !isFetched.current) {
      isFetched.current = true;
      fetchLocationList();
    }
  }, [isVisible, contents.length, fetchLocationList]);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsExpand(false);
      setIsVisible(false);
    }
  };

  const handleLocationSelect = (id: number) => {
    setSelectedLocations((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : prev.length < 5
          ? [...prev, id]
          : prev
    );
  };

  const getLocationNumber = (id: number) => {
    return selectedLocations.indexOf(id) + 1;
  };

  // 검색어를 적용한 결과 목록
  const filteredContents = contents.filter((content) =>
    content.contentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCancelClick = () => {
    setIsExpand(false);
    setIsVisible(false);
  };

  const renderGridItems = () => {
    return filteredContents.map((content) => (
      <GridItem
        key={content.contentId}
        onClick={() => handleLocationSelect(content.contentId)}
      >
        <Image
          src={content.url}
          alt={content.contentName}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
        <SelectIndicator
          selected={selectedLocations.includes(content.contentId)}
        >
          {selectedLocations.includes(content.contentId) && (
            <SelectNumber>{getLocationNumber(content.contentId)}</SelectNumber>
          )}
        </SelectIndicator>
        <LocationName>{content.contentName}</LocationName>
      </GridItem>
    ));
  };

  if (!isVisible) return null;

  return (
    <BackgroundOverlay onClick={handleBackgroundClick}>
      <BottomSheet
        $isExpand={isExpand}
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        exit={{ y: '100%' }}
        transition={{ type: 'tween' }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(event, info) => {
          const isScrollToBottom = info.delta.y > 5 || info.offset.y > 150;
          if (isScrollToBottom) {
            setIsExpand(false);
            setIsVisible(false);
          } else {
            setIsExpand(true);
          }
        }}
      >
        <HeaderWrapper>
          <HeaderHandler />
          <TitleContainer>
            <span onClick={handleCancelClick}>닫기</span>
            {title && <HeaderTitle>{title}</HeaderTitle>}
            <span>선택완료</span>
          </TitleContainer>
          {/* ✅ 검색어를 유지한 상태에서 검색 가능 */}
          <SearchBar onSearch={setSearchQuery} initialQuery={searchQuery} />
        </HeaderWrapper>
        <ContentWrapper ref={contentRef}>
          <GridContainer>
            {isInitialLoad && <div>Loading...</div>}
            {renderGridItems()}
          </GridContainer>
        </ContentWrapper>
      </BottomSheet>
    </BackgroundOverlay>
  );
};

export default AddContents;
