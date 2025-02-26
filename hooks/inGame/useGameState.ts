import { useState } from 'react';

export const useGameState = (initialRound: number) => {
  // 게임 진행 상태 관리
  const [currentRound] = useState(initialRound);

  // UI 상태 관리
  const [isMapView, setIsMapView] = useState(false);
  const [showBackIcon, setShowBackIcon] = useState(false);
  const [currentSelectedCoordinate, setCurrentSelectedCoordinate] =
    useState<google.maps.LatLngLiteral | null>(null);

  // 맵 뷰 활성화 핸들러
  const handleShowMap = () => {
    setIsMapView(true);
    setShowBackIcon(true);
  };

  // 뒤로가기 핸들러 (맵 뷰에서 이미지 뷰로)
  const handleBackClick = () => {
    if (isMapView) {
      setIsMapView(false);
      setShowBackIcon(false);
    }
  };

  // 사용자가 선택한 좌표 업데이트 핸들러
  const handleSetCurrentSelectedCoordinate = (
    coordinate: google.maps.LatLngLiteral | null
  ) => {
    console.log('Selected coordinate:', coordinate);
    setCurrentSelectedCoordinate(coordinate);
  };

  return {
    currentRound,
    isMapView,
    showBackIcon,
    currentSelectedCoordinate,
    setCurrentSelectedCoordinate,
    handleShowMap,
    handleBackClick,
    handleSetCurrentSelectedCoordinate,
  };
};
