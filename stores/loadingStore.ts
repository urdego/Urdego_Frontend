import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
  isPreviewLoading: boolean[][];
}

interface LoadingActions {
  setLoading: (loading: boolean) => void;
  setPreviewLoading: ({
    locationIndex,
    newPreviewLoading,
  }: {
    locationIndex: number;
    newPreviewLoading: boolean[];
  }) => void;
}

const useLoadingStore = create<LoadingState & LoadingActions>((set) => ({
  isLoading: false,
  isPreviewLoading: [[], [], []],
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setPreviewLoading: ({
    locationIndex,
    newPreviewLoading,
  }: {
    locationIndex: number;
    newPreviewLoading: boolean[];
  }) =>
    set((state) => {
      const updatedPreviewLoading = [...state.isPreviewLoading];
      updatedPreviewLoading[locationIndex] = newPreviewLoading;
      return { isPreviewLoading: updatedPreviewLoading };
    }),
}));

export default useLoadingStore;
