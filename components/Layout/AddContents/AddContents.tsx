import { useState, ReactNode } from 'react';
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
} from './AddContents.styles';

interface AddContentsProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  children: ReactNode;
}

const AddContents = ({ isVisible, setIsVisible, title }: AddContentsProps) => {
  const [isExpand, setIsExpand] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);

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
    return Array(12)
      .fill(null)
      .map((_, index) => (
        <GridItem key={index} onClick={() => handleLocationSelect(index)}>
          {selectedLocations.includes(index) && (
            <SelectNumber>{getLocationNumber(index)}</SelectNumber>
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
        <ContentWrapper>
          <GridContainer>{renderGridItems()}</GridContainer>
        </ContentWrapper>
      </BottomSheet>
    </BackgroundOverlay>
  );
};

export default AddContents;
