import { create } from 'zustand';

interface State {
  isInputComplete: boolean;
  isSubmitReady: boolean;
}

interface Actions {
  actions: {
    setIsInputComplete: (mode: boolean) => void;
    setIsSubmitReady: (mode: boolean) => void;
  };
}

const usePlaceRegisterModeStore = create<State & Actions>((set) => ({
  isInputComplete: false,
  isSubmitReady: false,
  actions: {
    setIsInputComplete: (mode) => set(() => ({ isInputComplete: mode })),
    setIsSubmitReady: (mode) => set(() => ({ isSubmitReady: mode })),
  },
}));

export default usePlaceRegisterModeStore;
