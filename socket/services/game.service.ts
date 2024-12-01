import SocketInstance from '../instance/socket';
import { GAME_EVENTS } from '../constants/events';
import type {
  SubmitAnswerData,
  SubmitAnswerResponse,
} from '../types/socket.types';

export const gameService = {
  connect(roomId: string) {
    const socket = SocketInstance.getInstance(`game/${roomId}`);

    socket.on('connect_error', () => {
      console.error('게임 서버 연결 실패');
      setTimeout(() => this.connect(roomId), 1000);
    });

    return socket;
  },

  submitAnswer(
    roomId: string,
    data: SubmitAnswerData
  ): Promise<SubmitAnswerResponse> {
    const socket = SocketInstance.getInstance(`game/${roomId}`);
    return new Promise((resolve, reject) => {
      socket.emit(
        GAME_EVENTS.ANSWER_SUBMIT,
        data,
        (response: SubmitAnswerResponse) => {
          if (response.success) {
            resolve(response);
          } else {
            reject(new Error(response.message));
          }
        }
      );
    });
  },
};
