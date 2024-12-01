import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
}

interface LoadingActions {
  setLoading: (loading: boolean) => void;
}

const useLoadingStore = create<LoadingState & LoadingActions>((set) => ({
  isLoading: false,
  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));

export default useLoadingStore;
