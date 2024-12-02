import { useEffect, useCallback } from 'react';
import { waitingRoomService } from '../services/waitingRoom.service';
import { WAITING_ROOM_EVENTS } from '../constants/events';
import type { UserInfo } from '../types/socket.types';

export const useWaitingRoomSocket = (roomId: string) => {
  useEffect(() => {
    const socket = waitingRoomService.connect(roomId);

    socket.on(WAITING_ROOM_EVENTS.USER_JOIN, (user: UserInfo) => {
      // 유저 입장 처리
    });

    socket.on(WAITING_ROOM_EVENTS.USER_LEAVE, (userId: string) => {
      // 유저 퇴장 처리
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const toggleReady = useCallback(() => {
    waitingRoomService.toggleReady();
  }, []);

  const startGame = useCallback(() => {
    waitingRoomService.startGame(roomId);
  }, [roomId]);

  return { toggleReady, startGame };
};
