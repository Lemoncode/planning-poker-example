export enum ConnectionStatus {
  notConnected,
  ConnectionInProgress,
  Connected,
}

export interface VoteResult {
  nickname: string;
  vote: string;
}
