import { create } from 'zustand';

interface State {
  title: string;
}

interface Actions {
  actions: {
    setTitle: (newTitle: string) => void;
  };
}

const usePlaceRegisterStore = create<State & Actions>((set) => ({
  title: '',
  actions: {
    setTitle: (newTitle) => set(() => ({ title: newTitle })),
  },
}));

export default usePlaceRegisterStore;
