import { UserSession, ConnectSessionInfo, VotesFromRooms } from 'dals/user';

export interface UserRepository {
  isRoomAvailable: (room: string) => Promise<boolean>;
  addNewUser: (
    connectionId: string,
    connectSession: ConnectSessionInfo
  ) => Promise<UserSession[]>;
  isMasterUser: (connectionId: string) => Promise<UserSession>;
  isNicknameInUse: (nickname: string, room: string) => Promise<boolean>;
  getRoomFromConnectionId: (connectionId: string) => Promise<string>;
  getNicknameFromConnectionId: (connectionId: string) => Promise<string>;
  resetVotes: (room: string) => Promise<void>;
  vote: (connectionId: string, value: string) => Promise<void>;
  getVotesFromRoom: (room: string) => Promise<VotesFromRooms[]>;
  freeRoom: (room: string) => Promise<UserSession[]>;
}
