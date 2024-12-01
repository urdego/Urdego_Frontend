import { create } from 'zustand';

interface SSEStore {
 eventSource: EventSource | null;
 setEventSource: (eventSource: EventSource | null) => void;
}

const useSSEStore = create<SSEStore>((set) => ({
 eventSource: null,
 setEventSource: (eventSource) => set({ eventSource }),
}));

export default useSSEStore;