import { useState } from 'react';
import { Client } from '@stomp/stompjs';

export const useWebSocketFunctions = (
  socketClientRef: React.MutableRefObject<Client | null>
) => {
  const [subscribedRoom, setSubscribedRoom] = useState<string | null>(null);

  /** 메시지 구독 */
  const subscribeToRoom = (
    roomId: string,
    onMessageReceived: (message: string) => void
  ) => {
    if (socketClientRef.current) {
      if (subscribedRoom === roomId) {
        console.log(`이미 구독 중인 방: ${roomId}`);
        return;
      }

      const subscriptionPath = `/urdego/sub/${roomId}`;
      console.log(`방 구독 요청: ${subscriptionPath}`);

      socketClientRef.current.subscribe(subscriptionPath, (message) => {
        console.log(`방(${roomId}) 메시지 수신:`, message.body);
        onMessageReceived(JSON.parse(message.body));
      });

      setSubscribedRoom(roomId);
    } else {
      console.warn('웹소켓이 아직 연결되지 않았습니다.');
    }
  };

  /* 메시지 발행 */
  const sendMessage = (messageType: string, payload: object) => {
    if (socketClientRef.current) {
      const destination = `/urdego/pub/room/event`;
      const message = { messageType, payload };

      socketClientRef.current.publish({
        destination,
        body: JSON.stringify(message),
      });

      console.log('메시지 발행:', message);
    } else {
      console.warn('웹소켓 연결이 없습니다.');
    }
  };

  return { subscribeToRoom, sendMessage };
};
