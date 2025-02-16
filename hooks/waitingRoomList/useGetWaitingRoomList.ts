import { Character } from '@/lib/types/character';
import { useEffect, useState } from 'react';

export interface WaitingRoomList {
  roomId: string;
  status: string;
  roomName: string;
  maxPlayers: number;
  currentPlayersCount: number;
  totalRounds: number;
  hostInfo: {
    userId: number;
    nickname: string;
    activeCharacter: Character;
    level: 0;
  };
}

const useGetWaitingRoomList = () => {
  const [waitingRoomList, setWaitingRoomList] = useState<
    WaitingRoomList[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWaitingRoomList = async () => {
    setIsLoading(true);
    const response = await fetch('/api/waitingRoomList');
    if (!response.ok) {
      return;
    }

    const data = await response.json();
    setWaitingRoomList(data);
    setIsLoading(false);
  };

  useEffect(() => {
    const handleWaitingRoomList = async () => {
      await fetchWaitingRoomList();
    };
    handleWaitingRoomList();
  }, []);

  return { waitingRoomList, isLoading, fetchWaitingRoomList };
};

export default useGetWaitingRoomList;
