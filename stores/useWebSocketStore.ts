import { create } from 'zustand';

export type UserRole = 'MANAGER' | 'MEMBER';

export interface User {
  id: number;
  name: string;
  isHost: boolean;
  isReady: boolean;
  role: UserRole;
}

interface WaitingRoomData {
  waitingRoomParticipants: {
    nickname: string;
    status: string;
    id: number;
  }[];
}

interface GameStartData {
  action: 'startGame';
  gameId: string;
  joinedUser: string[];
  totalRounds: number;
}

interface WebSocketMessage {
  data: WaitingRoomData | GameStartData;
}

interface WebSocketStore {
  messages: WebSocketMessage[];
  users: User[];
  hostNickname: string | null;
  addMessage: (message: WebSocketMessage) => void;
  clearMessages: () => void;
  setUsers: (users: User[]) => void;
  setHostNickname: (nickname: string) => void;
}

const useWebSocketStore = create<WebSocketStore>((set) => ({
  messages: [],
  users: [],
  hostNickname: null,
  addMessage: (message) => {
    set((state) => {
      // WaitingRoomData 타입인 경우에만 users 업데이트
      if ('waitingRoomParticipants' in message.data) {
        const updatedUsers = message.data.waitingRoomParticipants.map(
          (participant): User => ({
            id: participant.id,
            name: participant.nickname,
            isHost: participant.nickname === state.hostNickname,
            isReady:
              participant.status === 'Ready' ||
              participant.nickname === state.hostNickname,
            role:
              participant.nickname === state.hostNickname
                ? 'MANAGER'
                : 'MEMBER',
          })
        );

        return {
          ...state,
          messages: [...state.messages, message],
          users: updatedUsers,
        };
      }

      return {
        ...state,
        messages: [...state.messages, message],
      };
    });
  },
  clearMessages: () => set({ messages: [], hostNickname: null }),
  setUsers: (users) => set({ users }),
  setHostNickname: (nickname) => set({ hostNickname: nickname }),
}));

export default useWebSocketStore;
