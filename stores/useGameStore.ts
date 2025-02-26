import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameState {
  roomId: string | null;
  gameId: string | null;
  questionId: string | null;
  setRoomId: (roomId: string) => void;
  setGameId: (gameId: string, callback?: () => void) => void; // ✅ 콜백 추가
  setQuestionId: (questionId: string) => void;
  clearRoomId: () => void;
  clearGameId: () => void;
}

const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      roomId: null,
      gameId: null,
      questionId: null,
      setRoomId: (roomId: string) => set({ roomId }),

      // ✅ 상태 업데이트 후 콜백 실행 가능하도록 수정
      setGameId: (gameId: string, callback?: () => void) =>
        set((state) => {
          const newState = { ...state, gameId };
          callback?.(); // 상태 업데이트 후 콜백 실행
          return newState;
        }),
      setQuestionId: (questionId: string) => set({ questionId }),
      clearRoomId: () => set({ roomId: null }),
      clearGameId: () => set({ gameId: null }),
    }),
    {
      name: 'game-storage',
    }
  )
);

export default useGameStore;
