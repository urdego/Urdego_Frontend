import { InGamePayload, ScoreUpdatePayload, GameEndPayload } from './inGame';
import { RoomPayload } from './roomJoin';

export type WebSocketPayload =
  | InGamePayload
  | ScoreUpdatePayload
  | GameEndPayload
  | RoomPayload;

export interface WebSocketMessage {
  messageType:
    | 'QUESTION_GIVE'
    | 'ANSWER_SUBMIT'
    | 'ROUND_RESULT'
    | 'SCORE_UPDATE'
    | 'GAME_END'
    | 'PLAYER_JOIN'
    | 'PLAYER_READY'
    | 'GAME_START'
    | 'PLAYER_REMOVE';
  payload: WebSocketPayload;
}
