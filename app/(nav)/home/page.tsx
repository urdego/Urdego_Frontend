'use client';

import { useEffect, useState, useRef } from 'react';
import useWebSocketStore from '@/stores/useWebSocketStore';
import { useRouter } from 'next/navigation';
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
import InviteNotificationToast from '@/components/Common/Toast/InviteNotificationToast';
import {
  InviteWebSocketMessage,
  ErrorWebSocketMessage,
} from '@/lib/types/notification';
import { useSession } from 'next-auth/react';
import useGameStore from '@/stores/useGameStore';

const Home = () => {
  const router = useRouter();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const {
    character: selectedCharacter,
    setCharacter: setSelectedCharacter,
    isLoading,
  } = useCharacterState();

  /* 웹소켓 연결 실행, 연결 상태 가져오기 */
  const { isConnected, connectWebSocket } = useWebSocketStore();
  /* notification, room, error 구독 */
  const { subscribeToNotification, subscribeToError } = useWebSocketFunctions();
  /* 사용자 정보 가져오기 */
  const { data: session } = useSession();
  const userId = session?.user?.userId;
  /* notification 상태관리 */
  const [notification, setNotification] =
    useState<InviteWebSocketMessage | null>(null);
  /* 구독 여부 확인 */
  const hasSubscribed = useRef(false);
  /* 대기방 정보 넣기 */
  const { setRoomId } = useGameStore();

  // 소켓 연결 전용 useEffect
  useEffect(() => {
    if (!isConnected) connectWebSocket();
  }, [connectWebSocket, isConnected]);

  // 구독 등록용 useEffect
  useEffect(() => {
    if (!isConnected || hasSubscribed.current || !userId) return;

    hasSubscribed.current = true;
    subscribeToNotification(userId, (message: InviteWebSocketMessage) => {
      console.log('Notification received:', message);
      setNotification(message);
    });

    // 에러 메시지 구독 추가
    subscribeToError((message: ErrorWebSocketMessage) => {
      console.log('Error received:', message);
      // 에러 메시지 처리 로직 추가
    });
  }, [isConnected, subscribeToError, subscribeToNotification]);

  // 메시지 처리용 useEffect (notification 상태 변경 시 실행)
  useEffect(() => {
    if (!notification) return;

    if (notification.messageType === 'INVITE_PLAYER') {
      const inviteMessage = notification;
      if (inviteMessage.payload.action === 'INVITE') {
        console.log('Invite notification received:', inviteMessage.payload);
        InviteNotificationToast({
          senderNickname: inviteMessage.payload.senderNickname,
          targetNickname: inviteMessage.payload.targetNickname,
          roomName: inviteMessage.payload.roomName,
          onAccept: () => {
            console.log('Invitation accepted:', inviteMessage.payload);
            // 대기방 정보 전역 상태에 저장
            setRoomId(inviteMessage.payload.roomId);
            router.push(
              `game/[roomId]/waitingRoom`.replace(
                '[roomId]',
                inviteMessage.payload.roomId
              )
            );
          },
          onDecline: () => {
            console.log('Invitation declined:', inviteMessage.payload);
            // 서버 API 호출, 소켓 이벤트 등 처리
          },
        });
      }
    }
  }, [notification, router, setRoomId]);

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
