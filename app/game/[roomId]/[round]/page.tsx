'use client';
import { useRouter } from 'next/navigation';
import { useGameState } from '@/hooks/inGame/useGameState';

import useUserStore from '@/stores/useUserStore';
import TopBar from '@/components/Common/TopBar/TopBar';
import Button from '@/components/Common/Button/Button';
import Timer from '@/components/Layout/Game/Timer';

import MapBottomSheet from '@/components/Layout/Game/MapBottomSheet';

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

import SwiperComponent from '@/components/Layout/Game/Swiper';
import { useCallback, useState } from 'react';

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

  // const { submitAnswer, isSubmitting } = useGameSubmit();
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
  // const handleSubmitAnswer = async () => {
  //   if (hasSubmitted || !currentSelectedCoordinate) {
  //     console.log('제출 불가:', { hasSubmitted, currentSelectedCoordinate });
  //     return;
  //   }

  //   const submitData = {
  //     nickname: nickname || '',
  //     roundId: Number(params.round),
  //     coordinate: [
  //       currentSelectedCoordinate.lat,
  //       currentSelectedCoordinate.lng,
  //     ],
  //   };

  //   // 제출 시작과 동시에 버튼 비활성화
  //   setHasSubmitted(true);
  //   console.log('제출 시작:', submitData);

  //   try {
  //     const success = await submitAnswer(submitData);
  //     console.log('제출 결과:', success);

  //     if (!success) {
  //       console.warn('제출 실패');
  //       setHasSubmitted(false); // 실패시에만 다시 활성화
  //       return;
  //     }

  //     setCurrentSelectedCoordinate(null);
  //     console.log('제출 완료');
  //   } catch (error) {
  //     console.error('제출 중 에러 발생:', error);
  //     setHasSubmitted(false); // 에러 발생시에도 다시 활성화
  //   }
  // };

  // 클라이언트 테스트 용

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

    // API 호출 대신 setTimeout으로 테스트
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 딜레이
      const mockSuccess = true; // 테스트용 성공 응답

      console.log('제출 결과:', mockSuccess);

      if (!mockSuccess) {
        console.warn('제출 실패');
        setHasSubmitted(false);
        return;
      }

      submitAnswer(submitData);

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

        {/* 기본 뷰 (스와이퍼와 힌트) */}
        <SwiperComponent />
        {roundState.hint && (
          <HintWrapper>
            <HintIcon>힌트</HintIcon>
            <HintText> {roundState.hint}</HintText>
          </HintWrapper>
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
            label={isBottomSheetOpen ? '정답 선택하기' : '위치 선택'}
            buttonType={hasSubmitted ? 'gray' : 'purple'}
            buttonSize="large"
            onClick={toggleBottomSheet}
            styleType="coloredBackground"
            disabled={hasSubmitted}
            disabled={(isMapView && !currentSelectedCoordinate) || hasSubmitted}
          />
        </Footer>
      </PageWrapper>

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
