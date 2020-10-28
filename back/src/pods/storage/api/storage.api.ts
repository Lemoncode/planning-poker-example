import {
  UserSessionContext,
  UserSession,
  ConnectSessionInfo,
  VotesFromRooms,
} from 'dals/user';
//This is for store the session Info in mongo database.

export const isRoomAvailable = async (room: string): Promise<Boolean> => {
  return !(await UserSessionContext.exists({ room }));
};

export const addNewUser = async (
  connectionId: string,
  connectSession: ConnectSessionInfo
): Promise<UserSession> => {
  const data = {
    connectionId,
    ...connectSession,
    hasVoted: false,
    vote: '',
  };
  await UserSessionContext.create(data).catch(console.log);
  return UserSessionContext.findOne({ connectionId }).lean();
};

export const isMasterUser = async (
  connectionId: string
): Promise<UserSession> =>
  await UserSessionContext.findOne({ connectionId, isMaster: true }).lean();

export const isNicknameInUse = async (
  nickname: string,
  room: string
): Promise<Boolean> => await UserSessionContext.exists({ nickname, room });

export const getRoomFromConnectionId = async (
  connectionId: string
): Promise<string> => {
  const session = await UserSessionContext.findOne({
    connectionId: connectionId,
  }).lean();
  return session ? session.room : '';
};

export const getNicknameFromConnectionId = async (
  connectionId: string
): Promise<string> => {
  const session = await UserSessionContext.findOne({
    connectionId: connectionId,
  }).lean();

  return session ? session.nickname : '';
};

export const resetVotes = async (room: string): Promise<void> => {
  return await UserSessionContext.findOneAndUpdate(
    { room: room },
    {
      voted: false,
      vote: '',
    }
  ).lean();
};

export const vote = async (
  connectionId: string,
  value: string
): Promise<void> => {
  return await UserSessionContext.findOneAndUpdate(
    { connectionId: connectionId },
    {
      hasVoted: true,
      vote: value,
    }
  ).lean();
};

export const getVotesFromRoom = async (
  room: string
): Promise<VotesFromRooms[]> => {
  return await UserSessionContext.find({ room: room })
    .select(['nickname', 'vote'])
    .lean();
};

//TODO here returns array
export const freeRoom = async (room: string): Promise<UserSession[]> => {
  return await UserSessionContext.find()
    .distinct('room', { room: room })
    .lean();
};
