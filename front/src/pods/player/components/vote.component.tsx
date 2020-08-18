import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { VoteOptionsComponent } from './vote-options.component';
interface Props {
  story: string;
  vote: string;
  onVoteChosen: (vote: string) => void;
}

export const VoteComponent: React.FC<Props> = props => {
  const { story, vote, onVoteChosen } = props;
  return (
    <>
      <Typography variant="h6">User Story: {story}</Typography>
      {!vote ? (
        <VoteOptionsComponent vote={vote} onVoteChosen={onVoteChosen} />
      ) : (
        <span>You voted: {vote}</span>
      )}
    </>
  );
};
