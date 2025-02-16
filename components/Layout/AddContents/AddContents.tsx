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
  CloseButton,
  LoadingWrapper,
} from '@/components/Layout/AddContents/AddContents.styles';
import useGetInfiniteLocationList from '@/hooks/contents/useGetInfiniteContents';
import Image from 'next/image';
import SearchBar from '@/components/Common/SearchBar/SearchBar';
import AlertModal from '@/components/Common/AlertModal/AlertModal';

interface AddContentsProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
}

const AddContents = ({ isVisible, setIsVisible, title }: AddContentsProps) => {
  const [isExpand, setIsExpand] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
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
    setSelectedLocations((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      } else if (prev.length < 5) {
        return [...prev, id];
      } else {
        setIsAlertOpen(true);
        return prev;
      }
    });
  };

  const getLocationNumber = (id: number) => {
    return selectedLocations.indexOf(id) + 1;
  };

  const filteredContents = contents.filter((content) =>
    content.contentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCancelClick = () => {
    setIsExpand(false);
    setIsVisible(false);
  };

  const LoadingIndicator = () => {
    return <LoadingWrapper>불러오는 중입니다...</LoadingWrapper>;
  };

  const renderGridItems = () => {
    if (isInitialLoad) return <LoadingIndicator />;

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
    <>
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
              <CloseButton onClick={handleCancelClick}>닫기</CloseButton>
              {title && <HeaderTitle>{title}</HeaderTitle>}
              <span>선택완료</span>
            </TitleContainer>
            <SearchBar onSearch={setSearchQuery} initialQuery={searchQuery} />
          </HeaderWrapper>
          <ContentWrapper ref={contentRef}>
            <GridContainer>{renderGridItems()}</GridContainer>
          </ContentWrapper>
        </BottomSheet>
      </BackgroundOverlay>
      <AlertModal
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={() => setIsAlertOpen(false)}
        title="장소 선택은 최대 5개까지 가능합니다."
        confirmOnly={true}
      />
    </>
  );
};

export default AddContents;
