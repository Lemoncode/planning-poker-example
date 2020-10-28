import {
  InputMessageTypes,
  OutputMessageTypes,
  getMasterRoom,
} from '../messages.consts';
import {
  Action,
  InputEstablishConnectionMaster,
  InputEstablishConnectionPlayer,
  OutputConnectionEstablishedMaster,
  OutputConnectionEstablishedPlayer,
  SocketInfo,
} from '../messages.model';
import { userRepository } from 'dals/user';
const {
  vote,
  isMasterUser,
  getRoomFromConnectionId,
  resetVotes,
  isRoomAvailable,
  addNewUser,
  isNicknameInUse,
  getNicknameFromConnectionId,
  getVotesFromRoom,
} = userRepository;

export const processInputMessage = async (
  socketInfo: SocketInfo,
  action: Action
): Promise<Action[]> => {
  let outputActionCollection: Action[] = [];
  switch (action.type) {
    case InputMessageTypes.ESTABLISH_CONNECTION_MASTER:
      const payloadECM: InputEstablishConnectionMaster = action.payload;
      outputActionCollection = await handleEstablishConnectionMaster(
        socketInfo,
        payloadECM.nickname,
        payloadECM.room
      );
      break;
    case InputMessageTypes.ESTABLISH_CONNECTION_PLAYER:
      const payloadPlayer: InputEstablishConnectionPlayer = action.payload;
      outputActionCollection = await handleEstablishConnectionPlayer(
        socketInfo,
        payloadPlayer.nickname,
        payloadPlayer.room
      );
      break;
    case InputMessageTypes.CREATE_STORY:
      const storyTitle: string = action.payload;
      outputActionCollection = await handleCreateStory(socketInfo, storyTitle);
      break;

    case InputMessageTypes.USER_VOTED:
      const vote: string = action.payload;
      outputActionCollection = await handleVote(socketInfo.connectionId, vote);
      break;

    case InputMessageTypes.END_VOTE_TIME:
      const room = await getRoomFromConnectionId(socketInfo.connectionId);
      const votesCollection = await getVotesFromRoom(room);
      await resetVotes(room);
      outputActionCollection = [
        { type: OutputMessageTypes.SHOW_RESULTS, payload: votesCollection },
      ];
      break;
  }

  return outputActionCollection;
};

const handleEstablishConnectionMaster = async (
  socketInfo: SocketInfo,
  nickname: string,
  room: string
): Promise<Action[]> => {
  if (!nickname || !room) {
    // Ignore
    return [];
  }

  const isRoomAvailableVar = await isRoomAvailable(room);
  if (isRoomAvailableVar) {
    await addNewUser(socketInfo.connectionId, {
      room,
      nickname,
      isMaster: true,
    });
    socketInfo.socket.join(room);
    socketInfo.socket.join(getMasterRoom(room));

    const payload: OutputConnectionEstablishedMaster = { newUser: nickname };
    return [
      { type: OutputMessageTypes.CONNECTION_ESTABLISHED_MASTER, payload },
    ];
  } else {
    // TODO Enque Error master
    return [{ type: OutputMessageTypes.ERROR_ROOM_BUSY }];
  }
};

const handleEstablishConnectionPlayer = async (
  socketInfo: SocketInfo,
  nickname: string,
  room: string
): Promise<Action[]> => {
  if (!nickname || !room) {
    // Ignore
    return [];
  }
  const isRoomAvailableVar = await isRoomAvailable(room);

  if (isRoomAvailableVar) {
    // TODO Enque Error master
    return [{ type: OutputMessageTypes.ERROR_CANNOT_FIND_ROOM }];
  } else {
    const isUsedNickName = await isNicknameInUse(nickname, room);
    if (isUsedNickName) {
      // TODO Enqueue Error master
      return [{ type: OutputMessageTypes.NICKNAME_ALREADY_IN_USE }];
    } else {
      await addNewUser(socketInfo.connectionId, {
        room,
        nickname,
        isMaster: false,
      });
      socketInfo.socket.join(room);
      const payload: OutputConnectionEstablishedPlayer = { newUser: nickname };
      return [
        { type: OutputMessageTypes.CONNECTION_ESTABLISHED_PLAYER, payload },
      ];
    }
  }
};

const handleCreateStory = async (socketInfo: SocketInfo, title: string) => {
  const { connectionId } = socketInfo;
  // this should generate output message
  // later TODO: global flag cannot vote, to avoid having users cheating
  // Maybe processInputMessage should return a qeueu of outputMesssages
  const isMaster = await isMasterUser(connectionId);
  const room = await getRoomFromConnectionId(connectionId);

  if (isMaster) {
    //TODO is necessary await?
    await resetVotes(room);
    return [{ type: OutputMessageTypes.NEW_STORY, payload: title }];
    // SendMessage to every body newStory
    // enque output message send to all participants new  question
  } else {
    // TODO: Log Error bug in code or somebody trying to be a naughty boy
  }
};

const handleVote = async (connectionId: string, value: string) => {
  await vote(connectionId, value);
  const nickname = await getNicknameFromConnectionId(connectionId);
  return [
    { type: OutputMessageTypes.USER_VOTED_ONLY_SEND_MASTER, payload: nickname },
  ];
};

const handleEndVoteTime = (connectionId: string) => {
  // this should generate output message
  // later TODO: global flag cannot vote, to avoid having users cheating
  // Maybe processInputMessage should return a qeueu of outputMesssages
  // enque output message end vote and results
};
