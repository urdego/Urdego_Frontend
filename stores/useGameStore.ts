import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameState {
  roomId: string | null;
  setRoomId: (roomId: string) => void;
  clearRoomId: () => void;
}

const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      roomId: null,
      setRoomId: (roomId: string) => set({ roomId }),
      clearRoomId: () => set({ roomId: null }),
    }),
    {
      name: 'game-storage',
    }
  )
);

export default useGameStore;
