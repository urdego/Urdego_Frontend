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
import InGameWebSocket from '@/lib/websocket/gameWebsocket';
import useWebSocketStore, { RoundData } from '@/stores/useWebSocketStore';
import SwiperTestImage from '@/styles/Image/InGame/SwiperTestImage.png';

import { PageWrapper, Footer, HintText, HintWrapper } from './game.styles';

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

  const messages = useWebSocketStore((state) => state.messages);

  // roundState를 별도의 state로 관리
  const [roundState, setRoundState] = useState<RoundData | null>(null);

  // messages와 currentRound 변경 시 roundState 업데이트
  useEffect(() => {
    const roundStartMessage = messages
      .filter((msg) => msg.eventType === 'ROUND_START')
      .find((msg) => (msg.data as RoundData).roundNum === currentRound);

    if (roundStartMessage) {
      setRoundState(roundStartMessage.data as RoundData);
    }
  }, [messages, currentRound]);

  const webSocket = InGameWebSocket.getInstance();

  const handleNextRound = useCallback(() => {
    router.push(`/game/${params.roomId}/${currentRound}/roundRank`);
    setCurrentSelectedCoordinate(null);
  }, [router, params.roomId, currentRound, setCurrentSelectedCoordinate]);

  const handleCoordinateSelect = (
    coordinate: google.maps.LatLngLiteral | null
  ) => {
    console.log('선택된 좌표:', coordinate);
    setCurrentSelectedCoordinate(coordinate);
  };

  // 답안 제출 함수 수정
  const handleSubmitAnswer = async () => {
    if (hasSubmitted || !currentSelectedCoordinate) {
      console.log('제출 불가:', { hasSubmitted, currentSelectedCoordinate });
      return;
    }

    setHasSubmitted(true);

    try {
      webSocket.submitAnswer(Number(params.round), [
        currentSelectedCoordinate.lat,
        currentSelectedCoordinate.lng,
      ]);
      setCurrentSelectedCoordinate(null);
      console.log('제출 완료');
    } catch (error) {
      console.error('제출 중 에러 발생:', error);
      setHasSubmitted(false);
    }
  };

  // 지도 선택 Bottom sheet
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const toggleBottomSheet = () => {
    if (isBottomSheetOpen) {
      setIsBottomSheetOpen(false);
    } else {
      setIsBottomSheetOpen(true);
    }
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
        <Timer initialTime={20} onTimeEnd={handleNextRound} />

        {/* 기본 뷰 (스와이퍼와 힌트) */}
        {isMapView ? (
          <MapComponent
            mode="game"
            onCoordinateSelect={handleCoordinateSelect}
            answerCoordinate={null} // 게임 모드에서는 정답 좌표를 숨기기 위해 null
          />
        ) : (
          <>
            <SwiperComponent
              images={
                roundState?.contentUrls || [...Array(3).fill(SwiperTestImage)]
              }
              key={roundState?.roundId}
            />
            <HintWrapper>
              <HintText>
                {roundState?.hint || '문화생활을 할 수 있는 장소'}
              </HintText>
            </HintWrapper>
          </>
        )}

        <Footer>
          <Button
            label={isBottomSheetOpen ? '정답 선택하기' : '위치 선택'}
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
