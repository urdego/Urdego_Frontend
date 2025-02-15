export const WEBSOCKET_CONFIG = {
  SUBSCRIBE_ROOM: (roomId: string) => `/urdego/sub/${roomId}`,
  PUBLISH_ROOM_EVENT: '/urdego/pub/room/event',
  PUBLISH_GAME_EVENT: '/urdego/pub/game/event',
  // 추후 다른 경로들도 여기에 추가 예정
};
