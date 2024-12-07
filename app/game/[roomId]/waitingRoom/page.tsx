'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { WaitingWrapper, UserList, Footer } from './waitingRoom.styles';
import TopBar from '@/components/Common/TopBar/TopBar';
import Button from '@/components/Common/Button/Button';
import Character from '@/components/Layout/Game/Character';
import useLoadingStore from '@/stores/loadingStore';
import useWebSocketStore from '@/stores/useWebSocketStore';
import WaitingRoomWebSocket from '@/lib/websocket/waittingRoomWebsocket';
import useUserStore from '@/stores/useUserStore';

const WaitingRoom = () => {
  const router = useRouter();
  const setLoading = useLoadingStore((state) => state.setLoading);
  const { roomId } = useParams();
  const { messages, users } = useWebSocketStore();
  const nickname = useUserStore((state) => state.nickname);
  const latestMessage = messages[messages.length - 1];

  useEffect(() => {
    if (latestMessage?.data.waitingRoomParticipants) {
      console.log(
        '현재 참가 인원 리스트:',
        latestMessage.data.waitingRoomParticipants
      );
    }
  }, [latestMessage]);

  // 현재 로그인한 유저 찾기
  const currentUser = users.find((user) => user.name === nickname);
  console.log('Current user:', currentUser);

  // 현재 유저의 역할 확인
  const isManager = currentUser?.role === 'MANAGER';
  console.log('Is manager:', isManager);

  // 준비 상태 토글 핸들러
  const toggleReady = () => {
    if (!currentUser) return;

    const wsClient = WaitingRoomWebSocket.getInstance();
    console.log('Toggling ready status. Current status:', currentUser.isReady);

    wsClient.sendEvent({
      eventType: 'READY',
      data: {
        nickname: currentUser.name,
        role: currentUser.isReady ? 'notReady' : 'Ready',
      },
    });
  };

  // 모든 MEMBER 플레이어가 준비 완료했는지 확인
  const allPlayersReady = users.every(
    (user) => user.role === 'MANAGER' || user.isReady
  );

  // 게임 시작 핸들러 (MANAGER만 가능)
  const startGame = () => {
    if (isManager && users.length >= 2 && allPlayersReady) {
      setLoading(true);
      router.push(`/game/${roomId}/1`);
    }
  };

  return (
    <>
      <TopBar label="게임 대기방" NavType="room" exitIcon />
      <WaitingWrapper>
        <UserList>
          <Character users={users} />
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
              disabled={!allPlayersReady || users.length < 2}
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
    </>
  );
};

export default WaitingRoom;
