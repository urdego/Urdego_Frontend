'use client';
import { useRouter } from 'next/navigation';
import { useGameState } from '@/hooks/inGame/useGameState';
import useUserStore from '@/stores/useUserStore';
import TopBar from '@/components/Common/TopBar/TopBar';
import Button from '@/components/Common/Button/Button';
import Timer from '@/components/Layout/Game/Timer';
import SwiperComponent from '@/components/Layout/Game/Swiper';
import MapComponent from '@/components/Layout/Game/GoogleMap';
import { useCallback, useState, useEffect } from 'react';
import { useWebSocket } from '@/hooks/inGame/useWebSocket';
import {
  PageWrapper,
  Footer,
  HintText,
  HintWrapper,
  HintIcon,
} from './game.styles';

interface GamePageProps {
  params: {
    roomId: string;
    round: string;
  };
}

const GamePage = ({ params }: GamePageProps) => {
  const router = useRouter();
  const nickname = useUserStore(
    (state: { nickname: string | null }) => state.nickname
  );
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // WebSocket
  const { gameState, submitAnswer, createRound } = useWebSocket(
    Number(params.roomId)
  );

  const {
    currentRound,
    isMapView,
    showBackIcon,
    currentSelectedCoordinate,
    roundState,
    setCurrentSelectedCoordinate,
    handleShowMap,
    handleBackClick,
  } = useGameState(Number(params.round));

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

  const handleSubmitAnswer = async () => {
    if (hasSubmitted || !currentSelectedCoordinate) {
      console.log('제출 불가:', { hasSubmitted, currentSelectedCoordinate });
      return;
    }

    const submitData = {
      nickname: nickname || '',
      roundId: Number(params.round),
      coordinate: [
        currentSelectedCoordinate.lat,
        currentSelectedCoordinate.lng,
      ] as [number, number],
    };

    setHasSubmitted(true);

    try {
      submitAnswer(submitData);
      setCurrentSelectedCoordinate(null);
      console.log('제출 완료');
    } catch (error) {
      console.error('제출 중 에러 발생:', error);
      setHasSubmitted(false);
    }
  };

  useEffect(() => {
    // 라운드 시작시 라운드 생성 요청
    createRound(Number(params.round));
  }, [createRound, params.round]);

  // gameState에서 라운드 정보 활용
  useEffect(() => {
    if (gameState.roundState) {
      // 라운드 상태 업데이트시 처리
      console.log('새로운 라운드 정보:', gameState.roundState);
    }
  }, [gameState.roundState]);

  return (
    <>
      <PageWrapper>
        <TopBar
          NavType="game"
          label={`${currentRound} 라운드`}
          backIcon={showBackIcon}
          alarmIcon={false}
          friendIcon={false}
          isMapView={isMapView}
          onBackClick={handleBackClick}
        />
        <Timer initialTime={60} onTimeEnd={handleNextRound} />

        {isMapView ? (
          <MapComponent
            mode="game"
            onCoordinateSelect={handleCoordinateSelect}
            answerCoordinate={null} // 게임 모드에서는 정답 좌표를 숨기기 위해 null
          />
        ) : (
          <>
            <SwiperComponent />
            {/* TODO: 백엔드 연동 시 사용 */}
            {/* <SwiperComponent images={gameState.roundState?.contentUrls || []} /> */}
            {roundState.hint && (
              <HintWrapper>
                <HintIcon>힌트</HintIcon>
                <HintText> {roundState.hint}</HintText>
                {/* <HintText>{gameState.roundState.hint}</HintText> */}
              </HintWrapper>
            )}
          </>
        )}

        <Footer>
          <Button
            label={isMapView ? '정답 선택하기' : '위치 선택'}
            buttonType={hasSubmitted ? 'gray' : 'purple'}
            buttonSize="large"
            onClick={isMapView ? handleSubmitAnswer : handleShowMap}
            styleType="coloredBackground"
            disabled={(isMapView && !currentSelectedCoordinate) || hasSubmitted}
          />
        </Footer>
      </PageWrapper>
    </>
  );
};

export default GamePage;
