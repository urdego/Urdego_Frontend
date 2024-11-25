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

  // 더미 유저 데이터
  const dummyUsers = [
    { id: 1, name: '눈사람', isHost: true },
    { id: 2, name: '쪼꼬미', isHost: false },
    { id: 3, name: '곽두팔씨', isHost: false },
    { id: 4, name: '귀요미', isHost: false },
    { id: 5, name: '군침이싹', isHost: false },
    { id: 6, name: '강낭콩', isHost: false },
  ];

  const [users, setUsers] = useState(dummyUsers);

  // 현재 로그인한 유저 (임시 설정)
  const currentUser = { id: 1, name: '어데고' }; // TODO: 인증 데이터와 연동 필요

  // 현재 유저가 방장인지 확인
  const isHost = users.some(
    (user) => user.id === currentUser.id && user.isHost
  );

  // 게임 시작 핸들러 (방장만 가능)
  const startGame = () => {
    if (isHost && users.length >= 2) {
      router.push(`/game/${roomId}/1`); // 게임 화면으로 이동
    }
  };

  return (
    <>
      <WaitingWrapper>
        <TopBar label="게임 대기방" />
        <UserList>
          <Character users={users} />
        </UserList>
        <Footer>
          {isHost ? (
            <Button
              buttonType="purple"
              buttonSize="large"
              buttonHeight="default"
              label={users.length >= 2 ? '게임시작' : '게임시작 대기중...'}
              onClick={startGame}
              styleType="coloredBackground"
            />
          ) : (
            <Button
              buttonType="gray"
              buttonSize="large"
              buttonHeight="default"
              label="게임 시작 대기 중..."
              styleType="coloredBackground"
            />
          )}
        </Footer>
      </WaitingWrapper>
    </>
  );
};

export default WaitingRoom;
