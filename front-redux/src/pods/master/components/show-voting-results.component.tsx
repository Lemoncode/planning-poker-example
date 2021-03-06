import * as React from 'react';
import Button from '@material-ui/core/Button';
import { VoteResult } from '../master.vm';

interface Props {
  onMoveToNextStory: () => void;
  voteCollectionResult: VoteResult[];
}

export const ShowVotingResults: React.FC<Props> = props => {
  const { onMoveToNextStory, voteCollectionResult } = props;
  return (
    <>
      <span>Show Voting results</span>
      <ul>
        {voteCollectionResult.map(({ nickname, vote }) => (
          <li key={nickname}>
            {nickname} - {vote}
          </li>
        ))}
      </ul>

      <Button variant="contained" color="primary" onClick={onMoveToNextStory}>
        Move to next story
      </Button>
    </>
  );
};
