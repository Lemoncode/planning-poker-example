import * as React from 'react';
import Button from '@material-ui/core/Button';

interface Props {
  onMoveToNextStory: () => void;
}

export const ShowVotingResults: React.FC<Props> = props => {
  const { onMoveToNextStory } = props;
  return (
    <>
      <Button variant="contained" color="primary" onClick={onMoveToNextStory}>
        Move to next story
      </Button>
    </>
  );
};
