'use client';
import { useRouter } from 'next/navigation';
import { useGameTimer } from '@/hooks/useGameTimer';
import { useGameState } from '@/hooks/useGameState';
import { useGameSubmit } from '@/hooks/useGameSubmit';
import TopBar from '@/components/Common/TopBar/TopBar';
import Button from '@/components/Common/Button/Button';
import ProgressBar from '@/components/Layout/Game/ProgressBar';
import { PageWrapper, Footer, TimerContainer, TimerText } from './game.styles';
import SwiperComponent from '@/components/Layout/Game/Swiper';
import MapComponent from '@/components/Layout/Game/GoogleMap';

interface GamePageProps {
  params: {
    roomId: string;
    round: string;
  };
}

const GamePage = ({ params }: GamePageProps) => {
  const router = useRouter();
  const nickname = '어데고'; // TODO: 추후 전역 상태 관리

  const {
    currentRound,
    isMapView,
    showBackIcon,
    currentSelectedCoordinate,
    setCurrentSelectedCoordinate,
    handleShowMap,
    handleBackClick,
  } = useGameState(Number(params.round));

  const handleNextRound = () => {
    router.push(`/game/${params.roomId}/${currentRound}/roundRank`);
    setCurrentSelectedCoordinate(null);
  };

  const { timeLeft } = useGameTimer(10, handleNextRound);
  const { submitAnswer, isSubmitting } = useGameSubmit();

  const handleCoordinateSelect = (
    coordinate: google.maps.LatLngLiteral | null
  ) => {
    console.log('선택된 좌표:', coordinate);
    setCurrentSelectedCoordinate(coordinate);
  };

  const handleSubmitAnswer = async () => {
    const submitData = {
      roomId: params.roomId,
      nickname,
      round: currentRound,
      coordinate: currentSelectedCoordinate,
    };

    console.log('제출될 데이터:', submitData);

    const success = await submitAnswer(submitData);

    if (success) {
      setCurrentSelectedCoordinate(null);
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
        <TimerContainer>
          <TimerText>{timeLeft}초</TimerText>
          <ProgressBar progress={(timeLeft / 10) * 100} />
        </TimerContainer>

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
