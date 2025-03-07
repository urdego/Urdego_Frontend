import React, { useRef, useState, useEffect } from 'react';
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
  MapContainer,
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
  const [isDraggable, setIsDraggable] = useState(false);

  const handleDragEnd = (event: TouchEvent | MouseEvent, info: PanInfo) => {
    const shouldClose =
      info.velocity.y > 20 || (info.velocity.y >= 0 && info.offset.y > 200);
    if (shouldClose) {
      onClose();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mapRef.current && !mapRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <StyledMotion
      initial={{ y: '100%' }}
      animate={{ y: isOpen ? '0%' : '100%' }}
      transition={{ type: 'spring', stiffness: 200, damping: 35 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      dragMomentum={false}
      dragListener={isDraggable}
      onDragEnd={handleDragEnd}
    >
      <BottomSheetWrapper>
        <BottomSheetHeader
          onTouchStart={() => setIsDraggable(true)}
          onTouchEnd={() => setIsDraggable(false)}
        >
          <DragHandle />
          <Title>위치를 선택해주세요</Title>
        </BottomSheetHeader>

        <MapContainer
          ref={mapRef}
          onTouchStart={() => setIsDraggable(false)}
          onTouchEnd={() => setIsDraggable(false)}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <MapComponent
            mode="game"
            onCoordinateSelect={onCoordinateSelect}
            answerCoordinate={null}
          />
        </MapContainer>

        <BottomSheetFooter>
          <Button
            label="위치 선택"
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
