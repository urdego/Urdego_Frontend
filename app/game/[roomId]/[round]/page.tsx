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
import { useCallback, useState, useEffect } from 'react';
import { useWebSocketFunctions } from '@/hooks/websocket/useWebsocketFunctions';
import { PageWrapper, Footer, HintText, HintWrapper } from './game.styles';
import { InGamePayload } from '@/lib/types/inGame';
import useUserStore from '@/stores/useUserStore';
import useGameStore from '@/stores/useGameStore';
import { WebSocketMessage } from '@/lib/types/websocket';

interface GamePageProps {
  params: {
    round: string;
  };
}

const GamePage = ({ params }: GamePageProps) => {
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [hint, setHint] = useState<string>('');
  const [contents, setContents] = useState<string[]>([]);
  const { roomId, setQuestionId } = useGameStore();
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const { subscribeToRoom, sendMessage } = useWebSocketFunctions();
  const {
    currentRound,
    isMapView,
    showBackIcon,
    currentSelectedCoordinate,
    setCurrentSelectedCoordinate,
    handleBackClick,
  } = useGameState(Number(params.round));

  // 신고 기능 핸들러
  const handleReportClick = useCallback(() => {
    console.log('Report clicked');
    setIsReportOpen(true);
  }, []);

  // WebSocket 구독 및 데이터 요청
  useEffect(() => {
    if (!roomId || hasSubscribed) return;

    setHasSubscribed(true);
    subscribeToRoom(String(roomId), (message: WebSocketMessage) => {
      if (message.messageType === 'QUESTION_GIVE') {
        const questionMessage = message.payload as InGamePayload;
        setQuestionId(questionMessage.questionId);
        setContents(questionMessage.contents);
        setHint(questionMessage.hint || '');
        console.log('Received contents:', questionMessage.contents);
      }
    });

    sendMessage(
      'QUESTION_GIVE',
      { roomId, roundNum: Number(params.round) },
      'game'
    );
  }, [
    roomId,
    params.round,
    subscribeToRoom,
    sendMessage,
    setQuestionId,
    hasSubscribed,
  ]);

  // 정답 제출
  const handleSubmitAnswer = useCallback(() => {
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
        { questionId, userId, latitude: lat, longitude: lng } as InGamePayload,
        'game'
      );

      setCurrentSelectedCoordinate(null);
      console.log('제출 완료');
    } catch (error) {
      console.error('제출 중 에러 발생:', error);
      setHasSubmitted(false);
    }
  }, [
    hasSubmitted,
    currentSelectedCoordinate,
    sendMessage,
    setCurrentSelectedCoordinate,
  ]);

  // 정답 제출 후 바텀시트 닫기 (이슈 해결)
  const handleFinalSubmit = useCallback(() => {
    if (!currentSelectedCoordinate || hasSubmitted) return;

    handleSubmitAnswer(); // 정답 제출 실행

    setTimeout(() => {
      setIsBottomSheetOpen(false); // 정답 제출 후 바텀시트 닫기
    }, 100);
  }, [handleSubmitAnswer, currentSelectedCoordinate, hasSubmitted]);

  // 다음 라운드 이동
  const handleNextRound = useCallback(() => {
    // 이미 제출한 경우 추가 제출하지 않음
    if (!hasSubmitted) {
      const questionId = useGameStore.getState().questionId;
      const userId = useUserStore.getState().userId;
      const { lat, lng } = currentSelectedCoordinate || { lat: 0, lng: 0 };

      // ANSWER_SUBMIT 메시지 전송
      sendMessage(
        'ANSWER_SUBMIT',
        { questionId, userId, latitude: lat, longitude: lng } as InGamePayload,
        'game'
      );

      console.log('타임아웃으로 인한 제출 완료');
    } else {
      console.log('이미 제출된 상태, 추가 제출 없음');
    }

    // 1초 지연 후 다음 라운드로 이동
    setTimeout(() => {
      router.push(`/game/${roomId}/${currentRound}/roundRank`);
      setCurrentSelectedCoordinate(null);
    }, 1000);
  }, [
    router,
    roomId,
    currentRound,
    sendMessage,
    setCurrentSelectedCoordinate,
    hasSubmitted,
    currentSelectedCoordinate,
  ]);

  // 좌표 선택 핸들러
  const handleCoordinateSelect = useCallback(
    (coordinate: google.maps.LatLngLiteral | null) => {
      console.log('선택된 좌표:', coordinate);
      setCurrentSelectedCoordinate(coordinate);
    },
    [setCurrentSelectedCoordinate]
  );

  // 바텀시트 토글
  const toggleBottomSheet = useCallback(() => {
    setIsBottomSheetOpen((prev) => !prev);
  }, []);

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
        <Timer initialTime={60} onTimeEnd={handleNextRound} />

        {isMapView ? (
          <MapComponent
            mode="game"
            onCoordinateSelect={handleCoordinateSelect}
            answerCoordinate={null}
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
          {!isBottomSheetOpen ? (
            <Button
              label="정답 선택"
              buttonType={hasSubmitted ? 'gray' : 'purple'}
              buttonSize="large"
              onClick={toggleBottomSheet}
              styleType="coloredBackground"
              disabled={
                (isMapView && !currentSelectedCoordinate) || hasSubmitted
              }
            />
          ) : (
            <Button
              label="위치 선택"
              buttonType={hasSubmitted ? 'gray' : 'purple'}
              buttonSize="large"
              onClick={handleFinalSubmit}
              styleType="coloredBackground"
              disabled={!currentSelectedCoordinate || hasSubmitted}
            />
          )}
        </Footer>
      </PageWrapper>

      {/* 신고 기능 BottomSheet */}
      <ReportBottomSheet
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        onSubmit={(reportType) => {
          console.log('신고 유형:', reportType);
          setIsReportOpen(false);
        }}
      />

      {/* 지도 선택 BottomSheet */}
      <MapBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={toggleBottomSheet}
        onCoordinateSelect={handleCoordinateSelect}
        currentSelectedCoordinate={currentSelectedCoordinate}
        hasSubmitted={hasSubmitted}
        handleSubmitAnswer={handleFinalSubmit}
      />
    </>
  );
};

export default GamePage;
