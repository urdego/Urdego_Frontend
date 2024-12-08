import { Client, Message } from '@stomp/stompjs';
import useWebSocketStore from '@/stores/useWebSocketStore';
import useUserStore from '@/stores/useUserStore';
import toast from 'react-hot-toast';
import { API_URL_CONFIG } from '@/config/apiEndPointConfig';

// 라운드 생성 요청/응답
export interface RoundCreateRequest {
  gameId: number;
  roundNum: number;
}

// 라운드 별 데이터 형식
export interface RoundData {
  roundId: number;
  roundNum: number;
  roundTimer: number;
  contentUrls: string[];
  hint?: string;
}
// 답안 제출 요청/응답
export interface RoundSubmitRequest {
  nickname: string;
  roundId: number;
  coordinate: [number, number];
}

export interface RoundEndRequest {
  roundNum: number;
}

export interface ScoreData {
  roundId: number;
  answerCoordinate: {
    lat: number;
    lng: number;
  };
  submitCoordinates: {
    nickname: string;
    lat: number;
    lng: number;
    score: number;
    totalScore: number;
  }[];
}

export interface RoundEndResponse {
  message: string;
}

class InGameWebSocket {
  private static instance: InGameWebSocket;
  private stompClient: Client | null = null;
  private gameId: number | null = null;
  private roundNumber: number | null = null;
  private currentRoundId: number | null = null;
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
    if (!this.stompClient?.active || !this.gameId || !this.roundNumber) {
      console.warn('WebSocket 연결 실패 혹은 gameId/roundNumber 정보 없음');
      return;
    }

    try {
      // 라운드 생성 구독
      this.stompClient.subscribe(
        `/game-service/subscribe/game/${this.gameId}/rounds/create`,
        (message: Message) => {
          console.log('=== 라운드 데이터 수신 ===');
          console.log('Raw message:', message.body);
          const roundData = JSON.parse(message.body);
          console.log('Parsed round data:', {
            roundId: roundData.roundId,
            roundNum: roundData.roundNum,
            contentUrls: roundData.contentUrls,
            hint: roundData.hint,
          });
          this.currentRoundId = roundData.roundId;

          const addMessage = useWebSocketStore.getState().addMessage;
          addMessage({
            eventType: 'ROUND_START',
            data: roundData,
            // timestamp: Date.now(),
          });
        }
      );

      // 점수 구독
      this.stompClient.subscribe(
        `/game-service/subscribe/game/${this.gameId}/rounds/${this.roundNumber}/score`,
        (message: Message) => {
          console.log('=== 점수 데이터 수신 ===');
          console.log('Raw message:', message.body);

          const scoreData = JSON.parse(message.body);
          console.log('Parsed score data:', {
            roundId: scoreData.roundId,
            answerCoordinate: scoreData.answerCoordinate,
            submitCoordinates: scoreData.submitCoordinates,
          });

          const addMessage = useWebSocketStore.getState().addMessage;
          addMessage({
            eventType: 'RESULT',
            data: scoreData,
          });
        }
      );

      // 라운드 종료 구독 추가
      this.stompClient.subscribe(
        `/game-service/subscribe/game/${this.gameId}/rounds/${this.roundNumber}/end`,
        (message: Message) => {
          console.log('=== 라운드 종료 데이터 수신 ===');
          console.log('Raw message:', message.body);
          const endData = JSON.parse(message.body);
          console.log('Round end data:', endData);

          const addMessage = useWebSocketStore.getState().addMessage;
          addMessage({
            eventType: 'ROUND_END',
            data: endData,
          });
        }
      );

      // 라운드 데이터 요청
      this.createRound(this.roundNumber);
      console.log(`라운드 ${this.roundNumber}번 데이터 요청`);
    } catch (error) {
      console.error('구독 설정 실패:', error);
      setTimeout(() => this.setupSubscription(), 1000);
    }
  }

  // 라운드 생성 요청
  public createRound(roundNum: number): void {
    if (!this.stompClient?.active || !this.gameId) return;

    const payload: RoundCreateRequest = {
      gameId: this.gameId,
      roundNum: roundNum,
    };

    console.log('라운드 생성 요청 payload:', payload);

    this.stompClient.publish({
      destination: '/game-service/publish/rounds/create',
      body: JSON.stringify(payload),
    });
  }

  // 답안 제출
  public submitAnswer(roundId: number, coordinate: [number, number]): void {
    if (!this.stompClient?.active || !this.gameId) return;

    const nickname = useUserStore.getState().nickname;
    if (!nickname) {
      toast.error('닉네임 정보를 찾을 수 없습니다.');
      return;
    }

    const payload = {
      nickname,
      coordinate: coordinate.map(String),
      roundId: this.currentRoundId,
    };

    console.log('답안 제출:', payload);
    this.stompClient.publish({
      destination: `/game-service/publish/game/${this.gameId}/rounds/${roundId}/submit`,
      body: JSON.stringify(payload),
    });
  }

  // 라운드 종료 요청
  public endRound(roundNum: number): void {
    if (!this.stompClient?.active) return;

    const payload: RoundEndRequest = {
      roundNum,
    };

    console.log('라운드 종료 요청:', payload);
    this.stompClient.publish({
      destination: `/game-service/publish/rounds/${roundNum}/end`,
      body: JSON.stringify(payload),
    });
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
