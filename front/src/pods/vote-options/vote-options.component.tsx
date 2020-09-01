import * as React from 'react';
import * as classes from './vote-options.styles';
import { TShirtVotes } from 'core';
import { Button } from '@material-ui/core';

interface Props {
  onVoteChosen: (vote: string) => void;
  onFinishVoting: () => void;
}

export const VoteOptionsComponent: React.FC<Props> = props => {
  const { onVoteChosen, onFinishVoting } = props;

  return (
    <div className={classes.container}>
      <div className={'container-labels'}>
        <div
          className={'label xxl'}
          onClick={e => onVoteChosen(TShirtVotes.XXL)}
        ></div>
        <div
          className={'label xl'}
          onClick={e => onVoteChosen(TShirtVotes.XL)}
        ></div>
        <div
          className={'label l'}
          onClick={e => onVoteChosen(TShirtVotes.L)}
        ></div>
        <div
          className={'label m'}
          onClick={e => onVoteChosen(TShirtVotes.M)}
        ></div>
        <div
          className={'label s'}
          onClick={e => onVoteChosen(TShirtVotes.S)}
        ></div>
        <div
          className={'label xs'}
          onClick={e => onVoteChosen(TShirtVotes.XS)}
        ></div>
      </div>
      <div className={'bottom-container'}>
        <Button
          variant="contained"
          color="primary"
          onClick={e => onFinishVoting()}
          className={'bottom'}
        >
          send vote
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={e => onFinishVoting()}
          className={'bottom'}
        >
          Finish Voting
        </Button>
      </div>
    </div>
  );
};
