import { create } from 'zustand';

interface SSEState {
  eventSource: EventSource | null;
  setEventSource: (eventSource: EventSource | null) => void;
}

const useSSEStore = create<SSEState>((set) => ({
  eventSource: null,
  setEventSource: (eventSource) => set({ eventSource }),
}));

export default useSSEStore;
