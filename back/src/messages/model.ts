export interface Action {
  type: string;
  payload: any;
}

export interface InputCreateStoryPayload {
  content: string;
}

export interface InputUserVoted {
  vote: string;
}

export interface OutputUserJoined {
  name: string;
}

export interface OutputMasterUserJoined {
  newUser: string;
}

// How do I know who voted !!!
// SessionId? check
export interface OutputMasterUserVoted {
  vote: string;
}

interface UserVote {
  nickname: string;
  hasVoted: boolean;
  vote: string;
}

export interface OutputShowResults {
  userVoteCollection: UserVote[];
}

export interface OutputNewStory {
  content: string;
}
