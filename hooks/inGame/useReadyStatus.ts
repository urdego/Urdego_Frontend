import WaitingRoomWebSocket from '@/lib/websocket/waittingRoomWebsocket';
import useGameStore from '@/stores/useGameStores';

interface User {
  name: string;
  isReady: boolean;
}

export const useReadyStatus = (currentUser: User | null) => {
  const toggleReady = () => {
    if (!currentUser) return;

    const wsClient = WaitingRoomWebSocket.getInstance();
    wsClient.sendEvent({
      eventType: 'READY',
      data: {
        nickname: currentUser.name,
        role: currentUser.isReady ? 'notReady' : 'Ready',
      },
    });
  };

  const startGame = () => {
    const wsClient = WaitingRoomWebSocket.getInstance();
    const gameId = useGameStore.getState().gameId;

    wsClient.sendEvent({
      eventType: 'START',
      data: {
        gameId: gameId?.toString(),
      },
    });
  };

  return {
    toggleReady,
    startGame,
  };
};
