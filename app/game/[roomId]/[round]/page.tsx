'use client';
import { useRouter } from 'next/navigation';
import { useGameState } from '@/hooks/inGame/useGameState';
import { useGameSubmit } from '@/hooks/inGame/useGameSubmit';
import TopBar from '@/components/Common/TopBar/TopBar';
import Button from '@/components/Common/Button/Button';
import Timer from '@/components/Layout/Game/Timer';
import {
  PageWrapper,
  Footer,
  HintText,
  HintWrapper,
  HintIcon,
} from './game.styles';
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
  const playerId = 1; // TODO: 실제 플레이어 ID를 전역 상태나 세션에서 가져오도록 수정 필요
  const { submitAnswer, isSubmitting } = useGameSubmit();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const {
    currentRound,
    isMapView,
    showBackIcon,
    currentSelectedCoordinate,
    // hint,
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

  // TODO: 백엔드 연동 시 사용
  const handleSubmitAnswer = async () => {
    if (hasSubmitted || !currentSelectedCoordinate) {
      console.log('제출 불가:', { hasSubmitted, currentSelectedCoordinate });
      return;
    }

    const submitData = {
      playerId: playerId,
      roundId: Number(params.round),
      coordinate: [
        currentSelectedCoordinate.lat,
        currentSelectedCoordinate.lng,
      ],
    };

    // 제출 시작과 동시에 버튼 비활성화
    setHasSubmitted(true);
    console.log('제출 시작:', submitData);

    try {
      const success = await submitAnswer(submitData);
      console.log('제출 결과:', success);

      if (!success) {
        console.warn('제출 실패');
        setHasSubmitted(false); // 실패시에만 다시 활성화
        return;
      }

      setCurrentSelectedCoordinate(null);
      console.log('제출 완료');
    } catch (error) {
      console.error('제출 중 에러 발생:', error);
      setHasSubmitted(false); // 에러 발생시에도 다시 활성화
    }
  };

  // 클라이언트 테스트 용
  // const handleSubmitAnswer = async () => {
  //   if (hasSubmitted || !currentSelectedCoordinate) {
  //     console.log('제출 불가:', { hasSubmitted, currentSelectedCoordinate });
  //     return;
  //   }

  //   const submitData = {
  //     roomId: params.roomId,
  //     nickname,
  //     round: currentRound,
  //     coordinate: currentSelectedCoordinate,
  //   };

  //   // 제출 시작과 동시에 버튼 비활성화
  //   setHasSubmitted(true);
  //   console.log('제출 시작:', submitData);

  //   // API 호출 대신 setTimeout으로 테스트
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 딜레이
  //     const mockSuccess = true; // 테스트용 성공 응답

  //     console.log('제출 결과:', mockSuccess);

  //     if (!mockSuccess) {
  //       console.warn('제출 실패');
  //       setHasSubmitted(false);
  //       return;
  //     }

  //     setCurrentSelectedCoordinate(null);
  //     console.log('제출 완료');
  //   } catch (error) {
  //     console.error('제출 중 에러 발생:', error);
  //     setHasSubmitted(false);
  //   }
  // };

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
            {/* 클라이언트 테스트용 힌트 표시 */}
            <HintWrapper>
              <HintIcon>힌트</HintIcon>
              <HintText>문화생활을 할 수 있는 장소</HintText>
            </HintWrapper>
            {/* 개발용 힌트 표시 */}
            {/* {hint && (
              <HintWrapper>
                <HintIcon>힌트</HintIcon>
                <HintText> {hint}</HintText>
              </HintWrapper>
            )} */}
          </>
        )}

        <Footer>
          <Button
            label={isMapView ? '정답 선택하기' : '위치 선택'}
            buttonType={hasSubmitted ? 'gray' : 'purple'}
            buttonSize="large"
            onClick={isMapView ? handleSubmitAnswer : handleShowMap}
            styleType="coloredBackground"
            disabled={
              (isMapView && !currentSelectedCoordinate) ||
              isSubmitting ||
              hasSubmitted
            }
          />
        </Footer>
      </PageWrapper>
    </>
  );
};

export default GamePage;
