import { InputMessageTypes } from './consts';
import { Action, InputUserVoted } from './model';
import {
  vote,
  isMasterUser,
  getRoomFromConnectionId,
  resetVotes,
} from '../storage';

export const processInputMessage = (connectionId: string, action: Action) => {
  switch (action.type) {
    case InputMessageTypes.CREATE_STORY:
      break;

    case InputMessageTypes.USER_VOTED:
      const payload: InputUserVoted = action.payload;
      handleVote(connectionId, payload.vote);
      break;

    case InputMessageTypes.END_VOTE_TIME:
      break;
  }
};

const handleCreateStory = (connectionId: string, value: string) => {
  // this should generate output message
  // later TODO: global flag cannot vote, to avoid having users cheating
  // Maybe processInputMessage should return a qeueu of outputMesssages
  const isMaster = isMasterUser(connectionId);
  const room = getRoomFromConnectionId(connectionId);

  if (isMaster) {
    resetVotes(room);
    // enque output message send to all participants new  question
  } else {
    // TODO: Log Error bug in code or somebody trying to be a naughty boy
  }
};

const handleVote = (connectionId: string, value: string) => {
  vote(connectionId, value);
};

const handleEndVoteTime = (connectionId: string) => {
  // this should generate output message
  // later TODO: global flag cannot vote, to avoid having users cheating
  // Maybe processInputMessage should return a qeueu of outputMesssages
  // enque output message end vote and results
};
