const prefix = '[GLOBAL]';

export const actionIds = {
  SET_MASTER_NICK_NAME: `${prefix}[0] Sets the nickname and isMaster of the user + fire socket connection.`,
  ROOM_REQUEST_START: `${prefix}[1] Fires room name request to server.`,
  ROOM_REQUEST_COMPLETED: `${prefix}[2] sets the room where the user is going to be connected`,
  ADD_NEW_PLAYER: `${prefix}[3] New player arrived add it to the list of players`,
  CLEANUP_BEFORE_MOVING_TO_NEXT_STORY: `${prefix}[4] Set Story to empty string and voted and vote value to empty for every player`,
  SERVER_INFORMS_USER_HAS_VOTED_ACTION: `${prefix}[6] A given user has voted - no value is informed here`,
  SHOW_VOTING_RESULTS: `${prefix}[8] Server provides with a list of players and voting results`,
  SET_STORY_TITLE: `${prefix}[9] Set Story Title`,
};
