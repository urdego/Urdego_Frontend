import SocketInstance from '../instance/socket';
import { WAITING_ROOM_EVENTS } from '../constants/events';
import type { UserInfo } from '../types/socket.types';

export const waitingRoomService = {
  connect(roomId: string) {
    return SocketInstance.getInstance(`waiting-room/${roomId}`);
  },

  toggleReady() {
    const socket = SocketInstance.getInstance('waiting-room');
    socket.emit(WAITING_ROOM_EVENTS.READY_TOGGLE);
  },

  startGame(roomId: string) {
    const socket = SocketInstance.getInstance('waiting-room');
    socket.emit(WAITING_ROOM_EVENTS.GAME_START, { roomId });
  },
};
