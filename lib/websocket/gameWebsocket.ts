import { Client } from '@stomp/stompjs';
import useWebSocketStore from '@/stores/useWebSocketStore';
import useUserStore from '@/stores/useUserStore';
import toast from 'react-hot-toast';
import { API_URL_CONFIG } from '@/config/apiEndPointConfig';

interface InGameWebSocketEvent {
  eventType: 'JOIN' | 'ANSWER' | 'RESULT';
  data: {
    nickname?: string;
    answer?: string;
    roundNumber?: number;
  };
}

class InGameWebSocket {
  private static instance: InGameWebSocket;
  private stompClient: Client | null = null;
  private gameId: number | null = null;
  private roundNumber: number | null = null;

  private constructor() {}

  public static getInstance(): InGameWebSocket {
    if (!InGameWebSocket.instance) {
      InGameWebSocket.instance = new InGameWebSocket();
    }
    return InGameWebSocket.instance;
  }

  public async connect(gameId: number, roundNumber: number): Promise<boolean> {
    this.gameId = gameId;
    this.roundNumber = roundNumber;
    console.log('Connecting to game:', this.gameId, 'round:', this.roundNumber);

    const isProduction = process.env.NODE_ENV === 'production';
    const wsUrl = isProduction
      ? API_URL_CONFIG.GAME.WS_URL.PROD
      : API_URL_CONFIG.GAME.WS_URL.DEV;

    if (this.stompClient?.active) {
      console.warn('WebSocket is already active.');
      return true;
    }

    return new Promise((resolve, reject) => {
      this.stompClient = new Client({
        brokerURL: wsUrl,
        debug: (str) => {
          console.log('Debug:', str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      this.stompClient.onConnect = () => {
        console.log('Connected to Game WebSocket');
        this.setupSubscription();
        this.sendJoinEvent();
        resolve(true);
      };

      this.stompClient.onStompError = (frame) => {
        console.error('STOMP error:', frame);
        toast.error('게임 웹소켓 연결에 실패했습니다.');
        reject(new Error(frame.headers['message']));
      };

      try {
        this.stompClient.activate();
      } catch (error) {
        console.error('Failed to activate Game WebSocket:', error);
        reject(error);
      }
    });
  }

  private setupSubscription(): void {
    if (!this.stompClient?.active || !this.gameId || !this.roundNumber) return;

    // 게임 라운드별 구독
    this.stompClient.subscribe(
      `${API_URL_CONFIG.GAME.SUBSCRIBE}/game/${this.gameId}/round/${this.roundNumber}`,
      (message) => {
        console.log('Received game message:', message.body);
        const parsedMessage = JSON.parse(message.body);
        const addMessage = useWebSocketStore.getState().addMessage;
        addMessage({
          ...parsedMessage,
          timestamp: Date.now(),
        });
      }
    );
  }

  public sendEvent(event: InGameWebSocketEvent): void {
    if (!this.stompClient?.active || !this.gameId) return;

    console.log('Sending game event:', event);
    this.stompClient.publish({
      destination: `${API_URL_CONFIG.GAME.PUBLISH}/game/${this.gameId}`,
      body: JSON.stringify(event),
    });
  }

  private sendJoinEvent(): void {
    if (!this.stompClient?.active || !this.gameId) return;

    const nickname = useUserStore.getState().nickname;
    if (!nickname) {
      toast.error('닉네임 정보를 찾을 수 없습니다.');
      this.disconnect();
      return;
    }

    const joinEvent: InGameWebSocketEvent = {
      eventType: 'JOIN',
      data: {
        nickname: nickname,
      },
    };

    console.log('Sending join event:', joinEvent);
    // this.sendEvent(joinEvent);
  }

  public disconnect(): void {
    if (this.stompClient?.active) {
      this.stompClient.deactivate();
      this.gameId = null;
      this.roundNumber = null;
      console.log('Disconnected from Game WebSocket');
    }
  }

  public isConnected(): boolean {
    return !!this.stompClient?.active;
  }

  public updateRound(roundNumber: number): void {
    this.roundNumber = roundNumber;
    if (this.stompClient?.active) {
      this.setupSubscription();
    }
  }
}

export default InGameWebSocket;
