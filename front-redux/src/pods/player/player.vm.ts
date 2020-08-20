export enum ConnectionStatus {
  notConnected,
  ConnectionInProgress,
  Connected,
}

export enum PlayerStatus {
  NOT_CONNECTED,
  CONNECTION_IN_PROGRESS,
  CONNECTED,
  WAITING_FOR_STORY,
  VOTING_IN_PROGRESS,
  VOTING_CLOSED,
  SHOW_RESULTS,
}

export interface VoteResult {
 nickname: string;
 vote: string;
}
