import { useState, ReactNode, useEffect, useRef } from 'react';
import {
  BackgroundOverlay,
  BottomSheet,
  HeaderWrapper,
  HeaderHandler,
  HeaderTitle,
  ContentWrapper,
  AllCancelButton,
  GridContainer,
  GridItem,
  SelectNumber,
  CancelButtonText,
  TitleContainer,
  LocationName,
  SelectIndicator,
} from '@/components/Layout/AddContents/AddContents.styles';
import useGetInfiniteLocationList from '@/hooks/locationList/useGetInfiniteLocationList';
import Image from 'next/image';

interface AddContentsProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  children?: ReactNode;
}

const AddContents = ({ isVisible, setIsVisible, title }: AddContentsProps) => {
  const [isExpand, setIsExpand] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    locationList: contents,
    fetchLocationList,
    isLoading,
    isLoadMore,
  } = useGetInfiniteLocationList();

  const isInitialLoad = contents.length === 0;

  useEffect(() => {
    const currentRef = contentRef.current;

    const handleScroll = () => {
      if (currentRef) {
        const { scrollTop, scrollHeight, clientHeight } = currentRef;
        // 무한 스크롤 조건: 스크롤이 하단에 도달했으며, 로딩 중이 아니고, 추가 데이터가 있음
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
    if (!isVisible) {
      setSelectedLocations([]); // 선택 항목 초기화
    }
  }, [isVisible]);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsVisible(false);
    }
  };

  const handleLocationSelect = (name: string) => {
    if (selectedLocations.includes(name)) {
      const newLocations = selectedLocations.filter((i) => i !== name);
      setSelectedLocations(newLocations);
    } else {
      if (selectedLocations.length < 5) {
        setSelectedLocations([...selectedLocations, name]);
      }
    }
  };

  const handleAllCancel = () => {
    setSelectedLocations([]);
  };

  const getLocationNumber = (name: string) => {
    return selectedLocations.indexOf(name) + 1;
  };

  const renderGridItems = () => {
    return contents.map((content) => (
      <GridItem
        key={content.contentName}
        onClick={() => handleLocationSelect(content.contentName)}
      >
        <Image
          src={content.url}
          alt={content.contentName}
          layout="fill"
          objectFit="cover"
        />
        <SelectIndicator
          selected={selectedLocations.includes(content.contentName)}
        >
          {selectedLocations.includes(content.contentName) && (
            <SelectNumber>
              {getLocationNumber(content.contentName)}
            </SelectNumber>
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
            {title && <HeaderTitle>{title}</HeaderTitle>}
            <AllCancelButton onClick={handleAllCancel}>
              <CancelButtonText>전체 해제</CancelButtonText>
            </AllCancelButton>
          </TitleContainer>
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
