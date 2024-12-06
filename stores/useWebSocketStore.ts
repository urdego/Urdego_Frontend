import { create } from 'zustand';

export interface User {
  id: number;
  name: string;
  isHost: boolean;
  isReady: boolean;
}

interface WebSocketMessage {
  data: {
    waitingRoomParticipants: {
      nickname: string;
      status: string;
      id: number;
    }[];
    eventType?: 'PARTICIPANT' | 'READY' | 'START';
    users?: User[];
  };
}

interface WebSocketStore {
  messages: WebSocketMessage[];
  users: User[];
  addMessage: (message: WebSocketMessage) => void;
  clearMessages: () => void;
  setUsers: (users: User[]) => void;
}

const useWebSocketStore = create<WebSocketStore>((set) => ({
  messages: [],
  users: [],
  addMessage: (message) => {
    set((state) => {
      const updatedUsers = message.data.waitingRoomParticipants.map(
        (participant) => ({
          id: participant.id,
          name: participant.nickname,
          isHost: participant.id === 1,
          isReady: participant.status === 'ready',
        })
      );

      return {
        messages: [...state.messages, message],
        users: updatedUsers,
      };
    });
  },
  clearMessages: () => set({ messages: [] }),
  setUsers: (users) => set({ users }),
}));

export default useWebSocketStore;
