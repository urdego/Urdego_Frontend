import { useWebSocketStore } from '@/stores/useWebSocketStore';
import { useState } from 'react';

export const useWebSocketFunctions = () => {
  const { client, isConnected } = useWebSocketStore();
  const [subscribedRoom, setSubscribedRoom] = useState<string | null>(null);

  const subscribeToRoom = (
    roomId: string,
    onMessageReceived: (message: string) => void
  ) => {
    if (client && isConnected) {
      if (subscribedRoom === roomId) {
        console.log(`Already subscribed to room: ${roomId}`);
        return;
      }

      const subscriptionPath = `/urdego/sub/${roomId}`;
      console.log(`Subscribing to room: ${subscriptionPath}`);

      client.subscribe(subscriptionPath, (message) => {
        console.log(`Message received in room ${roomId}:`, message.body);
        onMessageReceived(JSON.parse(message.body));
      });

      setSubscribedRoom(roomId);
    } else {
      console.warn('WebSocket is not connected.');
    }
  };

  const sendMessage = (messageType: string, payload: object) => {
    if (client && isConnected) {
      const destination = `/urdego/pub/room/event`;
      const message = { messageType, payload };

      client.publish({ destination, body: JSON.stringify(message) });

      console.log('Message sent:', message);
    } else {
      console.warn('WebSocket is not connected.');
    }
  };

  return { subscribeToRoom, sendMessage };
};
