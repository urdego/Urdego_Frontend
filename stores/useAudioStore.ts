import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AudioState {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  togglePlaying: () => void;
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set) => ({
      isPlaying: true,
      setIsPlaying: (isPlaying) => set({ isPlaying }),
      togglePlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
    }),
    {
      name: 'audio-storage',
    }
  )
);
