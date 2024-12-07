'use client';

import { useRef, useState } from 'react';
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
import WaitingRoomWebSocket from '@/lib/websocket/waittingRoomWebsocket';
import useWebSocketStore from '@/stores/useWebSocketStore';

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

  const handleCreateRoom = async () => {
    if (!titleInputRef.current?.value || !nickname) return;

    setIsLoading(true);
    try {
      const roomData = {
        title: titleInputRef.current.value,
        maxPlayers: selectedNumber,
        rounds,
        timer: 60,
        host: nickname,
        invitedFriends: invitedFriends.map((friend) => friend.nickname),
      };

      const { data } = await axiosInstance.post('/api/makeRoom', roomData);

      // 방장 정보 저장
      useWebSocketStore.getState().setHostNickname(nickname);

      setGameInfo(data.groupId, data.gameId);
      const wsClient = WaitingRoomWebSocket.getInstance();
      await wsClient.connect(data.groupId, true);

      router.push(`/game/${data.groupId}/waitingRoom`);
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
