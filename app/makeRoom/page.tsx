'use client';

import { useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
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
import axiosInstance from '@/lib/axios';
import axios from 'axios';
import { API_URL_CONFIG } from '@/config/apiEndPointConfig';

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
    const isProduction = process.env.NODE_ENV === 'production';
    const wsUrl = isProduction
      ? API_URL_CONFIG.GROUP.WS_URL.PROD
      : API_URL_CONFIG.GROUP.WS_URL.DEV;

    const stompClient = new Client({
      brokerURL: wsUrl,
      debug: (str) => {
        console.log('Debug:', str);
        if (str.includes('accept-version')) {
          console.log('Protocol versions:', str);
        }
      },
      connectHeaders: {
        // 필요한 경우 연결 헤더 추가
      },
      onConnect: () => {
        console.log('Connected to WebSocket');
        // 연결 성공 후 처리 로직
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
        // 연결 해제 후 처리 로직
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame);
        // 에러 처리 로직
      },
    });

    stompClient.onConnect = () => {
      console.log('Connected to the broker.');

      stompClient.subscribe(
        `${process.env.NEXT_PUBLIC_GROUP_SUBSCRIBE}/${groupId}`,
        (message) => {
          console.log('Received message:', message.body);
        }
      );

      if (nickname) {
        const participantEvent = {
          eventType: 'PARTICIPANT',
          data: {
            nickname: nickname,
            role: 'MANAGER',
          },
        };

        stompClient.publish({
          destination: `${process.env.NEXT_PUBLIC_GROUP_PUBLISH}/${groupId}`,
          body: JSON.stringify(participantEvent),
        });

        router.push(`/game/${groupId}/waitingRoom`);
      } else {
        toast.error('닉네임 정보를 찾을 수 없습니다.');
        stompClient.deactivate();
        return;
      }
    };

    stompClient.onStompError = (frame) => {
      console.error('Broker reported error:', frame.headers['message']);
      console.error('Additional details:', frame.body);
      toast.error('웹소켓 연결에 실패했습니다.');
      stompClient.deactivate();
    };

    if (!stompClient.active) {
      stompClient.activate();
    } else {
      console.warn('WebSocket is already active.');
    }
  };

  const handleCreateRoom = async () => {
    if (!titleInputRef.current?.value || !nickname) return;

    setIsLoading(true);
    try {
      const requestData = {
        title: titleInputRef.current.value,
        maxPlayers: selectedNumber,
        rounds,
        timer: 60,
        host: nickname,
        invitedFriends: invitedFriends.map((friend) => friend.nickname),
      };

      console.log('Sending request with data:', requestData);
      const { data } = await axiosInstance.post('/api/makeRoom', requestData);

      setGameInfo(data.groupId, data.gameId);
      await connectWebSocket(data.groupId);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Error details:', error.response?.data);
        toast.error(error.response?.data?.error || '방 생성에 실패했습니다.');
      } else {
        console.error('Unknown error:', error);
        toast.error('방 생성에 실패했습니다.');
      }
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
