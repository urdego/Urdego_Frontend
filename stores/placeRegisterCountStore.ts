import { create } from 'zustand';

interface State {
  placeCount: number;
  placeCountList: number[];
}

interface Actions {
  actions: {
    increasePlaceCount: () => void;
    addPlaceCountList: () => void;
    deletePlaceCountList: (id: number) => void;
  };
}

const usePlaceRegisterCountStore = create<State & Actions>((set) => ({
  placeCount: 1,
  placeCountList: [1],
  actions: {
    increasePlaceCount: () =>
      set((state) => ({
        placeCount:
          state.placeCountList.length === 3
            ? state.placeCount
            : state.placeCount + 1,
      })),
    addPlaceCountList: () =>
      set((state) => ({
        placeCountList: [...state.placeCountList, state.placeCount],
      })),
    deletePlaceCountList: (id) =>
      set((state) => ({
        placeCountList: state.placeCountList.filter((elem) => elem !== id),
      })),
  },
}));

export default usePlaceRegisterCountStore;
