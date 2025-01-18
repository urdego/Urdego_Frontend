import { useState, ReactNode, useEffect, useRef } from 'react';
import axios from 'axios';
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
} from './AddContents.styles';

interface Content {
  contentId: number;
  url: string;
  contentName: string;
  address: string;
  latitude: number;
  longitude: number;
  hint: string;
}

interface AddContentsProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  children: ReactNode;
}

const ITEMS_PER_PAGE = 16;

const AddContents = ({ isVisible, setIsVisible, title }: AddContentsProps) => {
  const [isExpand, setIsExpand] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);
  const [contents, setContents] = useState<Content[]>([]);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [cursorIdx, setCursorIdx] = useState(1); // 시작 idx
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const userId = 1; // 1, 2, 3, 4 중 하나로 하드코딩

  const fetchContents = async () => {
    if (isLoading) return; // 중복 요청 방지
    setIsLoading(true);

    try {
      const response = await axios.get(
        `/api/content-service/${userId}/contents`,
        {
          params: {
            cursorIdx,
            limit: ITEMS_PER_PAGE,
          },
        }
      );
      const fetchedContents = response.data.contents;
      setContents((prev) => [...prev, ...fetchedContents]);
      setCursorIdx((prev) => prev + ITEMS_PER_PAGE); // 다음 cursorIdx 설정
    } catch (error) {
      console.error('Error fetching contents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      if (scrollHeight - scrollTop <= clientHeight + 1 && !isLoading) {
        fetchContents(); // 추가 데이터 가져오기
      }
    }
  };

  useEffect(() => {
    const currentRef = contentRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, [contents, isLoading]);

  useEffect(() => {
    if (isVisible) {
      setContents([]); // 초기화
      setCursorIdx(1); // 초기 cursorIdx 설정
      fetchContents(); // 처음 데이터 가져오기
    }
  }, [isVisible]);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsVisible(false);
    }
  };

  const handleLocationSelect = (index: number) => {
    if (selectedLocations.includes(index)) {
      const newLocations = selectedLocations.filter((i) => i !== index);
      setSelectedLocations(newLocations);
    } else {
      if (selectedLocations.length < 9) {
        setSelectedLocations([...selectedLocations, index]);
      }
    }
  };

  const handleAllCancel = () => {
    setSelectedLocations([]);
  };

  const getLocationNumber = (index: number) => {
    return selectedLocations.indexOf(index) + 1;
  };

  const renderGridItems = () => {
    return contents.slice(0, visibleItems).map((content) => (
      <GridItem
        key={content.contentId}
        onClick={() => handleLocationSelect(content.contentId)}
      >
        <LocationName>{content.contentName}</LocationName>
        {selectedLocations.includes(content.contentId) && (
          <SelectNumber>{getLocationNumber(content.contentId)}</SelectNumber>
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
          <GridContainer>{renderGridItems()}</GridContainer>
        </ContentWrapper>
      </BottomSheet>
    </BackgroundOverlay>
  );
};

export default AddContents;
