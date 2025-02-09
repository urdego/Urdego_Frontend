'use client';

import { useState } from 'react';
import {
  WaitingWrapper,
  UserList,
  Footer,
  FullScreenImage,
  FullScreenImageWrapper,
} from './waitingRoom.styles';
import TopBar from '@/components/Common/TopBar/TopBar';
import PositionCard from '@/components/Layout/WaitingRoom/PositionCard';
import ContentsBox from '@/styles/Icon/ContentsBox.png';
import WButton from '@/components/Layout/WaitingRoom/WButton';
import AddContents from '@/components/Layout/AddContents/AddContents';
import InviteUser from '@/components/Layout/InviteUser/InviteUser';
import WRoomAssistance from '@/styles/Image/WaitingRoom/wRoomAssistance.png';
import { AlertToast } from '@/components/Common/Toast/AlertToast';

const WaitingRoom = () => {
  const [isAddContentsVisible, setIsAddContentsVisible] = useState(false);
  const [isInviteVisible, setIsInviteVisible] = useState(false);
  const [showWaitingRoom, setShowWaitingRoom] = useState(false);

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

  const { users } = mockData;

  const toggleReady = () => {
    const allReady = users.every((user) => user.isReady);
    if (!allReady) {
      AlertToast({
        message: '모든 유저가 준비 완료 상태여야 합니다.',
      });
      return;
    }
    console.log('준비하기 클릭');
  };

  return (
    <>
      {!showWaitingRoom ? (
        <FullScreenImageWrapper onClick={() => setShowWaitingRoom(true)}>
          <FullScreenImage src={WRoomAssistance.src} alt="Assistance Image" />
        </FullScreenImageWrapper>
      ) : (
        <>
          <TopBar label="방제목" NavType="room" exitIcon />
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
                  <PositionCard
                    key={`empty-${index}`}
                    isEmpty={true}
                    onClick={() => setIsInviteVisible(true)}
                  />
                )
              )}
            </UserList>
            <Footer>
              <WButton
                buttonType="icon"
                icon={ContentsBox}
                onClick={() => setIsAddContentsVisible((prev) => !prev)}
              />
              <WButton
                buttonType="default"
                label="준비완료"
                onClick={toggleReady}
              />
            </Footer>
          </WaitingWrapper>
          <AddContents
            isVisible={isAddContentsVisible}
            setIsVisible={setIsAddContentsVisible}
            title="장소 선택"
          />
          {isInviteVisible && (
            <InviteUser setInviteVisible={setIsInviteVisible} />
          )}
        </>
      )}
    </>
  );
};

export default WaitingRoom;
