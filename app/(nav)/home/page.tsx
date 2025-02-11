'use client';

import { useEffect, useState } from 'react';
import useWebSocketStore from '@/stores/useWebSocketStore';

import { TopWrapper, BottomWrapper } from './Home.styles';
import HomeBox from '@/components/Layout/Home/HomeBox/HomeBox';
import { HomePageWrapper } from '@/app/commonPage.styles';
import Button from '@/components/Common/Button/Button';
import EnterArrowIcon from '@/styles/Icon/Home/EnterArrowIcon.svg';
import UserCharacter from '@/components/Layout/Home/Character/UserCharacter';
import { useCharacterState } from '@/hooks/character/useCharacterState';
import useUserStore from '@/stores/useUserStore';
import LoadingSpinner from '@/components/Common/LoadingSpinner/LoadingSpinner';
import Link from 'next/link';

const Home = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { character: selectedCharacter, setCharacter: setSelectedCharacter } =
    useCharacterState();
  const activeCharacter = useUserStore((state) => state.activeCharacter);

  /* 웹소켓 연결 실행, 연결 상태 가져오기 */
  const { isConnected, connectWebSocket } = useWebSocketStore();

  useEffect(() => {
    if (!isConnected) connectWebSocket();
  }, []);

  useEffect(() => {
    console.log('홈 페이지 - 활성 캐릭터:', activeCharacter);
  }, [activeCharacter]);

  return (
    <>
      <HomePageWrapper>
        {activeCharacter ? ( // activeCharacter가 빈 문자열이 아닐 때만 렌더링
          <>
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
              <Link href="/waitingRoomList">
                <Button
                  label="방 입장하기"
                  icon={EnterArrowIcon}
                  buttonHeight="long"
                  $iconPosition="right"
                  disabled={!isConnected}
                />
              </Link>
            </BottomWrapper>
          </>
        ) : (
          <LoadingSpinner />
        )}
      </HomePageWrapper>
    </>
  );
};

export default Home;
