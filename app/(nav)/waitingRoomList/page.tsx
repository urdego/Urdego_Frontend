'use client';

import { useState } from 'react';
import TopBar from '@/components/Common/TopBar/TopBar';
import { WaitingRoomListPageWrapper } from '@/app/commonPage.styles';
import {
  RoomButtonGrid,
  ListTitle,
  SubTitle,
  Footer,
} from './waitingRoomList.styles';
import { RefreshIcon } from '@/components/Common/RoomButton/WaitingRoomListIcon';
import useGetWaitingRoomList from '@/hooks/waitingRoomList/useGetWaitingRoomList';
import DotLoadingSpinner from '@/components/Common/LoadingSpinner/DotLoadingSpinner';
import RoomButtonList from '@/components/Common/RoomButton/RoomButtonList';
import Button from '@/components/Common/Button/Button';
import CreateRoomBottomSheet from '@/components/Layout/MakeRoom/CreateRoomBottomSheet';
import useUserStore from '@/stores/useUserStore'; // Zustand에서 유저 정보 가져오기

const WaitingRoomList = () => {
  const { waitingRoomList, isLoading, fetchWaitingRoomList } =
    useGetWaitingRoomList();

  const { userId } = useUserStore(); // Zustand에서 유저 ID 가져오기
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [buttonType, setButtonType] = useState<'purple' | 'gray'>('purple');
  const [buttonLabel, setButtonLabel] = useState('방 만들기');
  const [roomTitle, setRoomTitle] = useState('');
  const [totalRounds, setTotalRounds] = useState(1); // 라운드 기본값 1
  const MAX_PLAYERS = 6; // 항상 6으로 고정

  // 방 만들기 버튼 클릭 (기능 변경)
  const handleButtonClick = async () => {
    if (!isBottomSheetOpen) {
      // 바텀시트가 닫혀있으면 열기
      setIsBottomSheetOpen(true);
      setButtonType('gray'); // 바텀시트 열릴 때 버튼을 gray로 변경
      return;
    }

    if (!roomTitle.trim()) {
      alert('방 제목을 입력해주세요.');
      return;
    }

    // 방 생성 API 요청
    try {
      const requestData = {
        userId,
        roomName: roomTitle,
        maxPlayers: MAX_PLAYERS,
        totalRounds,
      };

      console.log('방 생성 요청 데이터:', requestData);

      const response = await fetch('/api/makeRoom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('방 생성 실패');
      }

      const result = await response.json();
      console.log('방 생성 응답 데이터:', result);

      fetchWaitingRoomList(); // 방 목록 새로고침
      handleCloseBottomSheet();
    } catch (error) {
      console.error('방 생성 오류:', error);
    }
  };

  // 방 제목 입력 핸들러
  const handleRoomTitleChange = (title: string) => {
    setRoomTitle(title);
    if (title.trim() !== '') {
      setButtonType('purple'); // 방 제목이 입력되면 보라색 버튼 활성화
      setButtonLabel('버튼을 누르면 방이 생성됩니다');
    } else {
      setButtonType('gray'); // 방 제목이 비어있으면 회색 버튼 유지
      setButtonLabel('방 만들기');
    }
  };

  // 라운드 변경 핸들러
  const handleTotalRoundsChange = (rounds: number) => {
    setTotalRounds(rounds);
  };

  // 바텀시트 닫기 (초기화)
  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
    setButtonType('purple'); // 초기 상태로 복구
    setButtonLabel('방 만들기'); // 초기 텍스트 복구
    setRoomTitle(''); // 방 제목 초기화
    setTotalRounds(1); // 라운드 초기화
  };

  return (
    <>
      <TopBar NavType="default" label="대기방" />
      <WaitingRoomListPageWrapper>
        <SubTitle>
          <ListTitle>참여 가능한 방</ListTitle>
          <RefreshIcon onClick={fetchWaitingRoomList} />
        </SubTitle>
        <RoomButtonGrid>
          {isLoading ? (
            <DotLoadingSpinner color="white" />
          ) : (
            <RoomButtonList waitingRoomList={waitingRoomList} />
          )}
        </RoomButtonGrid>
      </WaitingRoomListPageWrapper>
      <Footer>
        <Button
          label={buttonLabel}
          buttonType={buttonType}
          buttonSize="large"
          buttonHeight="default"
          styleType="coloredBackground"
          onClick={handleButtonClick} // 바텀시트 열기 또는 방 생성
        />
      </Footer>

      {/* 바텀시트 */}
      {isBottomSheetOpen && (
        <CreateRoomBottomSheet
          isOpen={isBottomSheetOpen}
          setIsOpen={handleCloseBottomSheet}
          onRoomTitleChange={handleRoomTitleChange}
          onTotalRoundsChange={handleTotalRoundsChange}
        />
      )}
    </>
  );
};

export default WaitingRoomList;
