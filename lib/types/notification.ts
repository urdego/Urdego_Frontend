export interface InviteMessage {
  notificationId: string;
  senderId: number;
  targetId: number;
  roomId: string;
  roomName: string;
  senderNickname: string;
  targetNickname: string;
  action: string;
  timestamp: string;
  read: boolean;
  accepted: boolean;
}

export interface InviteWebSocketMessage {
  messageType: 'INVITE_PLAYER';
  payload: InviteMessage;
}

export interface ErrorWebSocketMessage {
  messageType: 'ERROR';
  payload: {
    errors: string;
  };
}
