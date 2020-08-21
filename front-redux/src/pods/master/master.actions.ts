import { ConnectionSetup } from 'core';
import { SocketOuputMessageTypes } from 'core';

const prefix = '[MASTER_POD]';

export const podMasterActionIds = {
  CONNECT_MASTER: `${prefix}[0] MASTER CONNECTS TO SOCKET.`,
  DISCONNECT_MASTER: `${prefix}[1] Disconnect socket`,
  SEND_MESSAGE_MASTER: `${prefix}[2] Master player sends a message to the server`,
};

export const ConnectMasterAction = (connectionSetup: ConnectionSetup) => ({
  type: podMasterActionIds.CONNECT_MASTER,
  payload: connectionSetup,
});

export const SendCreateStoryMessageToServerAction = title => ({
  type: podMasterActionIds.SEND_MESSAGE_MASTER,
  payload: { type: SocketOuputMessageTypes.CREATE_STORY, payload: title },
});
