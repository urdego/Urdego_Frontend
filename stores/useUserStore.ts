import { create } from 'zustand';

interface UserState {
  email: string;
  nickname: string;
  setEmail: (email: string) => void;
  setNickname: (nickname: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  email: '',
  nickname: '',
  setEmail: (email: string) => set({ email }),
  setNickname: (nickname: string) => set({ nickname }),
}));

export default useUserStore;
