'use client';

import { useState, useEffect, useRef } from 'react';
import {
  WaitingWrapper,
  UserList,
  Footer,
  FullScreenImage,
  FullScreenImageWrapper,
} from './waitingRoom.styles';
import TopBar from '@/components/Common/TopBar/TopBar';
import PositionCard from '@/components/Layout/WaitingRoom/PositionCard';
import ContentsBox from '@/styles/Icon/contentsBox.png';
import WButton from '@/components/Layout/WaitingRoom/WButton';
import AddContents from '@/components/Layout/AddContents/AddContents';
import InviteUser from '@/components/Layout/InviteUser/InviteUser';
import WRoomAssistance from '@/styles/Image/WaitingRoom/WRoomAssistance.png';
import useGameStore from '@/stores/useGameStore';
import useUserStore from '@/stores/useUserStore';
import { useWebSocketFunctions } from '@/hooks/websocket/useWebsocketFunctions';
import { RoomPayload } from '@/lib/types/roomJoin';
import { useRouter } from 'next/navigation';

const WaitingRoom = () => {
  const [isAddContentsVisible, setIsAddContentsVisible] = useState(false);
  const [isInviteVisible, setIsInviteVisible] = useState(false);
  const [showWaitingRoom, setShowWaitingRoom] = useState(false);

  const { sendMessage, subscribeToRoom } = useWebSocketFunctions();
  const { roomId, setGameId } = useGameStore();
  const { userId, nickname } = useUserStore();

  const [roomData, setRoomData] = useState<RoomPayload>({
    currentPlayers: [],
    readyStatus: {},
    host: '',
    allReady: false,
    status: 'WAITING',
    roomId: '',
    roundNum: 0,
    contents: [],
    roomName: '',
    gameId: '',
  });

  // 내 준비 상태 (일반 플레이어 전용)
  const [myIsReady, setMyIsReady] = useState(false);
  // 일반 플레이어가 준비를 누른 후 다시 누르지 못하도록 잠금
  const [readyLocked, setReadyLocked] = useState(false);
  const hasJoined = useRef(false);
  const router = useRouter();

  // ✅ WebSocket 구독 및 메시지 처리
  useEffect(() => {
    if (roomId) {
      subscribeToRoom(String(roomId), (message) => {
        console.log(
          `📩 WaitingRoom에서 WebSocket 메시지 수신 (Room: ${roomId}):`,
          message
        );

        if (
          message.messageType === 'PLAYER_JOIN' ||
          message.messageType === 'PLAYER_READY' ||
          message.messageType === 'GAME_START'
        ) {
          setRoomData(message.payload);
        }

        if (message.messageType === 'GAME_START') {
          console.log('🚀 게임이 시작되었습니다!');

          setGameId(message.payload.gameId, () => {
            console.log(`✅ gameId 설정 완료: ${message.payload.gameId}`);
            router.push(`/game/${message.payload.gameId}/1`);
          });
        }
      });

      if (!hasJoined.current) {
        sendMessage(
          'PLAYER_JOIN',
          {
            roomId: String(roomId),
            userId: Number(userId),
            isReady: false,
          },
          'room'
        );
        hasJoined.current = true;
      }
    }
  }, []);

  // ✅ 상태 업데이트 확인 (디버깅용)
  useEffect(() => {
    console.log('roomData 상태 변경:', roomData);
  }, [roomData]);

  // ✅ 일반 플레이어가 준비 상태 전송
  const sendPlayerReadyMessage = () => {
    sendMessage(
      'PLAYER_READY',
      {
        roomId: String(roomId),
        userId: Number(userId),
        isReady: true,
      },
      'room'
    );
  };

  // ✅ 호스트가 게임 시작 메시지 전송
  const sendGameStartMessage = () => {
    sendMessage(
      'GAME_START',
      {
        roomId: String(roomId),
      },
      'game'
    );
  };

  const users = (roomData.currentPlayers ?? []).map((player) => ({
    id: player.userId,
    name: player.nickname,
    level: player.level,
    activeCharacter: player.activeCharacter,
    isHost: player.nickname === roomData.host,
    isReady: roomData.readyStatus?.[player.nickname] || false,
  }));

  // ✅ 준비완료 버튼 클릭 시 동작
  const toggleReady = () => {
    const isHost = nickname === roomData.host;

    if (isHost) {
      if (!roomData.allReady) {
        console.log('❌ 모든 플레이어가 준비되지 않음');
        return;
      }
      console.log('🚀 방장: 게임 시작 메시지 전송!');
      sendGameStartMessage();
      return;
    }

    // 일반 플레이어의 경우
    if (!myIsReady) {
      setMyIsReady(true);
      setReadyLocked(true);
      sendPlayerReadyMessage();
    }
  };

  return (
    <>
      {!showWaitingRoom ? (
        <FullScreenImageWrapper onClick={() => setShowWaitingRoom(true)}>
          <FullScreenImage src={WRoomAssistance.src} alt="Assistance Image" />
        </FullScreenImageWrapper>
      ) : (
        <>
          <TopBar label={roomData.roomName} NavType="room" exitIcon />
          <WaitingWrapper>
            <UserList>
              {users.map((user) => (
                <PositionCard
                  key={user.id}
                  username={user.name}
                  level={user.level}
                  activeCharacter={user.activeCharacter}
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
                label={nickname === roomData.host ? '게임 시작' : '준비완료'}
                onClick={toggleReady}
                disabled={
                  nickname === roomData.host ? !roomData.allReady : readyLocked
                }
              />
            </Footer>
          </WaitingWrapper>
          <AddContents
            isVisible={isAddContentsVisible}
            setIsVisible={setIsAddContentsVisible}
            title="장소 선택"
          />
          {isInviteVisible && (
            <InviteUser
              setInviteVisible={setIsInviteVisible}
              roomName={roomData.roomName}
            />
          )}
        </>
      )}
    </>
  );
};

export default WaitingRoom;
