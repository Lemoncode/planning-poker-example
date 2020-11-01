import { ConnectSessionInfo, UserSession, VotesFromRooms } from 'dals/user';
// This is for store the session Info in memory.

let userCollectionSession: UserSession[] = [];

export const isRoomAvailable = async (room: string): Promise<boolean> =>
  !userCollectionSession.find((session) => session.room === room);

export const addNewUser = async (
  connectionId: string,
  { room, nickname, isMaster }: ConnectSessionInfo
): Promise<boolean> => {
  userCollectionSession = [
    ...userCollectionSession,
    {
      connectionId,
      room,
      isMaster: isMaster,
      nickname: nickname,
      hasVoted: false,
      vote: '',
    },
  ];

  return true;
};

export const isMasterUser = async (
  connectionId: string
): Promise<UserSession> => {
  const session = userCollectionSession.find(
    (session) => session.connectionId === connectionId && session.isMaster
  );
  return session;
};

export const isNicknameInUse = async (
  nickname: string,
  room: string
): Promise<boolean> =>
  userCollectionSession.findIndex(
    (session) => session.nickname === nickname && session.room === room
  ) !== -1;

export const getRoomFromConnectionId = async (
  connectionId: string
): Promise<string> => {
  const session = userCollectionSession.find(
    (session) => session.connectionId === connectionId
  );
  return session ? session.room : '';
};

export const getNicknameFromConnectionId = async (
  connectionId: string
): Promise<string> => {
  const session = userCollectionSession.find(
    (session) => session.connectionId === connectionId
  );
  return session ? session.nickname : '';
};

export const resetVotes = async (room: string): Promise<void> => {
  userCollectionSession = userCollectionSession.map((session) =>
    session.room !== room
      ? session
      : {
          ...session,
          voted: false,
          vote: '',
        }
  );
};

export const vote = async (
  connectionId: string,
  value: string
): Promise<void> => {
  userCollectionSession = userCollectionSession.map((session) =>
    session.connectionId === connectionId
      ? {
          ...session,
          hasVoted: true,
          vote: value,
        }
      : session
  );
};

export const getVotesFromRoom = async (
  room: string
): Promise<VotesFromRooms[]> => {
  const filteredUserCollection = userCollectionSession.filter(
    (s) => s.room === room
  );
  return filteredUserCollection.map(({ nickname, vote }) => ({
    nickname,
    vote,
  }));
};

export const freeRoom = async (room: string): Promise<UserSession[]> => {
  userCollectionSession = userCollectionSession.filter(
    (session) => session.room !== room
  );

  return userCollectionSession;
};
