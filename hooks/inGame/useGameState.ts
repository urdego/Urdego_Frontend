import { useState, useEffect } from 'react';
import useWebSocketStore, {
  GameState,
  RoundData,
  ResultData,
} from '@/stores/useWebSocketStore';
import InGameWebSocket from '@/lib/websocket/gameWebsocket';

export const useGameState = (initialRound: number) => {
  const [gameState, setGameState] = useState<GameState>({});
  const webSocket = InGameWebSocket.getInstance();

  // 웹소켓 메시지 구독
  useEffect(() => {
    const unsubscribe = useWebSocketStore.subscribe((state) => {
      const messages = state.messages;
      if (messages.length > 0) {
        const latestMessage = messages[messages.length - 1];

        if ('data' in latestMessage) {
          switch (latestMessage.eventType) {
            case 'ROUND_START':
              if ('roundId' in latestMessage.data) {
                setGameState((prev) => ({
                  ...prev,
                  roundState: latestMessage.data as RoundData,
                }));
              }
              break;
            case 'RESULT':
              if ('answerCoordinate' in latestMessage.data) {
                setGameState((prev) => ({
                  ...prev,
                  scoreState: latestMessage.data as ResultData,
                }));
              }
              break;
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // 라운드 변경 시 웹소켓 업데이트
  useEffect(() => {
    webSocket.updateRound(initialRound);
  }, [initialRound]);

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
    gameState,
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
