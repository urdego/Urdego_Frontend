import { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { gameService } from '../services/game.service';
import { GAME_EVENTS } from '../constants/events';
import type {
  GameState,
  RoundInfo,
  RoundResult,
  SubmitAnswerData,
} from '../types/socket.types';

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
