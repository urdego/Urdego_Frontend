import { useState } from 'react';
import {
  BackgroundOverlay,
  BottomSheet,
  ContentHeader,
  ContentContainer,
  ContentWrapper,
  HeaderWrapper,
  HeaderHandler,
} from './LocationListBottonSheetStyles';
import LocationList from '@/components/Layout/Home/LocationList/LocationList';

interface LocationListBottomSheetProps {
  isVisible: boolean;
  setLocationListVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const LocationListBottomSheet = ({
  isVisible,
  setLocationListVisible,
}: LocationListBottomSheetProps) => {
  const [isExpand, setIsExpand] = useState(false);

  return (
    <>
      {isVisible && (
        <>
          <BackgroundOverlay
            initial={{ x: '-50%' }}
            animate={{ opacity: isVisible ? 1 : 0 }}
          />
          <BottomSheet
            initial={{ x: '-50%' }}
            animate={{ y: isVisible ? '0%' : '100%' }}
            transition={{ type: 'tween' }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(event, info) => {
              const shouldClose = info.velocity.y > 5 || info.offset.y > 150;
              if (shouldClose) {
                setLocationListVisible(false);
              }
            }}
          >
            <HeaderWrapper>
              <HeaderHandler />
            </HeaderWrapper>

            <ContentWrapper>
              <ContentHeader>저장한 장소 (999)</ContentHeader>
              <ContentContainer>
                <LocationList />
                <LocationList />
                <LocationList />
                <LocationList />
                <LocationList />
                <LocationList />
                <LocationList />
                <LocationList />
                <LocationList />
                <LocationList />
                <LocationList />
              </ContentContainer>
            </ContentWrapper>
          </BottomSheet>
        </>
      )}
    </>
  );
};

export default LocationListBottomSheet;
