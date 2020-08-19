// TODO: Add env variables
export const baseApiUrl = 'http://localhost:8081';
export const baseSocketUrl = 'http://localhost:3000';

// TODO we could extract inspecting current URL
export const appBaseUrl = 'http://localhost:8080';

export const SocketInputMessageTypes = {
  CONNECTION_ESTABLISHED_PLAYER: 'CONNECTION_ESTABLISHED_PLAYER',
  NEW_STORY: 'NEW_STORY',
  NOTIFY_USER_VOTED: 'NOTIFY_USER_VOTED',
  SHOW_VOTING_RESULTS: 'SHOW_VOTING_RESULTS',
};

export const SocketErrorTypes = {
  ROOM_BUSY: 1,
  NICKNAME_ALREADY_IN_USE: 2,
};

export const SocketOuputMessageLiteral = {
  MESSAGE: 'message',
};

export const SocketOuputMessageTypes = {
  CREATE_STORY: 'CREATE_STORY', // Master creates a user story
  USER_VOTED: 'USER_VOTED', // A given player has emited his vote
  END_VOTE_TIME: 'END_VOTE_TIME',
};

export const TShirtVotes = {
  XXL: 'XXL',
  XL: 'XL',
  L: 'L',
  M: 'M',
  S: 'S',
  XS: 'XS',
};
