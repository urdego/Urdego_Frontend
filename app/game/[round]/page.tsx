'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/Common/TopBar/TopBar';
import Button from '@/components/Common/Button/Button';
import ProgressBar from '@/components/Layout/Game/ProgressBar';
import { PageWrapper, Footer, TimerContainer, TimerText } from './game.styles';
import SwiperComponent from '@/components/Layout/Game/Swiper';
import MapComponent from '@/components/Layout/Game/GoogleMap';

interface GamePageProps {
  params: {
    round: string;
  };
}

const GamePage = ({ params }: GamePageProps) => {
  const router = useRouter();
  const [currentRound, setCurrentRound] = useState(Number(params.round) || 1); // 현재 라운드 상태
  const [isMapView, setIsMapView] = useState(false); // 지도 화면 여부
  const [timeLeft, setTimeLeft] = useState(100); // 60초 타이머 상태(Test는 20초로 진행)
  const [showBackIcon, setShowBackIcon] = useState(false); // 뒤로가기 아이콘 표시 여부
  const [maxRounds, setMaxRounds] = useState(2); // 최대 라운드 수(테스트 용 3라운드로 설정)

  // 타이머 로직
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(timer);
        handleNextRound(); // 타이머가 0이 되면 자동으로 다음 라운드로 넘어감
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [currentRound]);

  const handleNextRound = () => {
    if (currentRound < maxRounds) {
      // 라운드가 끝나면 roundRank로 이동
      router.push(`/game/${currentRound}/roundRank`);
    } else {
      // 마지막 라운드인 경우 totalRank로 이동
      router.push('/game/totalRank');
    }
  };

  const handleShowMap = () => {
    setIsMapView(true); // 지도로 전환
    setShowBackIcon(true); // 지도 화면에서는 뒤로가기 아이콘 표시
  };

  // 뒤로가기 버튼 클릭 시 페이지 이동 없이 상태만 변경
  const handleBackClick = () => {
    if (isMapView) {
      setIsMapView(false); // 지도에서 이미지로 전환
      setShowBackIcon(false); // 뒤로가기 아이콘 숨기기
    }
  };

  return (
    <>
      <PageWrapper>
        <TopBar
          NavType="game"
          label={`${currentRound} 라운드`}
          backIcon={showBackIcon} // 뒤로가기 아이콘 상태 전달
          alarmIcon={false}
          friendIcon={false}
          isMapView={isMapView}
          onBackClick={handleBackClick}
        />
      </PageWrapper>
      {/* 타이머와 게이지 */}
      <TimerContainer>
        <TimerText>{timeLeft}초</TimerText>
        <ProgressBar progress={(timeLeft / 100) * 100} />
      </TimerContainer>

      {/* 이미지 슬라이드 (처음에는 Swiper 컴포넌트로 이미지 띄우기) */}
      {isMapView ? <MapComponent /> : <SwiperComponent />}

      {/* 하단 버튼 */}
      <Footer>
        {isMapView ? (
          <Button
            label="정답 선택하기"
            buttonSize="large"
            onClick={handleNextRound}
            styleType="coloredBackground"
          />
        ) : (
          <Button
            label="위치 선택"
            buttonSize="large"
            onClick={handleShowMap}
            styleType="coloredBackground"
          />
        )}
      </Footer>
    </>
  );
};

export default GamePage;
