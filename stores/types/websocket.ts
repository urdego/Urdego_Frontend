export interface WebSocketMessageData {
  nickname?: string;
  status?: string;
  groupId?: string | number;
  waitingRoomParticipants?: Array<{
    nickname: string;
    status: string;
    id: number;
  }>;
}

export interface WebSocketMessage {
  eventType: 'READY' | 'PARTICIPANT' | 'START';
  data: WebSocketMessageData;
}
