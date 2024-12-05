import { useCallback, useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';

interface GameState {
  gameId: number;
  totalRounds: number;
  roundState?: {
    roundId: number;
    roundNum: number;
    roundTimer: number;
    contentUrls: string[];
    hint?: string;
  };
  scoreState?: {
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
  };
}

export const useWebSocket = (gameId: number) => {
  const [gameState, setGameState] = useState<GameState>({
    gameId,
    totalRounds: 3, // TODO: 대기방 소켓에서 받아오기
  });
  const stompClient = useRef<Client | null>(null);

  // TODO :대기방에서 소켓 연결
  // 웹소켓 연결
  const connect = useCallback(() => {
    const client = new Client({
      brokerURL: process.env.NEXT_PUBLIC_GAME_WS_URL,
      debug: (str) => console.log('STOMP:', str),
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log('웹소켓 연결 성공성공성공!!!!!!!');

      //   // 게임 구독
      //   client.subscribe(`/game-service/subscribe/game/start`, (message) => {
      //     const gameData = JSON.parse(message.body);
      //     setGameState((prev) => ({
      //       ...prev,
      //       gameId: gameData.gameId,
      //       totalRounds: gameData.totalRounds,
      //     }));
      //   });

      // 라운드 생성 구독
      client.subscribe(`/game-service/subscribe/rounds/create`, (message) => {
        const roundData = JSON.parse(message.body);
        setGameState((prev) => ({
          ...prev,
          roundState: roundData,
        }));
      });

      // 점수 구독
      client.subscribe(`/game-service/subscribe/score`, (message) => {
        const scoreData = JSON.parse(message.body);
        setGameState((prev) => ({
          ...prev,
          scoreState: scoreData,
        }));
      });
    };

    client.activate();
    stompClient.current = client;
  }, []);

  // 게임 시작 요청
  //   const startGame = useCallback((groupId: number) => {
  //     if (!stompClient.current) return;

  //     stompClient.current.publish({
  //       destination: '/game-service/publish/game/start',
  //       body: JSON.stringify({ groupId }),
  //     });
  //   }, []);

  // 라운드 생성 요청
  const createRound = useCallback(
    (roundNum: number) => {
      if (!stompClient.current) return;

      stompClient.current.publish({
        destination: '/game-service/publish/rounds/create',
        body: JSON.stringify({
          gameId,
          roundNum,
        }),
      });
    },
    [gameId]
  );

  // 답안 제출
  const submitAnswer = useCallback(
    (data: {
      nickname: string;
      roundId: number;
      coordinate: [number, number];
    }) => {
      if (!stompClient.current) return;

      stompClient.current.publish({
        destination: `/game-service/publish/game/${gameId}/rounds/${data.roundId}/submit`,
        body: JSON.stringify(data),
      });
    },
    [gameId]
  );

  // 라운드 종료
  const endRound = useCallback((roundNum: number) => {
    if (!stompClient.current) return;

    stompClient.current.publish({
      destination: '/game-service/publish/rounds/end',
      body: JSON.stringify({ roundNum }),
    });
  }, []);

  // 연결 해제
  const disconnect = useCallback(() => {
    stompClient.current?.deactivate();
  }, []);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return {
    gameState,
    createRound,
    submitAnswer,
    endRound,
  };
};
