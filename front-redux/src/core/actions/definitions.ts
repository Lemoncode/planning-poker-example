const prefix = '[GLOBAL]';

export const actionIds = {
  SET_USER_INFORMATION: `${prefix}[0] Sets the nickname and isMaster of the user.`,
  ROOM_REQUEST_START: `${prefix}[1] Fires room name request to server.`,
  ROOM_REQUEST_COMPLETED: `${prefix}[2] sets the room where the user is going to be connected`,
};
