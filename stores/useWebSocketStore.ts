import { create } from 'zustand';
import { Client } from '@stomp/stompjs';

const WEBSOCKET_URL = 'wss://urdego.site/urdego/connect';

interface WebSocketState {
  client: Client | null;
  isConnected: boolean;
  connectWebSocket: () => void;
  disconnectWebSocket: () => void;
}

export const useWebSocketStore = create<WebSocketState>((set, get) => ({
  client: null,
  isConnected: false,

  connectWebSocket: () => {
    if (get().client) {
      console.log('WebSocket is already connected.');
      return;
    }

    console.log('Attempting WebSocket connection...');

    const client = new Client({
      brokerURL: WEBSOCKET_URL,
      reconnectDelay: 0,
      onConnect: () => {
        console.log('WebSocket connected successfully.');
        set({ isConnected: true });
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
