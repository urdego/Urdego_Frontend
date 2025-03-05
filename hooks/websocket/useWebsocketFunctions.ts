import { useWebSocketStore } from '@/stores/useWebSocketStore';
import { useState } from 'react';
import { WebSocketMessage } from '@/lib/types/websocket';

import { WEBSOCKET_CONFIG } from '@/config/webSocketConfig';
import {
  InviteWebSocketMessage,
  ErrorWebSocketMessage,
} from '@/lib/types/notification';
import { StompSubscription } from '@stomp/stompjs';

type DestinationType = 'room' | 'game' | 'notification' | 'error';

export const useWebSocketFunctions = () => {
  const { client, isConnected } = useWebSocketStore();
  const [subscribedRoom, setSubscribedRoom] = useState<string | null>(null);
  const [subscribedError, setSubscribedError] = useState<string | null>(null);
  const [subscriptions, setSubscriptions] = useState<{
    [key: string]: StompSubscription;
  }>({});

  const unsubscribeFromRoom = (roomId: string) => {
    console.log('구독 해제 시도:', roomId);
    console.log('현재 구독 정보:', subscriptions);

    if (!client || !isConnected) {
      console.warn('WebSocket이 연결되지 않아 구독 해제 불가');
      return;
    }

    if (!subscriptions[roomId]) {
      console.log(`이미 구독 해제된 방입니다: ${roomId}`);
      return;
    }

    try {
      subscriptions[roomId].unsubscribe();

      // 구독 정보 제거
      const newSubscriptions = { ...subscriptions };
      delete newSubscriptions[roomId];
      setSubscriptions(newSubscriptions);

      if (subscribedRoom === roomId) {
        setSubscribedRoom(null);
      }

      console.log(`구독 해제 완료: ${roomId}`);
      console.log('구독 해제 후 남은 구독 정보:', newSubscriptions);
    } catch (error) {
      console.error(`구독 해제 중 오류 발생: ${roomId}`, error);
    }
  };

  const subscribeToRoom = (
    roomId: string,
    onMessageReceived: (message: WebSocketMessage) => void
  ) => {
    if (client && isConnected) {
      if (subscribedRoom === roomId) {
        console.log(`Already subscribed to room: ${roomId}`);
        return;
      }

      const subscriptionPath = WEBSOCKET_CONFIG.SUBSCRIBE_ROOM(roomId);
      console.log(`Subscribing to room: ${subscriptionPath}`);

      const subscription = client.subscribe(subscriptionPath, (message) => {
        console.log(`Message received in room ${roomId}:`, message.body);
        onMessageReceived(JSON.parse(message.body));
      });

      // 구독 정보 저장
      setSubscriptions((prev) => ({
        ...prev,
        [roomId]: subscription,
      }));

      setSubscribedRoom(roomId);
    } else {
      console.warn('WebSocket is not connected.');
    }
  };

  const subscribeToNotification = (
    targetId: number,
    onMessageReceived: (message: InviteWebSocketMessage) => void
  ) => {
    if (client && isConnected) {
      const subscriptionPath =
        WEBSOCKET_CONFIG.SUBSCRIBE_NOTIFICATION(targetId);
      console.log(`Subscribing to notifications for user ${targetId}`);

      client.subscribe(subscriptionPath, (message) => {
        console.log(
          `Notification received for user ${targetId}:`,
          message.body
        );
        onMessageReceived(JSON.parse(message.body));
      });

      console.log(`Subscribed to notifications for user ${targetId}`);
    } else {
      console.warn('WebSocket is not connected.');
    }
  };

  const subscribeToError = (
    onMessageReceived: (message: ErrorWebSocketMessage) => void
  ) => {
    if (client && isConnected) {
      if (subscribedError) {
        console.log(`Already subscribed to errors`);
        return;
      }

      const subscriptionPath = WEBSOCKET_CONFIG.SUBSCRIBE_ERROR();
      console.log(`Subscribing to errors`);

      client.subscribe(subscriptionPath, (message) => {
        console.log(`Error received:`, message.body);
        onMessageReceived(JSON.parse(message.body));
      });

      setSubscribedError('subscribed');
    } else {
      console.warn('WebSocket is not connected.');
    }
  };

  const sendMessage = (
    messageType: string,
    payload: object,
    destinationType: DestinationType
  ) => {
    if (!client || !isConnected) {
      console.warn('WebSocket is not connected.');
      return;
    }

    // destinationType에 따라 전송 경로를 분기
    let destination = '';
    switch (destinationType) {
      case 'room':
        destination = WEBSOCKET_CONFIG.PUBLISH_ROOM_EVENT;
        break;
      case 'game':
        destination = WEBSOCKET_CONFIG.PUBLISH_GAME_EVENT;
        break;
      case 'notification':
        destination = WEBSOCKET_CONFIG.PUBLISH_NOTIFICATION_EVENT;
        break;
    }

    const message = { messageType, payload };
    client.publish({ destination, body: JSON.stringify(message) });
    console.log('Message sent:', message);
  };

  return {
    subscribeToRoom,
    unsubscribeFromRoom,
    subscribeToNotification,
    subscribeToError,
    sendMessage,
  };
};
