import * as React from 'react';
import * as classes from './vote-options.styles';
import { TShirtVotes } from 'core';
import { Button } from '@material-ui/core';

interface Props {
  onVoteChosen: (vote: string) => void;
  buttonFinishVoting?: JSX.Element;
  activeLabel: (event: React.MouseEvent) => void;
  votedStatus: boolean;
}

export const VoteOptionsComponent: React.FC<Props> = props => {
  const { onVoteChosen, activeLabel, votedStatus, buttonFinishVoting } = props;
  const [voteChosen, setVoteChose] = React.useState('');

  return (
    <div className={classes.container}>
      {votedStatus ? null : (
        <h3 className={'subtitle'}>Select and send vote</h3>
      )}

      {votedStatus ? (
        <h3 className={'subtitle subtitle2'}>
          Your vote: <span className={'subtitle2'}>{voteChosen}</span>
        </h3>
      ) : null}
      <div className={classes.contanierLabels}>
        <div
          className={classes.label}
          onClick={event => {
            setVoteChose(TShirtVotes.XXL);
            activeLabel(event);
          }}
        >
          <h1>XXL</h1>
          <h2>SIZE</h2>
        </div>
        <div
          className={classes.label}
          onClick={event => {
            setVoteChose(TShirtVotes.XL);
            activeLabel(event);
          }}
        >
          <h1>XL</h1>
          <h2>SIZE</h2>
        </div>
        <div
          className={classes.label}
          onClick={event => {
            setVoteChose(TShirtVotes.L);
            activeLabel(event);
          }}
        >
          <h1>L</h1>
          <h2>SIZE</h2>
        </div>
        <div
          className={classes.label}
          onClick={event => {
            setVoteChose(TShirtVotes.M);
            activeLabel(event);
          }}
        >
          <h1>M</h1>
          <h2>SIZE</h2>
        </div>
        <div
          className={classes.label}
          onClick={event => {
            setVoteChose(TShirtVotes.S);
            activeLabel(event);
          }}
        >
          <h1>S</h1>
          <h2>SIZE</h2>
        </div>
        <div
          className={classes.label}
          onClick={event => {
            setVoteChose(TShirtVotes.XS);
            activeLabel(event);
          }}
        >
          <h1>XS</h1>
          <h2>SIZE</h2>
        </div>
      </div>
      <div className={'button-container'}>
        {votedStatus ? (
          undefined
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={e =>
              voteChosen !== ''
                ? onVoteChosen(voteChosen)
                : alert('Select label')
            }
            className={'button'}
          >
            send vote
          </Button>
        )}
        {buttonFinishVoting}
      </div>
    </div>
  );
};
