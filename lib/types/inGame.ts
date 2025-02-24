export interface AnswerCoordinates {
  lat: number;
  lng: number;
}

export interface SubmitCoordinates {
  nickname: string;
  characterType: string;
  lat: number;
  lng: number;
}

export interface RoundScore {
  rank: number;
  userId: number;
  nickname: string;
  characterType: string;
  score: number;
}

export interface ScoreUpdatePayload {
  gameId: string;
  roomId: string;
  roundNum: number;
  isLast: boolean;
  roundScore: RoundScore[];
}

export interface GameEndPayload {
  gameId: string;
  roomId: string;
  status: 'COMPLETED';
  totalScores: Record<number, number>; // userId를 키로 하는 점수 맵
  exp: Record<number, number>; // userId를 키로 하는 경험치 맵
}

export interface InGamePayload {
  gameId: string;
  roomId: string;
  roundNum: number;
  questionId: string;
  latitude?: number;
  longitude?: number;
  contents: string[];
  hint?: string;
  userId: number;
  nickname: string;
  activeCharacter: string;
  level: number;
  placeName: string;
  placeAddress: string;
  answerCoordinates: AnswerCoordinates;
  submitCoordinates: SubmitCoordinates;
}
