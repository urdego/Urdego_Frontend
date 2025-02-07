import React, { useRef, useState } from 'react';
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
  const mapRef = useRef<HTMLDivElement>(null);
  const [isDraggable, setIsDraggable] = useState(false); // 기본적으로 드래그 비활성화

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
      dragMomentum={false}
      dragListener={isDraggable} // 지도 드래그 중에는 바텀시트 드래그 비활성화
      onDragEnd={handleDragEnd}
    >
      <BottomSheetWrapper>
        <BottomSheetHeader>
          <DragHandle />
          <Title>위치를 선택해주세요</Title>
        </BottomSheetHeader>

        {/* 지도 내부 드래그 중에는 바텀시트가 움직이지 않도록 이벤트 차단 */}
        <div
          ref={mapRef}
          onTouchStart={() => setIsDraggable(false)} // 지도 터치 시 드래그 비활성화
          onTouchEnd={() => setIsDraggable(true)} //  지도에서 손을 떼면 다시 드래그 활성화
          onTouchMove={(e) => e.stopPropagation()} //  이벤트 전파 차단
        >
          <MapComponent
            mode="game"
            onCoordinateSelect={onCoordinateSelect}
            answerCoordinate={null}
          />
        </div>

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
