import React from 'react';
import { PanInfo } from 'framer-motion';
import MapComponent from '@/components/Layout/Game/GoogleMap';
import Button from '@/components/Common/Button/Button';
import {
  BottomSheetWrapper,
  BottomSheetHeader,
  DragHandle,
  BottomSheetFooter,
  Title,
  StyledMotion,
} from './MapBottomSheet.styles';

export interface MapBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onCoordinateSelect: (coordinate: google.maps.LatLngLiteral | null) => void;
  currentSelectedCoordinate: google.maps.LatLngLiteral | null;
  hasSubmitted: boolean;
  handleSubmitAnswer: () => void;
}

const MapBottomSheet: React.FC<MapBottomSheetProps> = ({
  isOpen,
  onClose,
  onCoordinateSelect,
  currentSelectedCoordinate,
  hasSubmitted,
  handleSubmitAnswer,
}) => {
  const handleDragEnd = (event: TouchEvent | MouseEvent, info: PanInfo) => {
    const shouldClose =
      info.velocity.y > 20 || (info.velocity.y >= 0 && info.offset.y > 200);
    if (shouldClose) {
      onClose();
    }
  };

  return (
    <StyledMotion
      initial={{ y: '100%' }}
      animate={{ y: isOpen ? '0%' : '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      dragMomentum={false}
    >
      <BottomSheetWrapper>
        <BottomSheetHeader>
          <DragHandle />
          <Title>위치를 선택해주세요</Title>
        </BottomSheetHeader>

        <MapComponent
          mode="game"
          onCoordinateSelect={onCoordinateSelect}
          answerCoordinate={null}
        />

        <BottomSheetFooter>
          <Button
            label="정답 제출"
            buttonType={hasSubmitted ? 'gray' : 'purple'}
            buttonSize="large"
            onClick={handleSubmitAnswer}
            styleType="coloredBackground"
            disabled={!currentSelectedCoordinate || hasSubmitted}
          />
        </BottomSheetFooter>
      </BottomSheetWrapper>
    </StyledMotion>
  );
};

export default MapBottomSheet;
