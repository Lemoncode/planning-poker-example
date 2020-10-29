export interface VotesFromRooms {
  vote: string;
  nickname: string;
}

export interface ConnectSessionInfo {
  room: string;
  nickname: string;
  isMaster: boolean;
}

export interface UserSession extends ConnectSessionInfo {
  connectionId: string;
  hasVoted: boolean;
  vote: string;
}
