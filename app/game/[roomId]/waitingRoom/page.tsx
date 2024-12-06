'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { WaitingWrapper, UserList, Footer } from './waitingRoom.styles';
import TopBar from '@/components/Common/TopBar/TopBar';
import Button from '@/components/Common/Button/Button';
import Character from '@/components/Layout/Game/Character';
import useLoadingStore from '@/stores/loadingStore';
import useWebSocketStore, { User } from '@/stores/useWebSocketStore';

const WaitingRoom = () => {
  const router = useRouter();
  const setLoading = useLoadingStore((state) => state.setLoading);
  const { roomId } = useParams();
  const messages = useWebSocketStore((state) => state.messages);
  const latestMessage = messages[messages.length - 1];

  const convertParticipants = (
    participants: {
      nickname: string;
      status: string;
      id: number;
      isHost?: boolean;
      ready?: boolean;
    }[]
  ) => {
    return participants.map((participant, index: number) => ({
      id: index + 1,
      name: participant.nickname,
      isHost: participant.isHost || false,
      isReady: participant.ready || false,
    }));
  };

  useEffect(() => {
    console.log('WebSocket Messages:', messages);
    if (messages.length > 0) {
      console.log(
        '현재 참가 인원 리스트:',
        messages[messages.length - 1].data.waitingRoomParticipants
      );
    }
  }, [messages]);

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (latestMessage?.data.waitingRoomParticipants) {
      const convertedUsers = convertParticipants(
        latestMessage.data.waitingRoomParticipants
      );
      setUsers(convertedUsers);
    }
  }, [messages]);

  // 현재 로그인한 유저 (임시 설정)
  const currentUser = { id: 1, name: users?.[0]?.name ?? 'hi' };

  // 현재 유저가 방장인지 확인
  const isHost = users.some(
    (user) => user.id === currentUser.id && user.isHost
  );

  // 준비 상태 토글 핸들러 추가
  const toggleReady = () => {
    setUsers(
      users.map((user) =>
        user.id === currentUser.id ? { ...user, isReady: !user.isReady } : user
      )
    );
  };

  // 모든 비방장 플레이어가 준비 완료했는지 확인
  const allPlayersReady = users.every((user) => user.isHost || user.isReady);

  // 게임 시작 핸들러 (방장만 가능)
  const startGame = () => {
    if (isHost && users.length >= 2 && allPlayersReady) {
      setLoading(true);
      router.push(`/game/${roomId}/1`); // 게임 화면으로 이동
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
          {isHost ? (
            <Button
              buttonType={allPlayersReady ? 'purple' : 'gray'}
              buttonSize="large"
              buttonHeight="default"
              label={users.length >= 2 ? '게임시작' : '게임시작 대기중...'}
              onClick={startGame}
              styleType="coloredBackground"
            />
          ) : (
            <Button
              buttonType={
                users.find((user) => user.id === currentUser.id)?.isReady
                  ? 'gray'
                  : 'purple'
              }
              buttonSize="large"
              buttonHeight="default"
              label={
                users.find((user) => user.id === currentUser.id)?.isReady
                  ? '준비완료'
                  : '준비하기'
              }
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
