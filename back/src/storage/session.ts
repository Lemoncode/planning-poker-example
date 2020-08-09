// This is just a demo approach, storing in memory session Info
// Another way to identify users: https://stackoverflow.com/questions/6979992/how-to-get-session-id-of-socket-io-client-in-client

interface ConnectSessionInfo {
  room: string;
  isMaster: boolean;
}

interface UserSession extends ConnectSessionInfo {
  connectionId: string;
  hasVoted: boolean;
  vote: string;
}

let userCollectionSession: UserSession[] = [];

export const addNewUser = (
  connectionId: string,
  { room, isMaster }: ConnectSessionInfo
) => [
  ...userCollectionSession,
  {
    connectionId,
    room,
    isMaster: isMaster,
    hasVoted: false,
    vote: '',
  },
];

export const getRoomFromConnectionId = (connectionId: string) => {
  const session = userCollectionSession.find(
    (session) => session.connectionId === connectionId
  );
  return session ? session.room : '';
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

export const vote = (connectionId: string, value: string) =>
  userCollectionSession.map((session) =>
    session.connectionId === connectionId
      ? {
          ...session,
          hasVoted: true,
          vote: value,
        }
      : session
  );

export const freeRoom = (room: string) => {
  userCollectionSession = userCollectionSession.filter(
    (session) => session.room !== room
  );
};
