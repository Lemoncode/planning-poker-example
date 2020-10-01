export const InputMessageTypes = {
  ESTABLISH_CONNECTION_MASTER: 'CONNECTION_ESTABLISHED_MASTER',
  ESTABLISH_CONNECTION_PLAYER: 'CONNECTION_ESTABLISHED_PLAYER',
  CREATE_STORY: 'CREATE_STORY',
  USER_VOTED: 'USER_VOTED',
  END_VOTE_TIME: 'END_VOTE_TIME',
};

export const OutputMessageTypes = {
  CONNECTION_ESTABLISHED_MASTER: 'CONNECTION_ESTABLISHED_MASTER',
  CONNECTION_ESTABLISHED_PLAYER: 'CONNECTION_ESTABLISHED_PLAYER',
  USER_JOINED_ONLY_SEND_MASTER: 'MASTER_USER_JOINED',
  USER_VOTED_ONLY_SEND_MASTER: 'USER_VOTED_ONLY_SEND_MASTER',
  SHOW_RESULTS: 'SHOW_RESULTS',
  NEW_STORY: 'NEW_STORY',
  ERROR_ROOM_BUSY: 'ERROR_ROOM_BUSY',
  ERROR_CANNOT_FIND_ROOM: 'ERROR_CANNOT_FIND_ROOM',
  NICKNAME_ALREADY_IN_USE: 'NICKNAME_ALREADY_IN_USE',
  APPEND_TEXT: 'APPEND_TEXT',
};

export const SocketMessageTypes = {
  CONNECTION_ESTABLISHED_PLAYER: 'CONNECTION_ESTABLISHED_PLAYER',
  NOTIFY_USER_VOTED: 'NOTIFY_USER_VOTED',
};

const masterRoomSuffix = 'master';

export const getMasterRoom = (room: string) => `${room}.${masterRoomSuffix}`;

export const ErrorCodes = {
  roomBusy: {
    type: 1,
    message: 'cannot create room, room is busy',
  },
  nicknameAlreadyInUse: {
    type: 2,
    message: 'nickname is already in use',
  },
};

export const SocketOuputMessageLiteral = {
  MESSAGE: 'message',
};
