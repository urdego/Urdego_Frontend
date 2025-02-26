export interface Player {
  userId: number;
  nickname: string;
  activeCharacter: string;
  level: number;
}

export interface RoomPayload {
  roomId: string;
  status: string;
  currentPlayers: Player[];
  host: string;
  readyStatus: { [key: string]: boolean };
  allReady: boolean;
  roomName: string;
  gameId: string;
  contents?: string[];
  hint?: string;
  userId?: number;
  latitude?: number;
  longitude?: number;
  roundNum?: number;
  placeName?: string;
  placeAddress?: string;
  answerCoordinate?: {
    lat: number;
    lng: number;
  };
  submitCoordinates?: {
    nickname: string;
    characterType: string;
    lat: number;
    lng: number;
  }[];
  questionId?: string;
}
