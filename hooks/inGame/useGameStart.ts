import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import WaitingRoomWebSocket from '@/lib/websocket/waittingRoomWebsocket';
import InGameWebSocket from '@/lib/websocket/gameWebsocket';
import useInGameStore from '@/stores/useIngameStore';
import useWebSocketStore from '@/stores/useWebSocketStore';

export const useGameStart = () => {
  const router = useRouter();
  const { messages } = useWebSocketStore();
  const setGameInfo = useInGameStore((state) => state.setGameInfo);
  const latestMessage = messages[messages.length - 1];

  useEffect(() => {
    if (
      'action' in latestMessage?.data &&
      latestMessage.data.action === 'startGame'
    ) {
      const { joinedUser, totalRounds } = latestMessage.data;
      const currentGameId = latestMessage.data.gameId;

      const connectAndNavigate = async () => {
        try {
          setGameInfo(joinedUser, totalRounds);

          const waitingRoomWsClient = WaitingRoomWebSocket.getInstance();
          waitingRoomWsClient.disconnect();

          const inGameWsClient = InGameWebSocket.getInstance();
          await inGameWsClient.connect(Number(currentGameId), 1);

          router.push(`/game/${currentGameId}/1`);
        } catch (error) {
          console.error('Failed to connect to game socket:', error);
          toast.error('게임 연결에 실패했습니다.');
        }
      };

      connectAndNavigate();
    }
  }, [latestMessage, router, setGameInfo]);
};
