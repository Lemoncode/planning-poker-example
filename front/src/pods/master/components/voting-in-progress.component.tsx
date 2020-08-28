import * as React from 'react';
import Button from '@material-ui/core/Button';
import { VoteOptionsComponent } from '../../vote-options/vote-options.component';
import { Player } from '../master.vm';
import { TablePlayerComponent } from 'pods/table-player/table-player.component';

interface Props {
  onFinishVoting: () => void;
  onMasterVoteChosen: (vote: string) => void;
  masterVoted: boolean;
  title: string;
  playerCollection: Player[];
}

export const VotingInProgress: React.FC<Props> = (props: Props) => {
  const {
    onFinishVoting,
    onMasterVoteChosen,
    masterVoted,
    title,
    playerCollection,
  } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TablePlayerComponent playersCollection={playerCollection} />
      <div>
        {!masterVoted ? (
          <VoteOptionsComponent
            onVoteChosen={onMasterVoteChosen}
            title={title}
          />
        ) : (
          <span>You voted</span>
        )}
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={e => onFinishVoting()}
      >
        Finish Voting
      </Button>
    </div>
  );
};
