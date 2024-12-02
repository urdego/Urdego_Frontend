## Socket 시스템 문서화

### 📁 파일 구조

```
socket/
├── constants/
│   └── events.ts         # 소켓 이벤트 상수 정의
├── hooks/
│   ├── useGameSocket.ts       # 게임 소켓 훅
│   └── useWaitingRoomSocket.ts # 대기실 소켓 훅
├── instance/
│   └── socket.ts         # 소켓 인스턴스 관리
├── services/
│   ├── game.service.ts        # 게임 관련 소켓 서비스
│   └── waitingRoom.service.ts # 대기실 관련 소켓 서비스
└── types/
    └── socket.types.ts   # 타입 정의

```

### 🔍 주요 컴포넌트

1. **Socket 인스턴스 관리**

```tsx
class SocketInstance {
  private static instances: Map<string, Socket> = new Map();

  private constructor() {}

  public static getInstance(namespace: string): Socket {
    if (!this.instances.has(namespace)) {
      const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}/${namespace}`, {
        transports: ['websocket'],
      });
      this.instances.set(namespace, socket);
    }
    return this.instances.get(namespace)!;
  }

  public static disconnect(namespace: string): void {
    const socket = this.instances.get(namespace);
    if (socket) {
      socket.disconnect();
      this.instances.delete(namespace);
    }
  }
}
```

- 싱글톤 패턴을 사용하여 소켓 인스턴스 관리
- 네임스페이스별로 소켓 연결 관리
- 메모리 누수 방지를 위한 연결 해제 기능 제공

### 2. **타입 정의**

```tsx
// 게임 참여 유저 정보
export interface UserInfo {
  id: number;
  nickname: string;
  isHost: boolean;
  isReady: boolean;
}

// 게임 상태 정보
export interface GameState {
  currentRound: number;
  totalRounds: number;
  timeRemaining: number;
  isRoundActive: boolean;
  isSubmitted: boolean;
}

// 좌표 정보
export interface Coordinate {
  lat: number;
  lng: number;
}

// 라운드 별 제공 정보
export interface RoundInfo {
  round: number;
  hint: string;
  timeLimit: number;
  images: string[];
  answerCoordinate?: Coordinate; // 라운드 종료 후 공개
}

// 유저별 정답 제출 정보
export interface SubmitAnswerData {
  nickname: string;
  round: number;
  coordinate: Coordinate;
}

// 답안 제출 응답
export interface SubmitAnswerResponse {
  success: boolean;
  message?: string;
}

// 라운드 별 정답 정보 및 유저별 정답 정보,점수
export interface RoundResult {
  round: number;
  answerCoordinate: Coordinate;
  userResults: {
    nickname: string;
    coordinate: Coordinate;
    score: number;
  }[];
  isLastRound: boolean;
}

// 게임 종료 시 유저별 최종 점수, 랭킹 정보
export interface GameResult {
  rankings: {
    userId: number;
    nickname: string;
    totalScore: number;
    ranking: number;
    roundScores: number[]; // 각 라운드별 점수
  }[];
}
```

- 게임에 필요한 모든 데이터 타입 정의
- 사용자 정보, 게임 상태, 좌표, 라운드 정보 등

### 3. 소켓 이벤트

```tsx
export const WAITING_ROOM_EVENTS = {
  USER_JOIN: 'waiting:user:join',
  USER_LEAVE: 'waiting:user:leave',
  READY_TOGGLE: 'waiting:ready:toggle',
  GAME_START: 'waiting:game:start',
} as const;

export const GAME_EVENTS = {
  // 게임 시작/종료
  GAME_START: 'game:start',
  GAME_END: 'game:end',

  // 라운드 관련
  ROUND_START: 'game:round:start',
  ROUND_END: 'game:round:end',
  ROUND_TIMER: 'game:round:timer',

  // 답안 제출 관련
  ANSWER_SUBMIT: 'game:answer:submit',

  // 결과 관련
  ROUND_RESULT: 'game:round:result',
  FINAL_RESULT: 'game:final:result',
} as const;
```

- 대기실과 게임에서 사용되는 모든 이벤트 상수 정의
- 이벤트 이름 일관성 유지

### 4. 커스텀 훅

1. **대기실 훅**

```tsx
export const useWaitingRoomSocket = (roomId: string) => {
  useEffect(() => {
    const socket = waitingRoomService.connect(roomId);

    socket.on(WAITING_ROOM_EVENTS.USER_JOIN, (user: UserInfo) => {
      // 유저 입장 처리
    });

    socket.on(WAITING_ROOM_EVENTS.USER_LEAVE, (userId: string) => {
      // 유저 퇴장 처리
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const toggleReady = useCallback(() => {
    waitingRoomService.toggleReady();
  }, []);

  const startGame = useCallback(() => {
    waitingRoomService.startGame(roomId);
  }, [roomId]);

  return { toggleReady, startGame };
};
```

- 대기실 연결 관리
- 유저 입/퇴장 처리
- 준비 상태 토글 및 게임 시작 기능

2. **게임 훅**

```tsx
export const useGameSocket = (roomId: string, round: number) => {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [roundInfo, setRoundInfo] = useState<RoundInfo | null>(null);
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null);

  useEffect(() => {
    const socket = gameService.connect(roomId);

    socket.on(GAME_EVENTS.ROUND_START, (info: RoundInfo) => {
      setRoundInfo(info);
      setGameState(
        (prev) =>
          prev && {
            ...prev,
            currentRound: info.round,
            timeRemaining: info.timeLimit,
            isRoundActive: true,
            isSubmitted: false,
          }
      );
    });

    socket.on(GAME_EVENTS.ROUND_END, (result: RoundResult) => {
      setRoundResult(result);
      router.push(`/game/${roomId}/${round}/roundRank`);
    });

    socket.on(GAME_EVENTS.GAME_END, () => {
      router.push(`/game/${roomId}/final`);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, round, router]);

  const submitAnswer = useCallback(
    async (data: SubmitAnswerData) => {
      try {
        const response = await gameService.submitAnswer(roomId, data);
        setGameState((prev) => (prev ? { ...prev, isSubmitted: true } : null));
        return response.success;
      } catch (error) {
        console.error('답안 제출 실패:', error);
        return false;
      }
    },
    [roomId]
  );

  return {
    gameState,
    roundInfo,
    roundResult,
    submitAnswer,
  };
};
```

- 게임 상태 관리
- 라운드 정보 처리
- 답안 제출 및 결과 처리

### 🔄 이벤트 Flow

1. **대기실 단계**

- 유저 입장/퇴장
- 준비 상태 토글
- 게임 시작

2. **게임 단계**

- 라운드 시작/종료
- 답안 제출
- 라운드 결과
- 최종 결과
