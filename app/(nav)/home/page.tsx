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
import LoadingSpinner from '@/components/Common/LoadingSpinner/LoadingSpinner';
import Link from 'next/link';
import { useWebSocketFunctions } from '@/hooks/websocket/useWebsocketFunctions';
import useUserStore from '@/stores/useUserStore';
import InviteNotificationToast from '@/components/Common/Toast/InviteNotificationToast';
import { InviteWebSocketMessage } from '@/lib/types/notification';

const Home = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const {
    character: selectedCharacter,
    setCharacter: setSelectedCharacter,
    isLoading,
  } = useCharacterState();

  /* 웹소켓 연결 실행, 연결 상태 가져오기 */
  const { isConnected, connectWebSocket } = useWebSocketStore();
  /* notification 구독 */
  const { subscribeToNotification } = useWebSocketFunctions();
  /* 사용자 정보 가져오기 */
  const { userId } = useUserStore();

  useEffect(() => {
    if (!isConnected) connectWebSocket();
  }, []);

  useEffect(() => {
    if (isConnected) {
      subscribeToNotification(userId, (message: InviteWebSocketMessage) => {
        console.log('Notification received:', message);

        // Invite 메시지 타입인지 확인합니다.
        if (message.messageType === 'INVITE_PLAYER') {
          const inviteMessage = message as InviteWebSocketMessage;
          if (inviteMessage.payload.action === 'INVITE') {
            console.log('Invite notification received:', inviteMessage.payload);
            InviteNotificationToast({
              senderNickname: inviteMessage.payload.senderNickname,
              targetNickname: inviteMessage.payload.targetNickname,
              roomName: inviteMessage.payload.roomName,
              onAccept: () => {
                // 초대 수락 로직
                console.log('Invitation accepted:', inviteMessage.payload);
                // 서버 API 호출, 소켓 이벤트 등 처리
              },
              onDecline: () => {
                // 초대 거절 로직
                console.log('Invitation declined:', inviteMessage.payload);
                // 서버 API 호출, 소켓 이벤트 등 처리
              },
            });
          }
        }
      });
    }
  }, [isConnected, userId, subscribeToNotification]);

  return (
    <>
      <HomePageWrapper>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
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
        )}
      </HomePageWrapper>
    </>
  );
};

export default Home;
