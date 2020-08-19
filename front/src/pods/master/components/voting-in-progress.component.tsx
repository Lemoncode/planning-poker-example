import * as React from 'react';
import Button from '@material-ui/core/Button';

interface Props {
  onFinishVoting: () => void;
}

export const VotingInProgress: React.FC<Props> = (props: Props) => {
  const { onFinishVoting } = props;
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={e => onFinishVoting()}
      >
        Finish Voting
      </Button>
    </>
  );
};
