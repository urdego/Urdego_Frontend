export const WAITING_ROOM_EVENTS = {
  USER_JOIN: 'waiting:user:join',
  USER_LEAVE: 'waiting:user:leave',
  READY_TOGGLE: 'waiting:ready:toggle',
  GAME_START: 'waiting:game:start',
} as const;

export const GAME_EVENTS = {
  // 게임 시작/종료
  GAME_START: 'game:start',
  GAME_END: 'game:end',

  // 라운드 관련
  ROUND_START: 'game:round:start',
  ROUND_END: 'game:round:end',
  ROUND_TIMER: 'game:round:timer',

  // 답안 제출 관련
  ANSWER_SUBMIT: 'game:answer:submit',

  // 결과 관련
  ROUND_RESULT: 'game:round:result',
  FINAL_RESULT: 'game:final:result',
} as const;
