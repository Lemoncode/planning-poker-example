import {
  OutputMessageTypes,
  getMasterRoom,
  ErrorCodes,
  SocketMessageTypes,
  SocketOuputMessageLiteral,
} from './consts';
import { Action, SocketInfo } from 'dals/messages';
import { userRepository } from 'dals/user';
const {
  isMasterUser,
  getRoomFromConnectionId,
  getNicknameFromConnectionId,
} = userRepository;
import { ResponseBase, responseType } from './response';

export const processOutputMessageCollection = (
  socketInfo: SocketInfo,
  actionCollection: Action[]
) => {
  if (actionCollection) {
    // TODO: Error handling
    actionCollection.forEach((action) =>
      processOuputMessage(socketInfo, action)
    );
  }
};

export const processOuputMessage = (socketInfo: SocketInfo, action: Action) => {
  const { connectionId } = socketInfo;

  switch (action.type) {
    case OutputMessageTypes.CONNECTION_ESTABLISHED_MASTER:
      handleNotifyConnectionEstablishedMaster(socketInfo, connectionId);
      break;
    case OutputMessageTypes.CONNECTION_ESTABLISHED_PLAYER:
      handleNotifyConnectionEstablishedPlayer(socketInfo, connectionId);
      break;
    case OutputMessageTypes.USER_JOINED_ONLY_SEND_MASTER:
      break;
    case OutputMessageTypes.USER_VOTED_ONLY_SEND_MASTER:
      handleUserVotedOnlySendMaster(socketInfo, action.payload);
      break;
    case OutputMessageTypes.NEW_STORY:
      handleNewStory(socketInfo, action.payload);
      break;
    case OutputMessageTypes.SHOW_RESULTS:
      handleShowResults(socketInfo, action.payload);
      break;
    case OutputMessageTypes.ERROR_ROOM_BUSY:
      handleErrorRoomIsBusy(socketInfo, connectionId);
      break;
    case OutputMessageTypes.NICKNAME_ALREADY_IN_USE:
      handleNickNameAlreadyInUse(socketInfo, connectionId);
      break;
    case OutputMessageTypes.APPEND_TEXT:
      handleAppendText(socketInfo, action.payload);
      break;
  }
};

const handleAppendText = async (socketInfo: SocketInfo, text: string) => {
  const room = await getRoomFromConnectionId(socketInfo.connectionId);
  socketInfo.io.in(room).emit(SocketOuputMessageLiteral.MESSAGE, {
    type: responseType.APPEND_TEXT,
    payload: text,
  });
};

const handleShowResults = async (
  socketInfo: SocketInfo,
  votesCollection: any[]
) => {
  const room = await getRoomFromConnectionId(socketInfo.connectionId);
  socketInfo.io.in(room).emit(SocketOuputMessageLiteral.MESSAGE, {
    type: responseType.SHOW_VOTING_RESULTS,
    payload: votesCollection,
  });
};

const handleUserVotedOnlySendMaster = async (
  socketInfo: SocketInfo,
  nickname: string
) => {
  const { io, connectionId } = socketInfo;
  const room = await getRoomFromConnectionId(connectionId);
  const masterRoom = getMasterRoom(room);

  // Notify to master room user
  io.in(masterRoom).emit('message', {
    type: SocketMessageTypes.NOTIFY_USER_VOTED,
    payload: nickname,
  });
};

const handleNotifyConnectionEstablishedMaster = (
  socketInfo: SocketInfo,
  connectionId: string
) => {
  const response: ResponseBase = { type: responseType.CONNECTION_ACK };
  socketInfo.socket.emit(SocketOuputMessageLiteral.MESSAGE, response);
};

const handleNewStory = async (socketInfo: SocketInfo, title: string) => {
  const room = await getRoomFromConnectionId(socketInfo.connectionId);
  socketInfo.io.in(room).emit(SocketOuputMessageLiteral.MESSAGE, {
    type: responseType.NEW_STORY,
    payload: title,
  });
};

const handleNotifyConnectionEstablishedPlayer = async (
  socketInfo: SocketInfo,
  connectionId: string
) => {
  const { io, socket } = socketInfo;

  // TODO: consider getting this in one go
  const room = await getRoomFromConnectionId(connectionId);
  const nickname = await getNicknameFromConnectionId(connectionId);

  const masterRoom = getMasterRoom(room);

  // TODO Type this messages later on
  console.log(`new user joined: ${nickname}`);
  // Notify to master room user
  io.in(masterRoom).emit('message', {
    type: SocketMessageTypes.CONNECTION_ESTABLISHED_PLAYER,
    payload: nickname,
  });
  // Notify to user connected
  socket.emit('message', {
    type: SocketMessageTypes.CONNECTION_ESTABLISHED_PLAYER,
    payload: nickname,
  });
};

const handleErrorRoomIsBusy = (
  socketInfo: SocketInfo,
  connectionId: string
) => {
  const { socket } = socketInfo;
  console.log('**** ROOM BUSY ERROR *****');
  socket.emit('error-app', ErrorCodes.roomBusy);
};

const handleNickNameAlreadyInUse = (
  socketInfo: SocketInfo,
  connectionId: string
) => {
  const { socket } = socketInfo;
  console.log('**** NICKNAME ALREADY IN USE ERROR *****');
  socket.emit('error-app', ErrorCodes.nicknameAlreadyInUse);
};
