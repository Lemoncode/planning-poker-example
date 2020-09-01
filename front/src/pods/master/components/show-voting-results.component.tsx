import * as React from 'react';
import Button from '@material-ui/core/Button';
import { VoteResult } from '../master.vm';
import { TablePlayerComponent } from '../../table-player/table-player.component';
import {PlayerVotingStatus} from 'core';

interface Props {
  onMoveToNextStory: () => void;
  playerVotingStatus: PlayerVotingStatus[];
}

export const ShowVotingResults: React.FC<Props> = props => {
  const { onMoveToNextStory, playerVotingStatus: voteCollectionResult } = props;
  return (
    <>
      <span>Show Voting results</span>
      <TablePlayerComponent playersCollection={voteCollectionResult} />

      <Button variant="contained" color="primary" onClick={onMoveToNextStory}>
        Move to next story
      </Button>
    </>
  );
};
