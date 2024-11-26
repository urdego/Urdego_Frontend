import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  nickname: string | null;
  setNickname: (nickname: string) => void;
  clearNickname: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      nickname: null,
      setNickname: (nickname: string) => set({ nickname }),
      clearNickname: () => set({ nickname: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);

export default useUserStore;
