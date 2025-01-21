import { create } from 'zustand';

interface UserState {
  userId: number;
  nickname: string;
  setUserId: (userId: number) => void;
  setNickname: (nickname: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  userId: 0,
  nickname: '',
  setUserId: (userId: number) => set({ userId }),
  setNickname: (nickname: string) => set({ nickname }),
}));

export default useUserStore;
