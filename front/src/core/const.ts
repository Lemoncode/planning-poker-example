// TODO: Add env variables
export const baseApiUrl = 'http://localhost:8081';
export const baseSocketUrl = 'http://localhost:3000';

// TODO we could extract inspecting current URL
export const appBaseUrl = 'http://localhost:8080';

export const SocketMessageTypes = {
  CONNECTION_ESTABLISHED_PLAYER: 'CONNECTION_ESTABLISHED_PLAYER',
};

export const SocketErrorTypes = {
  ROOM_BUSY: 1,
  NICKNAME_ALREADY_IN_USE: 2,
};
