import { Client } from '@stomp/stompjs';
import useGameStore from '@/stores/useGameStores';
import useUserStore from '@/stores/useUserStore';
import useIngameStore from '@/stores/useIngameStore';
import toast from 'react-hot-toast';
import { API_URL_CONFIG } from '@/config/apiEndPointConfig';

interface GameWebSocketEvent {
  eventType: string;
  data: {
    nickname: string;
    content?: string;
    role?: string;
    [key: string]: any;
  };
}

class GameWebSocket {
  private static instance: GameWebSocket;
  private stompClient: Client | null = null;
  private gameId: number | null = null;
  private groupId: number | null = null;

  private constructor() {}

  public static getInstance(): GameWebSocket {
    if (!GameWebSocket.instance) {
      GameWebSocket.instance = new GameWebSocket();
    }
    return GameWebSocket.instance;
  }

  public async connect(gameId: number, groupId: number): Promise<boolean> {
    this.gameId = gameId;
    this.groupId = groupId;

    const isProduction = process.env.NODE_ENV === 'production';
    const wsUrl = isProduction
      ? API_URL_CONFIG.GAME.WS_URL.PROD
      : API_URL_CONFIG.GAME.WS_URL.DEV;

    if (this.stompClient?.active) {
      console.warn('Game WebSocket is already active.');
      return true;
    }

    return new Promise((resolve, reject) => {
      this.stompClient = new Client({
        brokerURL: wsUrl,
        debug: (str) => {
          console.log('Game WebSocket Debug:', str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
          console.log('Connected to Game WebSocket');

          // WebSocket 연결 직후 메시지 구독
          this.stompClient?.subscribe(
            `${process.env.NEXT_PUBLIC_GROUP_SUBSCRIBE}/${this.groupId}`,
            (message) => {
              const parsedMessage = JSON.parse(message.body);
              const { data } = parsedMessage;

              if (data.action === 'startGame') {
                // ingame store 업데이트
                const ingameStore = useIngameStore.getState();
                ingameStore.setGameInfo(data.joinedUser, data.totalRounds);

                // 실제 구독 설정
                this.setupSubscription();
                resolve(true);
              }
            }
          );
        },
        onStompError: (frame) => {
          console.error('Game STOMP error:', frame);
          toast.error('게임 서버 연결에 실패했습니다.');
          reject(new Error(frame.headers['message']));
        },
      });

      try {
        this.stompClient.activate();
      } catch (error) {
        console.error('Failed to activate Game WebSocket:', error);
        reject(error);
      }
    });
  }

  private setupSubscription(): void {
    if (!this.stompClient?.active || !this.gameId) return;

    const subscriptionPath = `${process.env.NEXT_PUBLIC_GAME_SUBSCRIBE}/${this.gameId}`;
    console.log('Subscribing to:', subscriptionPath);

    this.stompClient.subscribe(subscriptionPath, (message) => {
      console.log('Received game message:', message.body);
      const parsedMessage = JSON.parse(message.body);
      // Here you can add game-specific message handling
      // For example, updating game state through a store
    });
  }

  public sendEvent(event: GameWebSocketEvent): void {
    if (!this.stompClient?.active || !this.gameId) return;

    const publishPath = `${process.env.NEXT_PUBLIC_GAME_PUBLISH}/${this.gameId}`;
    console.log('Sending game event:', event);

    this.stompClient.publish({
      destination: publishPath,
      body: JSON.stringify(event),
    });
  }

  public disconnect(): void {
    if (this.stompClient?.active) {
      this.stompClient.deactivate();
      this.gameId = null;
      this.groupId = null;
      console.log('Disconnected from Game WebSocket');
    }
  }

  public isConnected(): boolean {
    return !!this.stompClient?.active;
  }

  public getGameId(): number | null {
    return this.gameId;
  }

  public getGroupId(): number | null {
    return this.groupId;
  }
}

export default GameWebSocket;
