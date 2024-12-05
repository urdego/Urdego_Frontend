import { useState } from 'react';
import {
  BackgroundOverlay,
  BottomSheet,
  ContentHeader,
  ContentContainer,
  ContentWrapper,
} from './LocationListBottonSheetStyles';

interface LocationListBottomSheetProps {
  isVisible: boolean;
}

const LocationListBottomSheet = ({
  isVisible,
}: LocationListBottomSheetProps) => {
  const [isOpened, setIsOpened] = useState(true);

  return (
    <>
      <BackgroundOverlay
        initial={{ x: '-50%' }}
        variants={{
          open: {
            backdropFilter: 'blur(1px)',
            pointerEvents: 'all',
            opacity: 0.7,
          },
          closed: {
            backdropFilter: 'blur(0px)',
            pointerEvents: 'none',
            opacity: 0,
          },
        }}
      />
      <BottomSheet
        initial={{ x: '-50%' }}
        animate={{ y: isOpened ? '0%' : '100%' }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(event, info) => {
          // y가 음수이면 위로, 양수이면 아래로

          const offsetThreshold = 150;
          const deltaThreshold = 5;

          const isOverOffsetThreshold =
            Math.abs(info.offset.y) > offsetThreshold;
          const isOverDeltaThreshold = Math.abs(info.delta.y) > deltaThreshold;

          const isOverThreshold = isOverOffsetThreshold || isOverDeltaThreshold;

          if (!isOverThreshold) return;

          const newIsOpened = info.offset.y < 0;

          setIsOpened(newIsOpened);
        }}
        // onTap={() => setIsOpened(true)}
      >
        <ContentWrapper>
          <ContentHeader>헤더</ContentHeader>
          <ContentContainer>
            <div>내용</div>
            <div>내용</div>
          </ContentContainer>
        </ContentWrapper>
      </BottomSheet>
    </>
  );
};

export default LocationListBottomSheet;
