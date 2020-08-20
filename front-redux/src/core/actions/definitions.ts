const prefix = '[GLOBAL]';

export const actionIds = {
  SET_MASTER_NICK_NAME: `${prefix}[0] Sets the nickname and isMaster of the user.`,
  ROOM_REQUEST_START: `${prefix}[1] Fires room name request to server.`,
  ROOM_REQUEST_COMPLETED: `${prefix}[2] sets the room where the user is going to be connected`,
  ADD_PLAYER: `${prefix}[3] New player arrived add it to the list of players`,
};
