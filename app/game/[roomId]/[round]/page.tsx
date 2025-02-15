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
import { WebSocketMessage } from '@/hooks/websocket/useWebsocket.types';
import SwiperTestImage from '@/styles/Image/InGame/SwiperTestImage.png';
import useUserStore from '@/stores/useUserStore';
interface GamePageProps {
  params: {
    roomId: string;
    round: string;
  };
}

const GamePage = ({ params }: GamePageProps) => {
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(false); // 정답 제출 여부 상태
  const [isReportOpen, setIsReportOpen] = useState(false); // 신고 바텀시트 열림 상태
  const { subscribeToRoom, sendMessage } = useWebSocketFunctions(); // WebSocket 함수 가져오기
  const [messages, setMessages] = useState<WebSocketMessage[]>([]); // 수신된 WebSocket 메시지 저장
  const [hint, setHint] = useState<string>(''); // 힌트 상태
  const [contents, setContents] = useState<string[]>([]); // 콘텐츠 상태

  const handleReportClick = useCallback(() => {
    console.log('Report clicked');
    setIsReportOpen(true); // 신고 바텀시트 열기
  }, []);

  const {
    currentRound,
    isMapView,
    showBackIcon,
    currentSelectedCoordinate,
    setCurrentSelectedCoordinate,
    handleBackClick,
  } = useGameState(Number(params.round)); // 게임 상태 관리 훅 사용

  // WebSocket 구독 설정
  useEffect(() => {
    subscribeToRoom(params.roomId, (message: WebSocketMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]); // 메시지 수신 시 상태 업데이트
    });
  }, [params.roomId, subscribeToRoom]);

  // 메시지 수신 후 상태 업데이트
  useEffect(() => {
    const questionMessage = messages.find(
      (msg) =>
        msg.messageType === 'QUESTION_GIVE' &&
        msg.payload.roundNum === currentRound
    );

    if (questionMessage) {
      console.log('Received question:', questionMessage.payload);
      const receivedContents = questionMessage.payload.contents;
      const updatedContents =
        receivedContents.length > 0 ? receivedContents : [SwiperTestImage.src]; // 콘텐츠 업데이트
      console.log('Updated contents:', updatedContents);
      setContents(updatedContents);
      setHint(questionMessage.payload.hint); // 힌트 업데이트
    }
  }, [messages, currentRound]);

  // 다음 라운드로 이동
  const handleNextRound = useCallback(() => {
    router.push(`/game/${params.roomId}/${currentRound}/roundRank`);
    setCurrentSelectedCoordinate(null); // 선택된 좌표 초기화
  }, [router, params.roomId, currentRound, setCurrentSelectedCoordinate]);

  // 좌표 선택 처리
  const handleCoordinateSelect = (
    coordinate: google.maps.LatLngLiteral | null
  ) => {
    console.log('선택된 좌표:', coordinate);
    setCurrentSelectedCoordinate(coordinate); // 선택된 좌표 상태 업데이트
  };

  // 정답 제출 처리
  const handleSubmitAnswer = async () => {
    if (hasSubmitted || !currentSelectedCoordinate) {
      console.log('제출 불가:', { hasSubmitted, currentSelectedCoordinate });
      return;
    }

    setHasSubmitted(true); // 제출 상태 업데이트

    try {
      const questionId = `${params.roomId}:${currentRound}`; // TODO: 질문 아이디 관리 필요
      const userId = useUserStore.getState().userId;
      const { lat, lng } = currentSelectedCoordinate || { lat: 0, lng: 0 };
      sendMessage(
        'ANSWER_SUBMIT',
        {
          questionId,
          userId,
          latitude: lat,
          longitude: lng,
        },
        'game' // 메시지 전송 경로 설정
      );
      setCurrentSelectedCoordinate(null); // 선택된 좌표 초기화
      console.log('제출 완료');
    } catch (error) {
      console.error('제출 중 에러 발생:', error);
      setHasSubmitted(false); // 에러 발생 시 제출 상태 초기화
    }
  };

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false); // 바텀시트 열림 상태

  const toggleBottomSheet = () => {
    setIsBottomSheetOpen((prev) => !prev); // 바텀시트 열림 상태 토글
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
              contents={contents} // WebSocket 응답에서 받은 contents 전달
              key={currentRound}
            />
            <HintWrapper>
              <HintText>{hint}</HintText> {/* 힌트 표시 */}
            </HintWrapper>
          </>
        )}
        <Footer>
          <Button
            label={isBottomSheetOpen ? '정답 선택' : '위치 선택'}
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
