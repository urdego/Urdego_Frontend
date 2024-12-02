// 게임 참여 유저 정보
export interface UserInfo {
  id: number;
  nickname: string;
  isHost: boolean;
  isReady: boolean;
}

// 게임 상태 정보
export interface GameState {
  currentRound: number;
  totalRounds: number;
  timeRemaining: number;
  isRoundActive: boolean;
  isSubmitted: boolean;
}

// 좌표 정보
export interface Coordinate {
  lat: number;
  lng: number;
}

// 라운드 별 제공 정보
export interface RoundInfo {
  round: number;
  hint: string;
  timeLimit: number;
  images: string[];
  answerCoordinate?: Coordinate; // 라운드 종료 후 공개
}

// 유저별 정답 제출 정보
export interface SubmitAnswerData {
  nickname: string;
  round: number;
  coordinate: Coordinate;
}

// 답안 제출 응답
export interface SubmitAnswerResponse {
  success: boolean;
  message?: string;
}

// 라운드 별 정답 정보 및 유저별 정답 정보,점수
export interface RoundResult {
  round: number;
  answerCoordinate: Coordinate;
  userResults: {
    nickname: string;
    coordinate: Coordinate;
    score: number;
  }[];
  isLastRound: boolean;
}

// 게임 종료 시 유저별 최종 점수, 랭킹 정보
export interface GameResult {
  rankings: {
    userId: number;
    nickname: string;
    totalScore: number;
    ranking: number;
    roundScores: number[]; // 각 라운드별 점수
  }[];
}
