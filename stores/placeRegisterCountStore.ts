import { create } from 'zustand';

interface State {
  placeCount: number;
}

interface Actions {
  actions: {
    increasePlaceCount: () => void;
  };
}

const usePlaceRegisterCountStore = create<State & Actions>((set) => ({
  placeCount: 1,
  actions: {
    increasePlaceCount: () =>
      set((state) => ({
        placeCount:
          state.placeCount === 3 ? state.placeCount : state.placeCount + 1,
      })),
  },
}));

export default usePlaceRegisterCountStore;
