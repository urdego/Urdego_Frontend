export interface Player {
  userId: number;
  nickname: string;
  activeCharacter: string;
  level: number;
}

export interface RoomPayload {
  allReady: boolean;
  currentPlayers: Player[];
  host: string;
  readyStatus: { [key: string]: boolean };
  roomId: string;
  status: string;
}

export interface WebSocketMessage {
  messageType: string;
  payload: RoomPayload;
}
