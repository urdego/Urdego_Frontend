import { useState, useEffect } from 'react';

interface GameData {
  images: string[];
  hint?: string;
  answerCoordinate: google.maps.LatLngLiteral;
}

export const useGameState = (initialRound: number) => {
  const [currentRound, setCurrentRound] = useState(initialRound);
  const [isMapView, setIsMapView] = useState(false);
  const [showBackIcon, setShowBackIcon] = useState(false);
  const [currentSelectedCoordinate, setCurrentSelectedCoordinate] =
    useState<google.maps.LatLngLiteral | null>(null);

  // TODO: 라운드 별 가져올 데이터
  const [images, setImages] = useState<string[]>([]);
  const [hint, setHint] = useState<string>('');
  const [answerCoordinate, setAnswerCoordinate] =
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

  useEffect(() => {
    const fetchRoundData = async () => {
      try {
        const response = await fetch(`/api/game/round/${initialRound}`);
        const data = await response.json();

        setImages(data.images);
        setHint(data.hint);
        setAnswerCoordinate(data.answerCoordinate);
      } catch (error) {
        console.error('라운드 데이터 가져오기 실패:', error);
      }
    };

    fetchRoundData();
  }, [initialRound]);

  return {
    currentRound,
    isMapView,
    showBackIcon,
    currentSelectedCoordinate,
    hint,
    setHint,
    setCurrentSelectedCoordinate,
    handleShowMap,
    handleBackClick,
    handleSetCurrentSelectedCoordinate,
  };
};
