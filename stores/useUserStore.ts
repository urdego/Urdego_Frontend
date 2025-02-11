import { create } from 'zustand';

interface UserState {
  userId: number;
  nickname: string;
  characterType: string;
  activeCharacter: string | null;
  setUserId: (userId: number) => void;
  setNickname: (nickname: string) => void;
  setActiveCharacter: (activeCharacter: string | null) => void;
}

const useUserStore = create<UserState>((set) => ({
  userId: 0,
  nickname: '',
  characterType: '',
  activeCharacter: '',
  setUserId: (userId: number) => set({ userId }),
  setNickname: (nickname: string) => set({ nickname }),
  setCharacterType: (characterType: string) => set({ characterType }),
  setActiveCharacter: (activeCharacter) => set({ activeCharacter }),
}));

export default useUserStore;
