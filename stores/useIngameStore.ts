import { create } from 'zustand';

interface IngameState {
  joinedUsers: string[];
  totalRounds: number;
  setGameInfo: (users: string[], rounds: number) => void;
  clearGameInfo: () => void;
}

const useIngameStore = create<IngameState>()((set) => ({
  joinedUsers: [],
  totalRounds: 0,
  setGameInfo: (users: string[], rounds: number) =>
    set({ joinedUsers: users, totalRounds: rounds }),
  clearGameInfo: () => set({ joinedUsers: [], totalRounds: 0 }),
}));

export default useIngameStore;
