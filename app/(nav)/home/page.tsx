'use client';

import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';

import { TopWrapper, BottomWrapper } from './Home.styles';
import HomeBox from '@/components/Layout/Home/HomeBox/HomeBox';
import { HomePageWrapper } from '@/app/commonPage.styles';
import Button from '@/components/Common/Button/Button';
import EnterArrowIcon from '@/styles/Icon/Home/EnterArrowIcon.svg';
import UserCharacter from '@/components/Layout/Home/Character/UserCharacter';
import { useCharacterState } from '@/hooks/character/useCharacterState';

const WEBSOCKET_URL = 'wss://urdego.site/urdego/connect';

const Home = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { character: selectedCharacter, setCharacter: setSelectedCharacter } =
    useCharacterState();

  /* 웹소켓 연결 */
  const socketClientRef = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!socketClientRef.current) {
      console.log('웹소켓 연결 시도...');

      const client = new Client({
        brokerURL: WEBSOCKET_URL,
        reconnectDelay: 5000, // 자동 재연결 (5초 후)
        onConnect: () => {
          console.log('웹소켓 연결 성공!');
          socketClientRef.current = client;
          setIsConnected(true);
        },
        onStompError: (frame) => {
          console.error('STOMP 오류 발생:', frame);
        },
      });

      client.activate();
    } else {
      console.log('웹소켓이 이미 연결된 상태입니다.');
    }

    return () => {
      console.log('페이지 언마운트: 웹소켓 연결 유지');
    };
  }, []);

  return (
    <>
      <HomePageWrapper>
        <TopWrapper>
          <UserCharacter
            selectedCharacter={selectedCharacter}
            isOpen={isBottomSheetOpen}
          />
        </TopWrapper>
        <BottomWrapper>
          <HomeBox
            selectedCharacter={selectedCharacter}
            setSelectedCharacter={setSelectedCharacter}
            setIsBottomSheetOpen={setIsBottomSheetOpen}
            isBottomSheetOpen={isBottomSheetOpen}
          />
          <Button
            label="방 입장하기"
            icon={EnterArrowIcon}
            buttonHeight="long"
            $iconPosition="right"
            disabled={!isConnected}
          />
        </BottomWrapper>
      </HomePageWrapper>
    </>
  );
};

export default Home;
