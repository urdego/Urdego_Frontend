import { create } from 'zustand';

interface Place {
  title: string;
  hint: string;
  file: File[];
}

interface State {
  placeList: Place[];
}

interface Actions {
  setPlaceInput: (
    targetIndex: number,
    filed: string,
    value: string | File[]
  ) => void;
  addPlaceList: () => void;
}

const usePlaceRegisterStore = create<State & Actions>((set) => ({
  placeList: [{ title: '', hint: '', file: [] }],
  setPlaceInput: (targetIndex, filed, value) =>
    set((state) => {
      const updatePlace = state.placeList.map((place, index) =>
        targetIndex === index ? { ...place, [filed]: value } : place
      );
      return { placeList: updatePlace };
    }),
  addPlaceList: () =>
    set((state) => ({
      placeList: [...state.placeList, { title: '', hint: '', file: [] }],
    })),
}));

export default usePlaceRegisterStore;
