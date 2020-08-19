import * as React from 'react';
import Button from '@material-ui/core/Button';
import { VoteOptionsComponent } from 'common-app/components';

interface Props {
  onFinishVoting: () => void;
  onMasterVoteChosen: (vote: string) => void;
  masterVoted: boolean;
  title: string;
}

export const VotingInProgress: React.FC<Props> = (props: Props) => {
  const { onFinishVoting, onMasterVoteChosen, masterVoted, title } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
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
