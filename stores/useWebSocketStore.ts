import { create } from 'zustand';

interface WebSocketMessage {
  eventType: string;
  data: any;
  timestamp: number;
}

interface WebSocketStore {
  messages: WebSocketMessage[];
  addMessage: (message: WebSocketMessage) => void;
  clearMessages: () => void;
}

const useWebSocketStore = create<WebSocketStore>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  clearMessages: () => set({ messages: [] }),
}));

export default useWebSocketStore;
