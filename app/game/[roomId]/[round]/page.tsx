'use client';
import { useRouter } from 'next/navigation';
import { useGameState } from '@/hooks/inGame/useGameState';
import TopBar from '@/components/Common/TopBar/TopBar';
import Button from '@/components/Common/Button/Button';
import Timer from '@/components/Layout/Game/Timer';
import MapBottomSheet from '@/components/Layout/Game/MapBottomSheet';
import ReportBottomSheet from '@/components/Common/BottomSheet/ReportBottomSheet';
import SwiperComponent from '@/components/Layout/Game/Swiper';
import MapComponent from '@/components/Layout/Game/GoogleMap';
import { useCallback, useState, useEffect, useRef } from 'react';
import { useWebSocketFunctions } from '@/hooks/websocket/useWebsocketFunctions';
import { PageWrapper, Footer, HintText, HintWrapper } from './game.styles';
import { InGamePayload } from '@/lib/types/inGame';
import useUserStore from '@/stores/useUserStore';
import useGameStore from '@/stores/useGameStore';
import { WebSocketMessage } from '@/lib/types/websocket';

interface GamePageProps {
  params: {
    roomId: string;
    round: string;
  };
}

const GamePage = ({ params }: GamePageProps) => {
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const { subscribeToRoom, sendMessage } = useWebSocketFunctions();
  const [hint, setHint] = useState<string>('');
  const [contents, setContents] = useState<string[]>([]);
  const { roomId } = useGameStore();
  const handleReportClick = useCallback(() => {
    console.log('Report clicked');
    setIsReportOpen(true);
  }, []);

  const {
    currentRound,
    isMapView,
    showBackIcon,
    currentSelectedCoordinate,
    setCurrentSelectedCoordinate,
    handleBackClick,
  } = useGameState(Number(params.round));

  const hasSubscribed = useRef(false); // 구독 여부를 추적

  // WebSocket 구독 설정
  useEffect(() => {
    if (!hasSubscribed.current) {
      subscribeToRoom(String(roomId), (message: WebSocketMessage) => {
        if (message.messageType === 'QUESTION_GIVE') {
          const questionMessage = message.payload as InGamePayload;
          useGameStore.getState().setQuestionId(questionMessage.questionId);
          setContents(questionMessage.contents);
          setHint(questionMessage.hint || '');
          console.log('Received contents:', questionMessage.contents);
        }
      });

      sendMessage(
        'QUESTION_GIVE',
        {
          roomId: roomId,
          roundNum: Number(params.round),
        },
        'game'
      );

      hasSubscribed.current = true; // 구독 완료 표시
    }
  }, [roomId, params.round, subscribeToRoom, sendMessage]);

  // 정답 제출 처리
  const handleSubmitAnswer = async () => {
    if (hasSubmitted || !currentSelectedCoordinate) {
      console.log('제출 불가:', { hasSubmitted, currentSelectedCoordinate });
      return;
    }

    setHasSubmitted(true);

    try {
      const questionId = useGameStore.getState().questionId;
      const userId = useUserStore.getState().userId;
      const { lat, lng } = currentSelectedCoordinate || { lat: 0, lng: 0 };
      sendMessage(
        'ANSWER_SUBMIT',
        {
          questionId,
          userId,
          latitude: lat,
          longitude: lng,
        } as InGamePayload,
        'game'
      );
      setCurrentSelectedCoordinate(null);
      console.log('제출 완료');
    } catch (error) {
      console.error('제출 중 에러 발생:', error);
      setHasSubmitted(false);
    }
  };

  // 다음 라운드로 이동
  const handleNextRound = useCallback(() => {
    router.push(`/game/${params.roomId}/${currentRound}/roundRank`);
    setCurrentSelectedCoordinate(null); // 선택된 좌표 초기화
  }, [router, params.roomId, currentRound, setCurrentSelectedCoordinate]);

  // 좌표 선택 처리
  const handleCoordinateSelect = (
    coordinate: google.maps.LatLngLiteral | null
  ) => {
    console.log('선택된 좌표:', coordinate);
    setCurrentSelectedCoordinate(coordinate); // 선택된 좌표 상태 업데이트
  };

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false); // 바텀시트 열림 상태

  const toggleBottomSheet = () => {
    setIsBottomSheetOpen((prev) => !prev); // 바텀시트 열림 상태 토글
  };

  return (
    <>
      <PageWrapper>
        <TopBar
          NavType="game"
          label={`${currentRound} 라운드`}
          backIcon={showBackIcon}
          isMapView={isMapView}
          onBackClick={handleBackClick}
          onReportClick={handleReportClick}
        />
        <Timer initialTime={1000000} onTimeEnd={handleNextRound} />
        {/* 기본 뷰 (스와이퍼와 힌트) */}
        {isMapView ? (
          <MapComponent
            mode="game"
            onCoordinateSelect={handleCoordinateSelect}
            answerCoordinate={null} // 게임 모드에서는 정답 좌표를 숨기기 위해 null
          />
        ) : (
          <>
            <SwiperComponent contents={contents} key={currentRound} />
            {hint && (
              <HintWrapper>
                <HintText>{hint}</HintText>
              </HintWrapper>
            )}
          </>
        )}
        <Footer>
          <Button
            label={isBottomSheetOpen ? '정답 선택' : '위치 선택'}
            buttonType={hasSubmitted ? 'gray' : 'purple'}
            buttonSize="large"
            onClick={toggleBottomSheet}
            styleType="coloredBackground"
            disabled={(isMapView && !currentSelectedCoordinate) || hasSubmitted}
          />
        </Footer>
      </PageWrapper>
      {/* 신고 기능 BottomSheet 호출 */}
      <ReportBottomSheet
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        onSubmit={(reportType) => {
          console.log('신고 유형:', reportType);
          setIsReportOpen(false);
        }}
      />
      {/* MapBottomSheet 컴포넌트 호출 */}
      <MapBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={toggleBottomSheet}
        onCoordinateSelect={handleCoordinateSelect}
        currentSelectedCoordinate={currentSelectedCoordinate}
        hasSubmitted={hasSubmitted}
        handleSubmitAnswer={handleSubmitAnswer}
      />
    </>
  );
};

export default GamePage;
