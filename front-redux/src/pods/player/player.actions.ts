import { ConnectionSetup, SocketOuputMessageTypes, ActionBase } from 'core';

const prefix = '[PLAYER_POD]';

export const podPlayerActionIds = {
  CONNECT_PLAYER: `${prefix}[0] Player CONNECTS TO SOCKET.`,
  DISCONNECT_PLAYER: `${prefix}[1] Player Disconnect socket`,
  SEND_MESSAGE_PLAYER: `${prefix}[2] PLayer player sends a message to the server`,
  PLAYER_VOTED: `${prefix}[3] Player Voted`,
};

export const ConnectPlayerAction = (
  connectionSetup: ConnectionSetup
): ActionBase => ({
  type: podPlayerActionIds.CONNECT_PLAYER,
  payload: connectionSetup,
});
