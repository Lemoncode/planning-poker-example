import { OutputMessageTypes } from './consts';
import { Action, InputUserVoted } from './model';
import {
  vote,
  isMasterUser,
  getRoomFromConnectionId,
  resetVotes,
} from '../storage';
import * as SocketIOClient from 'socket.io';

export const processOutputMessageCollection = (
  connectionId: string,
  io: SocketIOClient.Socket,
  actionCollection: Action[]
) => {
  // TODO: Error handling
  actionCollection.forEach((action) =>
    processOuputMessage(connectionId, io, action)
  );
};

export const processOuputMessage = (
  connectionId: string,
  io: SocketIOClient.Socket,
  action: Action
) => {
  const isMaster = isMasterUser(connectionId);
  const room = getRoomFromConnectionId(connectionId);

  switch (action.type) {
    case OutputMessageTypes.CONNECTION_ESTABLISHED:
      handleConnectionEstablished(io, connectionId);
      break;
    case OutputMessageTypes.USER_JOINED_ONLY_SEND_MASTER:
      break;
    case OutputMessageTypes.USER_VOTED_ONLY_SEND_MASTER_:
      break;
    case OutputMessageTypes.NEW_STORY:
      break;
    case OutputMessageTypes.SHOW_RESULTS:
      break;
  }
};

const handleConnectionEstablished = (
  io: SocketIOClient.Socket,
  connectionId: string
) => {
  io.client[connectionId].emit('messsage', { connection: true });
};
