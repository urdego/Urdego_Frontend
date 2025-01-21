'use client';

import { useState } from 'react';
import { WaitingWrapper, UserList, Footer } from './waitingRoom.styles';
import TopBar from '@/components/Common/TopBar/TopBar';
import Button from '@/components/Common/Button/Button';
import PositionCard from '@/components/Layout/WaitingRoom/PositionCard';
import { showReadyToast } from '@/components/Common/Toast/ReadyToast';
import InviteUser from '@/components/Layout/InviteUser/InviteUser';

const WaitingRoom = () => {
  const mockData = {
    currentUser: { name: '테스트유저', isReady: false },
    isManager: true,
    allPlayersReady: false,
    users: [
      { id: 1, name: '유저1', isHost: true, isReady: true },
      { id: 2, name: '유저2', isHost: false, isReady: true },
      { id: 3, name: '유저3', isHost: false, isReady: false },
      { id: 4, name: '유저4', isHost: false, isReady: false },
      // { id: 5, name: '유저5', isHost: false, isReady: false },
      // { id: 6, name: '유저6', isHost: false, isReady: false },
    ],
  };

  const { currentUser, isManager, allPlayersReady, users } = mockData;

  const [isInviteVisible, setInviteVisible] = useState(false);

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
              level={1}
              username={user.name}
              isHost={user.isHost}
              isReady={user.isReady}
              isEmpty={false}
            />
          ))}
          {Array.from({ length: Math.max(0, 6 - users.length) }).map(
            (_, index) => (
              <PositionCard
                key={`empty-${index}`}
                isEmpty={true}
                onClick={() => setInviteVisible(true)} // 빈 카드 클릭 이벤트
              />
            )
          )}
        </UserList>
        <Footer>
          {isManager ? (
            <Button
              buttonType={
                allPlayersReady && users.length >= 2 ? 'purple' : 'gray'
              }
              buttonSize="large"
              buttonHeight="default"
              label={users.length >= 2 ? '게임시작' : '게임시작 대기중...'}
              onClick={startGame}
              styleType="coloredBackground"
            />
          ) : (
            <Button
              buttonType={currentUser?.isReady ? 'gray' : 'purple'}
              buttonSize="large"
              buttonHeight="default"
              label={currentUser?.isReady ? '준비완료' : '준비하기'}
              onClick={toggleReady}
              styleType="coloredBackground"
            />
          )}
        </Footer>
      </WaitingWrapper>
      {isInviteVisible && <InviteUser setInviteVisible={setInviteVisible} />}
    </>
  );
};

export default WaitingRoom;
