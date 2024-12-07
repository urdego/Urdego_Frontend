import { useState } from 'react';
import {
  BackgroundOverlay,
  BottomSheet,
  ContentHeader,
  ContentContainer,
  ContentWrapper,
  HeaderWrapper,
  HeaderHandler,
  NoContentText,
} from './LocationListBottonSheet.styles';
import LocationList from '@/components/Layout/Home/LocationList/LocationList';
import useGetLocationlist from '@/hooks/locationList/useGetLocationList';

interface LocationListBottomSheetProps {
  isVisible: boolean;
  setLocationListVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const LocationListBottomSheet = ({
  isVisible,
  setLocationListVisible,
}: LocationListBottomSheetProps) => {
  const [isExpand, setIsExpand] = useState(false);

  const { locationList } = useGetLocationlist(isVisible);

  return (
    <>
      {isVisible && (
        <>
          <BackgroundOverlay
            initial={{ x: '-50%' }}
            animate={{ opacity: isVisible ? 1 : 0 }}
          />
          <BottomSheet
            $isExpand={isExpand}
            initial={{ x: '-50%' }}
            animate={{ y: isVisible ? '0%' : '100%' }}
            transition={{ type: 'tween' }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(event, info) => {
              const isScrollToBottom = info.delta.y > 5 || info.offset.y > 150;
              if (isScrollToBottom) {
                // 스크롤 아래로 내리는 경우
                setIsExpand(false);
                setLocationListVisible(false);
              } else {
                // 스크롤 위로 올리는 경우
                setIsExpand(true);
              }
            }}
          >
            <HeaderWrapper>
              <HeaderHandler />
            </HeaderWrapper>
            <ContentWrapper>
              <ContentHeader>
                올린 장소 (
                {locationList.totalContentsCount
                  ? locationList.totalContentsCount
                  : '0'}
                )
              </ContentHeader>
              {locationList.userContents.length !== 0 ? (
                <ContentContainer $isExpand={isExpand}>
                  {locationList.userContents.map((location, index) => (
                    <LocationList key={`key+${index}`} location={location} />
                  ))}
                </ContentContainer>
              ) : (
                <NoContentText $isExpand={isExpand}>
                  올린 장소가 없습니다. 장소를 등록해주세요! 😊
                </NoContentText>
              )}
            </ContentWrapper>
          </BottomSheet>
        </>
      )}
    </>
  );
};

export default LocationListBottomSheet;
