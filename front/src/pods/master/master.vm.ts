export interface Player {
  nickname: string;
  voted: boolean;
}

export enum MasterStatus {
  INITIALIZING,
  CREATING_STORY,
  VOTING_IN_PROGRESS,
  SHOWING_RESULTS,
}

export interface VoteResult {
  nickname: string;
  vote: string;
}


