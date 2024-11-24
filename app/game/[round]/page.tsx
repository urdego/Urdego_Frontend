'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // useRouter 훅 사용
import TopBar from '@/components/Common/TopBar/TopBar';
import Button from '@/components/Common/Button/Button';
import ProgressBar from '@/components/Layout/Game/ProgressBar';
import { PageWrapper, Footer, TimerContainer, TimerText } from './game.styles';
import SwiperComponent from '@/components/Layout/Game/Swiper';

const GamePage = ({ params }: { params: { round: string } }) => {
  const router = useRouter(); // useRouter 훅 사용
  const [currentRound, setCurrentRound] = useState(Number(params.round) || 1); // 현재 라운드 상태
  const [isMapView, setIsMapView] = useState(false); // 지도 화면 여부
  const [timeLeft, setTimeLeft] = useState(20); // 60초 타이머 상태(Test는 20초로 진행)
  const [showBackIcon, setShowBackIcon] = useState(false); // 뒤로가기 아이콘 표시 여부

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
    if (currentRound < 3) {
      const nextRound = currentRound + 1;

      // 먼저 setCurrentRound을 처리한 후, 라운드가 바뀐 후에 URL 변경
      setCurrentRound(nextRound);
      setIsMapView(false); // 다음 라운드는 이미지 화면으로 시작
      setShowBackIcon(false); // 뒤로가기 아이콘 숨김
      setTimeLeft(60); // 새로운 라운드 시작 시 타이머 초기화

      // 상태가 업데이트된 후, 라우팅 진행
      setTimeout(() => {
        router.push(`/game/${nextRound}`);
      }, 0); // 0ms 후에 라우팅 호출, 상태가 업데이트된 후에 URL 변경
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

      {/* 타이머와 게이지 */}
      <TimerContainer>
        <TimerText>{timeLeft}초</TimerText>
        <ProgressBar progress={(timeLeft / 20) * 100} />
      </TimerContainer>

      {/* 이미지 슬라이드 (처음에는 Swiper 컴포넌트로 이미지 띄우기) */}
      {!isMapView && <SwiperComponent />}

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
    </PageWrapper>
  );
};

export default GamePage;
