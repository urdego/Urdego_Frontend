import { create } from 'zustand';

interface Place {
  title: string;
  hint: string;
  file: File[];
  previewFile: string[];
}

interface State {
  placeList: Place[];
}

interface Actions {
  setPlaceInput: (
    targetIndex: number,
    filed: string,
    value: string | string[] | File[]
  ) => void;
  addPlaceList: () => void;
  deletePlaceList: (targetIndex: number) => void;
}

const usePlaceRegisterStore = create<State & Actions>((set) => ({
  placeList: [{ title: '', hint: '', file: [], previewFile: [] }],
  setPlaceInput: (targetIndex, filed, value) =>
    set((state) => {
      const updatePlace = state.placeList.map((place, index) =>
        targetIndex === index ? { ...place, [filed]: value } : place
      );
      return { placeList: updatePlace };
    }),
  addPlaceList: () =>
    set((state) => ({
      placeList: [
        ...state.placeList,
        { title: '', hint: '', file: [], previewFile: [] },
      ],
    })),
  deletePlaceList: (targetIndex) =>
    set((state) => ({
      placeList: state.placeList.filter((_, index) => targetIndex !== index),
    })),
}));

export default usePlaceRegisterStore;
