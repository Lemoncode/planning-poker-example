import { ConnectionSetup, SocketOuputMessageTypes, ActionBase } from 'core';

const prefix = '[PLAYER_POD]';

export const podPlayerActionIds = {
  CONNECT_PLAYER: `${prefix}[0] Player CONNECTS TO SOCKET.`,
  PLAYER_SUCCESSFULLY_CONNECTED: `${prefix}[1] Player Succesfully CONNECTED TO SOCKET.`,
  DISCONNECT_PLAYER: `${prefix}[2] Player Disconnect socket`,
  SEND_MESSAGE_PLAYER: `${prefix}[3] PLayer player sends a message to the server`,
  PLAYER_VOTED: `${prefix}[4] Player Voted`,
};

export const connectPlayerAction = (
  connectionSetup: ConnectionSetup
): ActionBase => ({
  type: podPlayerActionIds.CONNECT_PLAYER,
  payload: connectionSetup,
});

export const playerSuccessfulyConnectedAction = () => ({
  type: podPlayerActionIds.PLAYER_SUCCESSFULLY_CONNECTED,
  payload: null,
});
