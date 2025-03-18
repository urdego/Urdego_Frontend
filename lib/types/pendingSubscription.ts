import { WebSocketMessage } from '@/lib/types/websocket';
import {
  InviteWebSocketMessage,
  ErrorWebSocketMessage,
} from '@/lib/types/notification';

export type SubscriptionType = 'room' | 'notification' | 'error';

/**
 * 방(room) 구독
 * - identifier: string
 * - callback: (message: WebSocketMessage) => void
 */
interface RoomSubscription {
  type: 'room';
  identifier: string;
  callback: (message: WebSocketMessage) => void;
}

/**
 * 알림(notification) 구독
 * - identifier: number
 * - callback: (message: InviteWebSocketMessage) => void
 */
interface NotificationSubscription {
  type: 'notification';
  identifier: number;
  callback: (message: InviteWebSocketMessage) => void;
}

/**
 * 에러(error) 구독
 * - identifier: null (식별자 없음)
 * - callback: (message: ErrorWebSocketMessage) => void
 */
interface ErrorSubscription {
  type: 'error';
  identifier: null;
  callback: (message: ErrorWebSocketMessage) => void;
}

/**
 * 세 가지 구독 타입을 합친 "차별화된 유니온" 타입
 */
export type PendingSubscription =
  | RoomSubscription
  | NotificationSubscription
  | ErrorSubscription;
