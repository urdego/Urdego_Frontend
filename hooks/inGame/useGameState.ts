import { useState, useEffect } from 'react';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// 라운드별로 받아오는 게임 데이터 타입 정의
interface RoundState {
  roundId: number;
  // roundTimer: number;
  contentUrls: string[];
  hint?: string;
  answerCoordinate: google.maps.LatLngLiteral;
}

export const useGameState = (initialRound: number) => {
  // 게임 진행 상태 관리
  const [currentRound] = useState(initialRound);

  // UI 상태 관리
  const [isMapView, setIsMapView] = useState(false);
  const [showBackIcon, setShowBackIcon] = useState(false);
  const [currentSelectedCoordinate, setCurrentSelectedCoordinate] =
    useState<google.maps.LatLngLiteral | null>(null);

  // 라운드별 게임 데이터 상태 관리
  const [roundState, setRoundState] = useState<RoundState>({
    roundId: initialRound,
    // roundTimer: 0,
    hint: '',
    contentUrls: [],
    answerCoordinate: { lat: 0, lng: 0 },
  });

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

  useEffect(() => {
    // TODO : 게임소켓 전역으로 설정된 것으로 사용하기
    // 웹소켓 연결 설정
    const socket = new SockJS('/game-service');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str: string) => {
        console.log(str);
      },
    });

    // 연결 성공시 구독 설정
    stompClient.onConnect = () => {
      // 라운드 생성 구독
      stompClient.subscribe(
        `/game-service/subscribe/rounds/${initialRound}/create`,
        (message: Message) => {
          const roundData: RoundState = JSON.parse(message.body);
          setRoundState({
            roundId: roundData.roundId,
            // roundTimer: roundData.roundTimer,
            hint: roundData.hint || '',
            contentUrls: roundData.contentUrls,
            answerCoordinate: roundData.answerCoordinate,
          });
        }
      );

      // 라운드 생성 요청
      stompClient.publish({
        destination: `/game-service/publish/rounds/${initialRound}/create`,
        body: JSON.stringify({
          gameId: 123, // TODO: 실제 게임 ID로 교체
          roundNum: initialRound,
        }),
      });
    };

    stompClient.activate();

    return () => {
      if (stompClient.connected) {
        stompClient.deactivate();
      }
    };
  }, [initialRound]);

  // 컴포넌트에서 사용할 상태와 핸들러 반환
  return {
    currentRound,
    isMapView,
    showBackIcon,
    currentSelectedCoordinate,
    roundState,
    setCurrentSelectedCoordinate,
    handleShowMap,
    handleBackClick,
    handleSetCurrentSelectedCoordinate,
  };
};
