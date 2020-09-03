import * as React from 'react';
import { VoteOptionsComponent } from './vote-options.component';
import * as classes from './vote-options.styles';

interface Props {
  buttonFinishVoting?: JSX.Element;
  onVoteChosen: (vote: string) => void;
  votedStatus: boolean;
}

export const VoteOptionsContainer: React.FC<Props> = props => {
  const { onVoteChosen, votedStatus, buttonFinishVoting } = props;

  const handledChange = event => {
    let element = document.getElementsByClassName(classes.activeLabel);
    for (let i = 0; i < element.length; i++) {
      element[i].classList.add(classes.label);
      element[i].classList.remove(classes.activeLabel);
    }
    event.currentTarget.classList.remove(classes.label);
    event.currentTarget.classList.add(classes.activeLabel);
  };

  React.useEffect(() => {
    if (votedStatus) {
      document
        .querySelectorAll(`.${classes.label}`)
        .forEach(element => element.remove());
      document
        .querySelectorAll(`.${classes.contanierLabels}`)
        .forEach(element => {
          element.classList.remove(classes.contanierLabels);
          element.classList.add(classes.contanierLabelShowVote);
        });
      document.querySelectorAll(`.${classes.activeLabel}`).forEach(element => {
        element.classList.remove(classes.activeLabel);
        element.classList.add(classes.showLabelVote);
      });
    }
  }, [votedStatus]);

  return (
    <VoteOptionsComponent
      onVoteChosen={onVoteChosen}
      activeLabel={handledChange}
      buttonFinishVoting={buttonFinishVoting}
      votedStatus={votedStatus}
    />
  );
};
