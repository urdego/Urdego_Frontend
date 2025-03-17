import { create } from 'zustand';
import { Client } from '@stomp/stompjs';
import { WEBSOCKET_CONFIG } from '@/config/webSocketConfig';
import { PendingSubscription } from '@/lib/types/pendingSubscription';

interface WebSocketState {
  client: Client | null;
  isConnected: boolean;
  pendingSubscriptions: PendingSubscription[];

  addPendingSubscription: (subscription: PendingSubscription) => void;
  clearPendingSubscriptions: () => void;
  resubscribeAll: () => void;
  connectWebSocket: () => void;
  disconnectWebSocket: () => void;
}

export const useWebSocketStore = create<WebSocketState>((set, get) => ({
  client: null,
  isConnected: false,
  pendingSubscriptions: [],

  addPendingSubscription: (subscription: PendingSubscription) => {
    set((state) => {
      // 이미 같은 type, identifier를 가진 구독이 있는지 확인
      const isDuplicate = state.pendingSubscriptions.some(
        (existing) =>
          existing.type === subscription.type &&
          existing.identifier === subscription.identifier
      );

      // 중복이 아니라면 추가
      if (!isDuplicate) {
        return {
          pendingSubscriptions: [...state.pendingSubscriptions, subscription],
        };
      }

      // 중복이면 아무것도 안 함
      return state;
    });
  },

  clearPendingSubscriptions: () => {
    set({ pendingSubscriptions: [] });
  },

  resubscribeAll: () => {
    const { client, isConnected, pendingSubscriptions } = get();
    if (!client || !isConnected) {
      console.warn('WebSocket not connected. Skipping resubscription.');
      return;
    }

    // 차별화된 유니온을 switch로 분기
    pendingSubscriptions.forEach((sub) => {
      switch (sub.type) {
        case 'room': {
          const subscriptionPath = WEBSOCKET_CONFIG.SUBSCRIBE_ROOM(
            sub.identifier
          );
          console.log(
            `Resubscribing to room ${sub.identifier}: ${subscriptionPath}`
          );
          client.subscribe(subscriptionPath, (message) => {
            console.log(`Room message received:`, message.body);
            sub.callback(JSON.parse(message.body));
          });
          break;
        }
        case 'notification': {
          const subscriptionPath = WEBSOCKET_CONFIG.SUBSCRIBE_NOTIFICATION(
            sub.identifier
          );
          console.log(
            `Resubscribing to notification ${sub.identifier}: ${subscriptionPath}`
          );
          client.subscribe(subscriptionPath, (message) => {
            console.log(`Notification received:`, message.body);
            sub.callback(JSON.parse(message.body));
          });
          break;
        }
        case 'error': {
          const subscriptionPath = WEBSOCKET_CONFIG.SUBSCRIBE_ERROR();
          console.log(`Resubscribing to error: ${subscriptionPath}`);
          client.subscribe(subscriptionPath, (message) => {
            console.log(`Error received:`, message.body);
            sub.callback(JSON.parse(message.body));
          });
          break;
        }
      }
    });
  },

  connectWebSocket: () => {
    const { client: existingClient } = get();
    if (existingClient) {
      console.log('WebSocket is already connected.');
      return;
    }

    console.log('Attempting WebSocket connection...');
    const client = new Client({
      brokerURL: WEBSOCKET_CONFIG.WEBSOCKET_URL,
      reconnectDelay: 1000,
      onConnect: () => {
        console.log('WebSocket connected successfully.');
        set({ isConnected: true });
        // 연결 복구 시, 저장된 구독 정보를 모두 다시 구독
        get().resubscribeAll();
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame);
      },
    });

    client.activate();
    set({ client });
  },

  disconnectWebSocket: () => {
    const { client } = get();
    if (client) {
      console.log('Disconnecting WebSocket...');
      client.deactivate();
      set({ client: null, isConnected: false });
    }
  },
}));

export default useWebSocketStore;
