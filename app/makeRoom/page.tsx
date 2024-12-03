'use client';

import { useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/Common/TopBar/TopBar';
import { Footer } from '@/app/makeRoom/makeRoom.styles';
import RoomTitleInput from '@layout/MakeRoom/RoomTitleInput';
import Button from '@common/Button/Button';
import NumSelectForm from '@layout/MakeRoom/NumSelectForm';
import FriendsInviteForm from '@layout/MakeRoom/FriendsInviteForm';
import { PageWrapper } from '../commonPage.styles';
import useUserStore from '@/stores/useUserStore';
import useGameStore from '@/stores/useGameStores';
import toast from 'react-hot-toast';

interface UserInfo {
  id: number;
  nickname: string;
}

const MakeRoomPage = () => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [invitedFriends, setInvitedFriends] = useState<UserInfo[]>([]);
  const [selectedNumber, setSelectedNumber] = useState(2);
  const [rounds, setRounds] = useState(1);
  const [isRoomTitleEntered, setIsRoomTitleEntered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const nickname = useUserStore((state) => state.nickname);
  const setGameInfo = useGameStore((state) => state.setGameInfo);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRoomTitleEntered(!!e.target.value.trim());
  };

  const handleNumberChange = (value: number) => {
    setSelectedNumber(value);
  };

  const handleRoundsChange = (value: number) => {
    setRounds(value);
  };

  const handleInvitedFriendsChange = (friends: UserInfo[]) => {
    setInvitedFriends(friends);
  };

  const isButtonEnabled =
    isRoomTitleEntered && invitedFriends.length === selectedNumber - 1;

  const connectWebSocket = async (groupId: number) => {
    const socket = new SockJS(
      `${process.env.NEXT_PUBLIC_GROUP_URL}/group-service/connect`
    );
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = () => {
      // 1. 그룹 채널 구독
      stompClient.subscribe(`/subscribe/group/${groupId}`, (message) => {
        console.log('Received message:', message.body);
      });

      // 2. 참여 이벤트 발행
      if (nickname) {
        const participantEvent = {
          eventType: 'PARTICIPANT',
          data: {
            nickname: nickname,
            role: 'MANAGER',
          },
        };

        stompClient.publish({
          destination: `/publish/group${groupId}`,
          body: JSON.stringify(participantEvent),
        });

        // 3. 대기방으로 이동
        router.push(`/game/${groupId}/waitingRoom`);
      } else {
        toast.error('닉네임 정보를 찾을 수 없습니다.');
      }
    };

    stompClient.onStompError = (frame) => {
      console.error('Broker reported error:', frame.headers['message']);
      console.error('Additional details:', frame.body);
      toast.error('웹소켓 연결에 실패했습니다.');
    };

    stompClient.activate();
  };

  const handleCreateRoom = async () => {
    if (!titleInputRef.current?.value || !nickname) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_GROUP_URL}/api/group-service/group`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: titleInputRef.current.value,
            maxPlayers: selectedNumber,
            rounds: rounds,
            timer: 60,
            host: nickname,
            invitedFriends: invitedFriends.map((friend) => ({
              nickname: friend.nickname,
            })),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('방 생성에 실패했습니다.');
      }

      const data = await response.json();

      // groupId, gameId 저장
      setGameInfo(data.groupId, data.gameId);

      // WebSocket 연결
      await connectWebSocket(data.groupId);
    } catch (error) {
      console.error('Error creating room:', error);
      toast.error('방 생성에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TopBar label="방 만들기" NavType="room" exitIcon />
      <PageWrapper>
        <RoomTitleInput
          ref={titleInputRef}
          label="방 제목 설정"
          placeholder="방 제목을 설정해주세요"
          onChange={handleTitleChange}
        />
        <NumSelectForm
          label="인원수 (최대 6명)"
          maxValue={6}
          minValue={2}
          initialValue={2}
          onChange={handleNumberChange}
        />
        <NumSelectForm
          label="라운드 (최대 3라운드)"
          maxValue={3}
          minValue={1}
          initialValue={1}
          onChange={handleRoundsChange}
        />
        <RoomTitleInput
          label="타이머"
          placeholder="1분 (변경불가)"
          variant="readonly"
        />
        <FriendsInviteForm
          onFriendsChange={handleInvitedFriendsChange}
          invitedFriends={invitedFriends}
          selectedNumber={selectedNumber}
        />
      </PageWrapper>
      <Footer>
        <Button
          buttonType={isButtonEnabled ? 'purple' : 'gray'}
          buttonSize="large"
          buttonHeight="default"
          styleType="coloredBackground"
          label={isLoading ? '생성 중...' : '그룹 생성'}
          onClick={handleCreateRoom}
          disabled={!isButtonEnabled || isLoading}
        />
      </Footer>
    </>
  );
};

export default MakeRoomPage;
