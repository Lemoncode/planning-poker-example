import * as React from 'react';
import { VoteOptionsComponent } from './vote-options.component';
import * as classes from './vote-options.styles';

interface Props {
  buttonFinishVoting?: JSX.Element;
  onVoteChosen: (vote: string) => void;
  votedStatus: boolean;
}

export const VoteOptionsContainer: React.FC<Props> = props => {
  const { onVoteChosen, votedStatus, buttonFinishVoting } = props;

  return (
    <VoteOptionsComponent
      onVoteChosen={onVoteChosen}
      buttonFinishVoting={buttonFinishVoting}
      votedStatus={votedStatus}
    />
  );
};
