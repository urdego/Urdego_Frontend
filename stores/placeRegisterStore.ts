import { create } from 'zustand';

interface Place {
  title: string;
  hint: string;
}

interface State {
  placeList: Place[];
}

interface Actions {
  setPlaceInput: (targetIndex: number, title: string, hint: string) => void;
  addPlaceList: () => void;
}

const usePlaceRegisterStore = create<State & Actions>((set) => ({
  placeList: [{ title: '', hint: '' }],
  setPlaceInput: (targetIndex, filed, value) =>
    set((state) => {
      const updatePlace = state.placeList.map((place, index) =>
        targetIndex === index ? { ...place, [filed]: value } : place
      );
      return { placeList: updatePlace };
    }),
  addPlaceList: () =>
    set((state) => ({
      placeList: [...state.placeList, { title: '', hint: '' }],
    })),
}));

export default usePlaceRegisterStore;
