import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface InGameState {
  joinedUsers: string[];
  totalRounds: number;
  setGameInfo: (joinedUsers: string[], totalRounds: number) => void;
  clearGameInfo: () => void;
}

const useInGameStore = create<InGameState>()(
  persist(
    (set) => ({
      joinedUsers: [],
      totalRounds: 0,
      setGameInfo: (joinedUsers: string[], totalRounds: number) =>
        set({ joinedUsers, totalRounds }),
      clearGameInfo: () => set({ joinedUsers: [], totalRounds: 0 }),
    }),
    {
      name: 'ingame-storage',
    }
  )
);

export default useInGameStore;
