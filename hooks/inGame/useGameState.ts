import { useState } from 'react';

export const useGameState = (initialRound: number) => {
  const [currentRound, setCurrentRound] = useState(initialRound);
  const [isMapView, setIsMapView] = useState(false);
  const [showBackIcon, setShowBackIcon] = useState(false);
  const [currentSelectedCoordinate, setCurrentSelectedCoordinate] =
    useState<google.maps.LatLngLiteral | null>(null);

  const handleShowMap = () => {
    setIsMapView(true);
    setShowBackIcon(true);
  };

  const handleBackClick = () => {
    if (isMapView) {
      setIsMapView(false);
      setShowBackIcon(false);
    }
  };

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
