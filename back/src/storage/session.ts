// This is just a demo approach, storing in memory session Info
// Another way to identify users: https://stackoverflow.com/questions/6979992/how-to-get-session-id-of-socket-io-client-in-client

interface ConnectSessionInfo {
  room: string;
  nickname: string;
  isMaster: boolean;
}

interface UserSession extends ConnectSessionInfo {
  connectionId: string;
  hasVoted: boolean;
  vote: string;
}

let userCollectionSession: UserSession[] = [];

export const isRoomAvailable = (room: string) =>
  !userCollectionSession.find((session) => session.room === room);

export const addNewUser = (
  connectionId: string,
  { room, nickname, isMaster }: ConnectSessionInfo
) => {
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
};

export const isMasterUser = (connectionId: string) => {
  const session = userCollectionSession.find(
    (session) => session.connectionId === connectionId && session.isMaster
  );
  return session;
};

export const isNicknameInUse = (nickname: string, room: string) =>
  userCollectionSession.findIndex(
    (session) => session.nickname === nickname && session.room === room
  ) !== -1;

export const getRoomFromConnectionId = (connectionId: string) => {
  const session = userCollectionSession.find(
    (session) => session.connectionId === connectionId
  );
  return session ? session.room : '';
};

export const getNicknameFromConnectionId = (connectionId: string) => {
  const session = userCollectionSession.find(
    (session) => session.connectionId === connectionId
  );
  return session ? session.nickname : '';
};

export const resetVotes = (room: string) => {
  userCollectionSession = userCollectionSession.map((session) =>
    session.room === room
      ? session
      : {
          ...session,
          voted: false,
          vote: '',
        }
  );
};

export const vote = (connectionId: string, value: string) => {
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

export const getVotesFromRoom = (room: string) => {
  const filteredUserCollection = userCollectionSession.filter(
    (s) => s.room === room
  );
  return filteredUserCollection.map(({ nickname, vote }) => ({
    nickname,
    vote,
  }));
};

export const freeRoom = (room: string) => {
  userCollectionSession = userCollectionSession.filter(
    (session) => session.room !== room
  );
};
