import {
  OutputMessageTypes,
  getMasterRoom,
  ErrorCodes,
  SocketMessageTypes,
} from './consts';
import { Action, InputUserVoted, SocketInfo } from './model';
import {
  vote,
  isMasterUser,
  getRoomFromConnectionId,
  getNicknameFromConnectionId,
  resetVotes,
} from '../storage';
import * as SocketIOClient from 'socket.io';
import { ResponseBase, responseType } from './response';

export const processOutputMessageCollection = (
  socketInfo: SocketInfo,
  actionCollection: Action[]
) => {
  // TODO: Error handling
  actionCollection.forEach((action) => processOuputMessage(socketInfo, action));
};

export const processOuputMessage = (socketInfo: SocketInfo, action: Action) => {
  const { connectionId, io, socket } = socketInfo;
  const isMaster = isMasterUser(connectionId);
  const room = getRoomFromConnectionId(connectionId);

  switch (action.type) {
    case OutputMessageTypes.CONNECTION_ESTABLISHED_MASTER:
      handleNotifyConnectionEstablishedMaster(socketInfo, connectionId);
      break;
    case OutputMessageTypes.CONNECTION_ESTABLISHED_PLAYER:
      handleNotifyConnectionEstablishedPlayer(socketInfo, connectionId);
      break;
    case OutputMessageTypes.USER_JOINED_ONLY_SEND_MASTER:
      break;
    case OutputMessageTypes.USER_VOTED_ONLY_SEND_MASTER_:
      break;
    case OutputMessageTypes.NEW_STORY:
      break;
    case OutputMessageTypes.SHOW_RESULTS:
      break;
    case OutputMessageTypes.ERROR_ROOM_BUSY:
      handleErrorRoomIsBusy(socketInfo, connectionId);
      break;
  }
};

const handleNotifyConnectionEstablishedMaster = (
  socketInfo: SocketInfo,
  connectionId: string
) => {
  const response: ResponseBase = { type: responseType.CONNECTION_ACK };
  socketInfo.socket.emit('message', response);
};

const handleNotifyConnectionEstablishedPlayer = (
  socketInfo: SocketInfo,
  connectionId: string
) => {
  const { io, socket } = socketInfo;

  // TODO: consider getting this in one go
  const room = getRoomFromConnectionId(connectionId);
  const nickname = getNicknameFromConnectionId(connectionId);

  const masterRoom = getMasterRoom(room);

  // TODO Type this messages later on
  console.log(`new user joined: ${nickname}`);
  // Notify to master room user
  io.in(masterRoom).emit('message', {
    type: SocketMessageTypes.CONNECTION_ESTABLISHED_PLAYER,
    payload: nickname,
  });
  // Notify to user connected
  socket.emit('message', 'connection succeeded');
};

const handleErrorRoomIsBusy = (
  socketInfo: SocketInfo,
  connectionId: string
) => {
  const { socket } = socketInfo;
  console.log('**** ROOM BUSY ERROR *****');
  socket.emit('error-app', ErrorCodes.roomBusy);
};
