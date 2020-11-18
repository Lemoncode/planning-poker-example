import * as React from 'react';
import * as classes from './vote-options.styles';
import { TShirtVotes } from 'core';
import { Button } from '@material-ui/core';
import { cx } from 'emotion';
import { useSnackbarContext, SnackbarComponent } from 'common';

interface Props {
  onVoteChosen: (vote: string) => void;
  buttonFinishVoting?: React.FC;
  votedStatus: boolean;
}

export const VoteOptionsComponent: React.FC<Props> = props => {
  const { onVoteChosen, votedStatus, buttonFinishVoting } = props;
  const [voteChosen, setVoteChosen] = React.useState('');
  const [voteActive, setVoteActive] = React.useState('');

  // https://stackoverflow.com/questions/16174182/typescript-looping-through-a-dictionary
  const [voteCollection, setVoteCollection] = React.useState<string[]>(
    Object.keys(TShirtVotes).map(k => TShirtVotes[k])
  );

  const { showMessage } = useSnackbarContext();

  const onLocalVoteChosen = voteActive => {
    setVoteCollection([voteActive]);
    onVoteChosen(voteActive);
  };

  const cardCenterOnVoteChosen = () =>
    voteCollection.length === 1 ? classes.contanierLabelShowVote : '';

  return (
    <div className={classes.container}>
      <SnackbarComponent />
      {votedStatus ? null : (
        <h3 id="T-shirt size votes" className={classes.subtitle}>
          Select and send vote
        </h3>
      )}

      {votedStatus ? (
        <h3 className={cx(classes.subtitle, classes.subtitle2)}>
          Your vote: <span className={classes.subtitle2}>{voteChosen}</span>
        </h3>
      ) : null}
      <div role="radiogroup" aria-labelledby="T-shirt size votes">
        <ul className={cx(classes.contanierLabels, cardCenterOnVoteChosen())}>
          {/* {voteCollection.map(vote => (
            <CardComponent
              userHasVoted={votedStatus}
              key={vote}
              cardValue={vote}
              onVoteSelected={setVoteActive}
              voteSelected={voteActive}
            />
          ))} */}
          {/* TODO - CHECK IF RECEIVED NULL OR UNDEFINED */}
          {voteCollection.map(vote => (
            <CardComponent
              userHasVoted={votedStatus}
              key={vote}
              cardValue={vote}
              onVoteSelected={setVoteActive}
              voteSelected={voteActive}
            />
          ))}
        </ul>
      </div>
      <div className={classes.buttonContainer}>
        {votedStatus ? (
          undefined
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={e =>
              voteActive !== ''
                ? onLocalVoteChosen(voteActive)
                : showMessage('Select label', 'error')
            }
            className={classes.button}
          >
            send vote
          </Button>
        )}
        {buttonFinishVoting}
      </div>
    </div>
  );
};

interface CardProps {
  cardValue: string;
  voteSelected: string;
  userHasVoted: boolean;
  onVoteSelected: (value: string) => void;
}

const CardComponent: React.FC<CardProps> = props => {
  const { onVoteSelected, cardValue, userHasVoted, voteSelected } = props;

  const styleVotedCard = () => (userHasVoted ? classes.showLabelVote : '');

  const styleActiveCard = () => {
    return voteSelected !== cardValue ? classes.label : classes.activeLabel;
  };

  return (
    <li className={classes.voteListItem}>
      <input
        className={classes.radioButton}
        type="radio"
        id={`${cardValue} size`}
        name="T-shirt size votes"
        onChange={e => {
          console.log(`${cardValue} ${e.target.value}`);
        }}
      />
      <label htmlFor={`${cardValue} size`}>
        <div
          className={cx(styleActiveCard(), styleVotedCard())}
          onClick={event => {
            onVoteSelected(cardValue);
          }}
        >
          <h1>{cardValue}</h1>
          <h2>SIZE</h2>
        </div>
      </label>
    </li>
  );
};
