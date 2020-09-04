import * as React from 'react';
import * as classes from './vote-options.styles';
import { TShirtVotes } from 'core';
import { Button } from '@material-ui/core';
import { cx } from 'emotion';

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
        <CardComponent
          cardValue={TShirtVotes.XXL}
          onActivelabel={activeLabel}
          onVoteChosen={setVoteChose}
        />

        <CardComponent
          cardValue={TShirtVotes.XL}
          onActivelabel={activeLabel}
          onVoteChosen={setVoteChose}
        />

        <CardComponent
          cardValue={TShirtVotes.L}
          onActivelabel={activeLabel}
          onVoteChosen={setVoteChose}
        />

        <CardComponent
          cardValue={TShirtVotes.M}
          onActivelabel={activeLabel}
          onVoteChosen={setVoteChose}
        />

        <CardComponent
          cardValue={TShirtVotes.S}
          onActivelabel={activeLabel}
          onVoteChosen={setVoteChose}
        />

        <CardComponent
          cardValue={TShirtVotes.XS}
          onActivelabel={activeLabel}
          onVoteChosen={setVoteChose}
        />
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

interface CardProps {
  //currentSelectedValue : string;
  cardValue: string;
  //votedStatus : boolean;
  onVoteChosen: (value: string) => void;
  // TODO: check if we can remove it
  onActivelabel: (e) => void;
}

const CardComponent: React.FC<CardProps> = props => {
  const { onVoteChosen, onActivelabel, cardValue } = props;

  return (
    <div
      className={classes.label}
      onClick={event => {
        onVoteChosen(cardValue);
        onActivelabel(event);
      }}
    >
      <h1>{cardValue}</h1>
      <h2>SIZE</h2>
    </div>
  );
};
