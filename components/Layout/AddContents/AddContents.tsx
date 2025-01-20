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

  // useGetInfiniteLocationList 훅 호출
  const {
    locationList: contents,
    loadMore,
    isLoading,
    isInitialLoad,
  } = useGetInfiniteLocationList();

  // 초기 로드 및 무한 스크롤 설정
  useEffect(() => {
    const currentRef = contentRef.current;
    const handleScroll = () => {
      if (currentRef) {
        const { scrollTop, scrollHeight, clientHeight } = currentRef;
        if (scrollHeight - scrollTop <= clientHeight + 1 && !isLoading) {
          loadMore(); // 추가 데이터 로드
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
  }, [isLoading, loadMore]);

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
          layout="fill" // GridItem 크기에 맞게 채우기
          objectFit="cover" // 이미지 비율 유지하며 채우기
        />
        <LocationName>{content.contentName}</LocationName>
        {selectedLocations.includes(content.contentName) && (
          <SelectNumber>{getLocationNumber(content.contentName)}</SelectNumber>
        )}
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
