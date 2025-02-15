import { useWebSocketStore } from '@/stores/useWebSocketStore';
import { useState } from 'react';
import { WebSocketMessage } from '@/hooks/websocket/useWebsocket.types';
import { WEBSOCKET_CONFIG } from '@/config/webSocketConfig';

export const useWebSocketFunctions = () => {
  const { client, isConnected } = useWebSocketStore();
  const [subscribedRoom, setSubscribedRoom] = useState<string | null>(null);

  const subscribeToRoom = (
    roomId: string,
    onMessageReceived: (message: WebSocketMessage) => void // 타입 변경
  ) => {
    if (client && isConnected) {
      if (subscribedRoom === roomId) {
        console.log(`Already subscribed to room: ${roomId}`);
        return;
      }

      const subscriptionPath = WEBSOCKET_CONFIG.SUBSCRIBE_ROOM(roomId);
      console.log(`Subscribing to room: ${subscriptionPath}`);

      client.subscribe(subscriptionPath, (message) => {
        console.log(`Message received in room ${roomId}:`, message.body);
        // message.body를 JSON으로 파싱한 값을 onMessageReceived에 전달합니다.
        onMessageReceived(JSON.parse(message.body));
      });

      setSubscribedRoom(roomId);
    } else {
      console.warn('WebSocket is not connected.');
    }
  };

  const sendMessage = (
    messageType: string,
    payload: object,
    destinationType: 'room' | 'game'
  ) => {
    if (client && isConnected) {
      const destination =
        destinationType === 'room'
          ? WEBSOCKET_CONFIG.PUBLISH_ROOM_EVENT
          : WEBSOCKET_CONFIG.PUBLISH_GAME_EVENT;
      const message = { messageType, payload };

      client.publish({ destination, body: JSON.stringify(message) });

      console.log('Message sent:', message);
    } else {
      console.warn('WebSocket is not connected.');
    }
  };

  return { subscribeToRoom, sendMessage };
};
