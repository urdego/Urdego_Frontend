import { create } from 'zustand';

export interface Place {
  title: string;
  hint: string;
  file: File[];
  previewFile: string[];
  lat: number;
  lng: number;
  address: string | null;
}

interface State {
  placeList: Place[];
}

interface Actions {
  setPlaceInput: (
    targetIndex: number,
    filed: string,
    value: string | number | string[] | File[]
  ) => void;
  initPlaceList: () => void;
  addPlaceList: () => void;
  removePlaceList: (targetIndex: number) => void;
  removePartPlaceFile: (
    targetPlaceIndex: number,
    targetFileIndex: number
  ) => void;
}

const usePlaceRegisterStore = create<State & Actions>((set) => ({
  placeList: [
    {
      title: '',
      hint: '',
      file: [],
      previewFile: [],
      lat: 0,
      lng: 0,
      address: null,
    },
  ],
  setPlaceInput: (targetIndex, filed, value) =>
    set((state) => {
      const updatePlace = state.placeList.map((place, index) =>
        targetIndex === index ? { ...place, [filed]: value } : place
      );
      return { placeList: updatePlace };
    }),
  initPlaceList: () =>
    set(() => ({
      placeList: [
        {
          title: '',
          hint: '',
          file: [],
          previewFile: [],
          lat: 0,
          lng: 0,
          address: null,
        },
      ],
    })),
  addPlaceList: () =>
    set((state) => ({
      placeList: [
        ...state.placeList,
        {
          title: '',
          hint: '',
          file: [],
          previewFile: [],
          lat: 0,
          lng: 0,
          address: null,
        },
      ],
    })),
  removePlaceList: (targetIndex) =>
    set((state) => ({
      placeList: state.placeList.filter((_, index) => targetIndex !== index),
    })),
  removePartPlaceFile: (targetPlaceIndex, targetFileIndex) => {
    set((state) => ({
      placeList: state.placeList.map((item, index) =>
        targetPlaceIndex === index
          ? {
              ...item,
              file: item.file.filter(
                (_, fileIndex) => targetFileIndex !== fileIndex
              ),
              previewFile: item.previewFile.filter(
                (_, fileIndex) => targetFileIndex !== fileIndex
              ),
            }
          : item
      ),
    }));
  },
}));

export default usePlaceRegisterStore;
