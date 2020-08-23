import { ConnectionSetup, SocketOuputMessageTypes, ActionBase } from 'core';

const prefix = '[PLAYER_POD]';

export const podPlayerActionIds = {
  CONNECT_PLAYER: `${prefix}[0] Player CONNECTS TO SOCKET.`,
  PLAYER_SUCCESSFULLY_CONNECTED: `${prefix}[1] Player Succesfully CONNECTED TO SOCKET.`,
  DISCONNECT_PLAYER: `${prefix}[2] Player Disconnect socket`,
  SEND_MESSAGE_PLAYER: `${prefix}[3] PLayer player sends a message to the server`,
  PLAYER_VOTED: `${prefix}[4] Player Voted`,
  NOTIFY_NICKNAME_IN_USE: `${prefix}[5] Show a message UI nickname already in use`,
  HIDE_NICKNAME_INUSE_NOTIFICATION: `${prefix}[6] Hide UI message nickname already in use`,
};

export const connectPlayerAction = (
  connectionSetup: ConnectionSetup
): ActionBase => ({
  type: podPlayerActionIds.CONNECT_PLAYER,
  payload: connectionSetup,
});

export const disconnectPlayerAction = (): ActionBase => ({
  type: podPlayerActionIds.DISCONNECT_PLAYER,
  payload: null,
});

export const playerSuccessfulyConnectedAction = () => ({
  type: podPlayerActionIds.PLAYER_SUCCESSFULLY_CONNECTED,
  payload: null,
});

export const playerVotesAction = (vote: string): ActionBase => ({
  type: podPlayerActionIds.SEND_MESSAGE_PLAYER,
  payload: { type: SocketOuputMessageTypes.USER_VOTED, payload: vote },
});

export const notifyNickNameInUse = (): ActionBase => ({
  type: podPlayerActionIds.NOTIFY_NICKNAME_IN_USE,
  payload: null,
});

export const hideNickNameInUseNotification = (): ActionBase => ({
  type: podPlayerActionIds.HIDE_NICKNAME_INUSE_NOTIFICATION,
  payload: null,
});
