'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { WaitingWrapper, UserList, Footer } from './waitingRoom.styles';
import TopBar from '@/components/Common/TopBar/TopBar';
import Button from '@/components/Common/Button/Button';
import Character from '@/components/Layout/Game/Character';

const WaitingRoom = () => {
  const router = useRouter();
  const { roomId } = useParams();

  // 더미 유저 데이터 (데이터 변경하면서 테스트)
  const dummyUsers = [
    { id: 1, name: '눈사람', isHost: true, isReady: true },
    { id: 2, name: '쪼꼬미', isHost: false, isReady: true },
    { id: 3, name: '곽두팔씨', isHost: false, isReady: true },
    { id: 4, name: '귀요미', isHost: false, isReady: true },
    { id: 5, name: '군침이싹', isHost: false, isReady: true },
    { id: 6, name: '강낭콩', isHost: false, isReady: true },
  ];

  const [users, setUsers] = useState(dummyUsers);

  // 현재 로그인한 유저 (임시 설정)
  const currentUser = { id: 1, name: '눈사람' }; // TODO: 인증 데이터와 연동 필요

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
