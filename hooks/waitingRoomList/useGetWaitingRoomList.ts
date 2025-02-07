import { useState } from 'react';

interface WaitingRoomList {
  roomId: string;
  status: string;
  roomName: string;
  maxPlayer: number;
  currentPlayersCount: number;
  totalRounds: number;
}

const useGetWaitingRoomList = () => {
  const [waitingRoomList, setWaitingRoomList] = useState<
    WaitingRoomList[] | null
  >(null);
  const fetchWaitingRoomList = async () => {
    const response = await fetch('/api/waitingRoomList');
    if (!response.ok) {
      return;
    }

    const data = await response.json();
    setWaitingRoomList(data);
  };
  return { waitingRoomList, fetchWaitingRoomList };
};

export default useGetWaitingRoomList;
