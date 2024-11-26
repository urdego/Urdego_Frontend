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
    roomId: string;
    round: string;
  };
}

const GamePage = ({ params }: GamePageProps) => {
  const router = useRouter();
  const [currentRound, setCurrentRound] = useState(Number(params.round) || 1); // 현재 라운드 상태
  const [isMapView, setIsMapView] = useState(false); // 지도 화면 여부
  const [timeLeft, setTimeLeft] = useState(10); // 10초 타이머
  const [showBackIcon, setShowBackIcon] = useState(false); // 뒤로가기 아이콘 표시 여부
  const [currentSelectedCoordinate, setCurrentSelectedCoordinate] =
    useState<google.maps.LatLngLiteral | null>(null); // 현재 라운드에서 선택한 좌표
  const [nickname, setNickname] = useState('어데고'); // 사용자 닉네임

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
    // 다음 라운드로 이동
    router.push(`/game/${params.roomId}/${currentRound}/roundRank`);
    setCurrentSelectedCoordinate(null); // 현재 선택 좌표 초기화
  };

  const handleSubmitAnswer = async () => {
    // 타이머 종료 후, 좌표가 선택되지 않으면 전송 불가
    const coordinateData = {
      roomId: params.roomId, // 현재 게임 방 ID
      nickname: nickname, // 사용자의 닉네임
      round: currentRound, // 현재 라운드
      coordinate: currentSelectedCoordinate ?? null, // 좌표 선택 여부에 따라 null로 설정
    };

    console.log('전송할 데이터:', coordinateData);

    try {
      const response = await fetch('http://localhost:5000/game/coordinates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(coordinateData), // 객체 데이터 전송
      });

      if (response.ok) {
        console.log('좌표 전송 성공');
        setCurrentSelectedCoordinate(null); // 현재 선택 좌표 초기화
      } else {
        console.error('좌표 전송 실패');
      }
    } catch (error) {
      console.error('네트워크 오류:', error);
    }
  };

  const handleShowMap = () => {
    setIsMapView(true); // 지도로 전환
    setShowBackIcon(true); // 지도 화면에서는 뒤로가기 아이콘 표시
  };

  const handleBackClick = () => {
    if (isMapView) {
      setIsMapView(false); // 지도에서 이미지로 전환
      setShowBackIcon(false); // 뒤로가기 아이콘 숨기기
    }
  };

  // 좌표 선택 핸들러
  const handleCoordinateSelect = (
    coordinate: google.maps.LatLngLiteral | null
  ) => {
    console.log('좌표 선택됨:', coordinate);
    setCurrentSelectedCoordinate(coordinate); // 현재 선택된 좌표 업데이트
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
      <TimerContainer>
        <TimerText>{timeLeft}초</TimerText>
        <ProgressBar progress={(timeLeft / 10) * 100} />
      </TimerContainer>

      {/* 이미지 슬라이드 (처음에는 Swiper 컴포넌트로 이미지 띄우기) */}
      {isMapView ? (
        <MapComponent mode="game" onCoordinateSelect={handleCoordinateSelect} />
      ) : (
        <SwiperComponent />
      )}

      <Footer>
        {isMapView ? (
          <Button
            label="정답 선택하기"
            buttonSize="large"
            onClick={handleSubmitAnswer}
            styleType="coloredBackground"
            disabled={!currentSelectedCoordinate} // 좌표 선택 전까지 비활성화
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
