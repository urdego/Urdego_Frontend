export const API_URL_CONFIG = {
  CONTENT: {
    POST_MULTIPLE: '/api/content-service',
    GET: '/api/content-service',
  },
  AUTH: {
    SIGNUP: '/api/user-service/users',
    LOGIN: '/api/user-service/login',
    NICKNAME: '/api/user-service/users/nickname',
  },
  USER_SERVICE: {
    CHARACTER: '/api/user-service/users/character',
    USERS: '/api/user-service/users',
  },
  NOTIFICATION: {
    SSE: '/api/notification-service/sse/connect/',
    SEND: '/api/notification-service/notifications/send',
  },
  GROUP: {
    CREATE: '/api/group-service/groups',
    CONNECT: '/group-service/connect',
    WS_URL: {
      PROD: 'wss://urdego.com/api/group-service/connect',
      DEV: `ws://3.39.135.47:8083/group-service/connect`,
    },
    SUBSCRIBE: '/group-service/subscribe/group',
    PUBLISH: '/group-service/publish/group',
  },
  GAME: {
    WAITING_ROOM_LIST: '/api/game-service/room/list',
    SUBMIT_ANSWER: '/api/game-service/submissions',
    WS_URL: {
      PROD: 'wss://urdego.com/api/game-service/connect',
      DEV: `ws://3.39.135.47:8084/game-service/connect`,
    },
    SUBSCRIBE: '/game-service/subscribe',
    PUBLISH: '/game-service/publish',
  },
} as const;
