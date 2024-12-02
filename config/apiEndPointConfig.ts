export const API_PORT_CONFIG = Object.freeze({
  AUTH: 8081,
  CONTENT: 8082,
  GAME: 8084,
});

export const API_URL_CONFIG = Object.freeze({
  CONTENT: {
    POST_MULTIPLE: '/api/content-service/contents/multiple',
    POST_SINGLE: '/api/content-service/contents/',
  },
  AUTH: {
    SIGNUP: '/api/auth/user-service/users',
    LOGIN: '/api/auth/user-service/login',
  },
  GAME: {
    SUBMIT_ANSWER: '/api/game-service/submissions',
  },
});
