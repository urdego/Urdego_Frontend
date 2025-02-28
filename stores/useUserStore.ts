import { create } from 'zustand';

interface UserState {
  userId: number;
  nickname: string;
  email: string;
  characterType: string;
  setUserId: (userId: number) => void;
  setNickname: (nickname: string) => void;
  setEmail: (email: string) => void;
  setCharacterType: (characterType: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  userId: 0,
  nickname: '',
  email: '',
  characterType: '',
  setUserId: (userId: number) => set({ userId }),
  setNickname: (nickname: string) => set({ nickname }),
  setEmail: (email: string) => set({ email }),
  setCharacterType: (characterType: string) => set({ characterType }),
}));

export default useUserStore;
