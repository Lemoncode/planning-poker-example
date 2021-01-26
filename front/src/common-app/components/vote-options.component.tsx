import * as React from 'react';
import Typography from '@material-ui/core/Typography';
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
  const elementFocus = React.useRef<HTMLDivElement>(null);

  // https://stackoverflow.com/questions/16174182/typescript-looping-through-a-dictionary
  const [voteCollection, setVoteCollection] = React.useState<string[]>(
    Object.keys(TShirtVotes).map(k => TShirtVotes[k])
  );

  const { showMessage } = useSnackbarContext();

  const onLocalVoteChosen = voteActive => {
    elementFocus.current.focus();
    setVoteCollection([voteActive]);
    onVoteChosen(voteActive);
  };

  const cardCenterOnVoteChosen = () =>
    voteCollection.length === 1 ? classes.contanierLabelShowVote : '';

  return (
    <div className={classes.container} ref={elementFocus} tabIndex={0}>
      <SnackbarComponent />
      {votedStatus ? null : (
        <Typography
          variant="h3"
          component="h2"
          id="sizeVotes"
          className={classes.subtitle}
        >
          Select and send vote
        </Typography>
      )}

      {votedStatus ? (
        <Typography
          variant="h3"
          component="h2"
          className={cx(classes.subtitle, classes.subtitle2)}
        >
          Your vote: <span className={classes.subtitle2}>{voteChosen}</span>
        </Typography>
      ) : null}
      <div role="radiogroup" aria-labelledby="sizeVotes">
        <ul className={cx(classes.contanierLabels, cardCenterOnVoteChosen())}>
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
    <li className={classes.voteListItem(voteSelected === cardValue)}>
      <input
        className={classes.radioButton}
        type="radio"
        id={`${cardValue} size`}
        name="T-shirt size votes"
        onClick={event => {
          onVoteSelected(cardValue);
        }}
        data-testid={cardValue}
      />
      <label htmlFor={`${cardValue} size`}>
        <div className={cx(styleActiveCard(), styleVotedCard())}>
          <div>{cardValue}</div>
          <span>SIZE</span>
        </div>
      </label>
    </li>
  );
};
