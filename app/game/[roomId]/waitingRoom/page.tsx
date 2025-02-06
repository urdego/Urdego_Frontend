'use client';

import { useState } from 'react';
import { WaitingWrapper, UserList, Footer } from './waitingRoom.styles';
import TopBar from '@/components/Common/TopBar/TopBar';
import PositionCard from '@/components/Layout/WaitingRoom/PositionCard';
import { showReadyToast } from '@/components/Common/Toast/ReadyToast';
import ContentsBox from '@/styles/Icon/ContentsBox.png';
import WButton from '@/components/Layout/WaitingRoom/WButton';
import AddContents from '@/components/Layout/AddContents/AddContents';

const WaitingRoom = () => {
  // 모달 상태 관리
  const [isAddContentsVisible, setIsAddContentsVisible] = useState(false);

  // Mock 데이터 사용
  const mockData = {
    currentUser: { name: '테스트유저', isReady: false },
    isManager: true,
    allPlayersReady: false,
    users: [
      { id: 1, name: '유저1', isHost: true, isReady: true },
      { id: 2, name: '유저2', isHost: false, isReady: true },
      { id: 3, name: '유저3', isHost: false, isReady: false },
      { id: 4, name: '유저4', isHost: false, isReady: false },
      { id: 5, name: '유저5', isHost: false, isReady: true },
    ],
  };

  const { currentUser, isManager, allPlayersReady, users } = mockData;
  const toggleReady = () => console.log('준비하기 클릭');
  const startGame = () => {
    if (!allPlayersReady) {
      showReadyToast('아직 모든 팀원이 준비되지 않았습니다.');
      return;
    }
    console.log('게임 시작');
  };

  return (
    <>
      <TopBar label="게임 대기방" NavType="room" exitIcon />
      <WaitingWrapper>
        <UserList>
          {users.map((user) => (
            <PositionCard
              key={user.id}
              username={user.name}
              isHost={user.isHost}
              isReady={user.isReady}
            />
          ))}
          {Array.from({ length: Math.max(0, 6 - users.length) }).map(
            (_, index) => (
              <PositionCard key={`empty-${index}`} isEmpty={true} />
            )
          )}
        </UserList>
        <Footer>
          {/* 왼쪽 - 컨텐츠 버튼 */}
          <WButton
            buttonType="icon"
            icon={ContentsBox}
            onClick={() => setIsAddContentsVisible((prev) => !prev)}
          />

          {/* 오른쪽 - 준비 완료 버튼 */}
          <WButton
            buttonType="default"
            label="준비완료"
            onClick={toggleReady}
          />
        </Footer>
      </WaitingWrapper>

      {/* 컨텐츠 추가 모달 */}
      <AddContents
        isVisible={isAddContentsVisible}
        setIsVisible={setIsAddContentsVisible}
        title="장소 선택(최대 5개)"
      />
    </>
  );
};

export default WaitingRoom;
