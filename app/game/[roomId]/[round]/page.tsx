'use client';
import { useRouter } from 'next/navigation';
import { useGameState } from '@/hooks/inGame/useGameState';
import { useGameSubmit } from '@/hooks/inGame/useGameSubmit';
import TopBar from '@/components/Common/TopBar/TopBar';
import Button from '@/components/Common/Button/Button';
import Timer from '@/components/Layout/Game/Timer';
import { PageWrapper, Footer } from './game.styles';
import SwiperComponent from '@/components/Layout/Game/Swiper';
import MapComponent from '@/components/Layout/Game/GoogleMap';
import { useCallback, useState } from 'react';

interface GamePageProps {
  params: {
    roomId: string;
    round: string;
  };
}

const GamePage = ({ params }: GamePageProps) => {
  const router = useRouter();
  const nickname = '어데고'; // TODO: 추후 전역 상태 관리
  const { submitAnswer, isSubmitting } = useGameSubmit();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const {
    currentRound,
    isMapView,
    showBackIcon,
    currentSelectedCoordinate,
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
      console.log('이미 제출됨 또는 좌표 미선택:', {
        hasSubmitted,
        currentSelectedCoordinate,
      });
      return;
    }

    const submitData = {
      roomId: params.roomId,
      nickname,
      round: currentRound,
      coordinate: currentSelectedCoordinate,
    };

    console.log('제출 시작:', { submitData, isSubmitting });

    try {
      const success = await submitAnswer(submitData);
      console.log('제출 응답:', {
        success,
        isSubmitting,
        submitData,
        type: typeof success,
      });

      if (!success) {
        console.warn('제출은 완료되었으나 success가 false 반환됨');
        // 필요한 경우 여기서 에러 처리
        return;
      }

      setHasSubmitted(true);
      setCurrentSelectedCoordinate(null);
      console.log('상태 업데이트 완료:', {
        hasSubmitted: true,
        currentSelectedCoordinate: null,
      });
    } catch (error) {
      console.error('제출 중 에러 발생:', error);
    }
  };

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
        <Timer initialTime={10} onTimeEnd={handleNextRound} />

        {isMapView ? (
          <MapComponent
            mode="game"
            onCoordinateSelect={handleCoordinateSelect}
            answerCoordinate={null} // 게임 모드에서는 정답 좌표를 숨기기 위해 null
          />
        ) : (
          <SwiperComponent />
        )}

        <Footer>
          <Button
            label={isMapView ? '정답 선택하기' : '위치 선택'}
            buttonType={hasSubmitted ? 'gray' : 'purple'}
            buttonSize="large"
            onClick={isMapView ? handleSubmitAnswer : handleShowMap}
            styleType="coloredBackground"
            disabled={(isMapView && !currentSelectedCoordinate) || isSubmitting}
          />
        </Footer>
      </PageWrapper>
    </>
  );
};

export default GamePage;
