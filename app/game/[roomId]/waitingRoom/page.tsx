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
import ContentsBox from '@/styles/Icon/ContentsBox.png';
import WButton from '@/components/Layout/WaitingRoom/WButton';
import AddContents from '@/components/Layout/AddContents/AddContents';
import InviteUser from '@/components/Layout/InviteUser/InviteUser';
import WRoomAssistance from '@/styles/Image/WaitingRoom/wRoomAssistance.png';
import { AlertToast } from '@/components/Common/Toast/AlertToast';
import useGameStore from '@/stores/useGameStore';
import useUserStore from '@/stores/useUserStore';
import { useWebSocketFunctions } from '@/hooks/websocket/useWebsocketFunctions';
import { RoomPayload } from '@/hooks/websocket/useWebsocket.types';

const WaitingRoom = () => {
  const [isAddContentsVisible, setIsAddContentsVisible] = useState(false);
  const [isInviteVisible, setIsInviteVisible] = useState(false);
  const [showWaitingRoom, setShowWaitingRoom] = useState(false);
  const { sendMessage, subscribeToRoom } = useWebSocketFunctions();
  const { roomId } = useGameStore();
  const { userId } = useUserStore();
  const [roomData, setRoomData] = useState<RoomPayload>({
    currentPlayers: [],
    readyStatus: {},
    host: '',
    allReady: false,
    status: 'WAITING',
    roomId: '',
  });
  const hasJoined = useRef(false);

  useEffect(() => {
    subscribeToRoom(String(roomId), (message) => {
      console.log(
        `📩 WaitingRoom에서 WebSocket 메시지 수신 (Room: ${roomId}):`,
        message
      );
      if (message.messageType === 'PLAYER_JOIN') {
        setRoomData(message.payload);
      }
    });
    if (roomId && !hasJoined.current) {
      sendMessage('PLAYER_JOIN', {
        roomId: String(roomId),
        userId: String(userId),
      });
      hasJoined.current = true;
    }
  }, []);

  const users = roomData.currentPlayers.map((player) => {
    return {
      id: player.userId,
      name: player.nickname,
      level: player.level,
      activeCharacter: player.activeCharacter,
      isHost: player.nickname === roomData.host,
      isReady: roomData.readyStatus[player.nickname] || false,
    };
  });

  const toggleReady = () => {
    // 준비 상태 토글 관련 로직 구현 필요 (추후 작업)
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
                  level={user.level}
                  activeCharacter={user.activeCharacter} // activeCharacter prop 전달
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
