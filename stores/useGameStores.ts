import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameState {
  groupId: number | null;
  gameId: number | null;
  setGameInfo: (groupId: number, gameId: number) => void;
  clearGameInfo: () => void;
}

const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      groupId: null,
      gameId: null,
      setGameInfo: (groupId: number, gameId: number) =>
        set({ groupId, gameId }),
      clearGameInfo: () => set({ groupId: null, gameId: null }),
    }),
    {
      name: 'game-storage',
    }
  )
);

export default useGameStore;
