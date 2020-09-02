import * as React from 'react';
import { VoteOptionsComponent } from './vote-options.component';

interface Props {
  bottonFinishVoting?: JSX.Element;
  onVoteChosen: (vote: string) => void;
  votedStatus: boolean;
}

export const VoteOptionsContainer: React.FC<Props> = props => {
  const { onVoteChosen, votedStatus, bottonFinishVoting } = props;

  const handledChange = event => {
    let element = document.getElementsByClassName('active-label');
    for (let i = 0; i < element.length; i++) {
      element[i].classList.add('label');
      element[i].classList.remove('active-label');
    }
    event.currentTarget.classList.remove('label');
    event.currentTarget.classList.add('active-label');
  };

  React.useEffect(() => {
    votedStatus
      ? document.querySelectorAll('.label').forEach(element => element.remove())
      : null;
  }, [votedStatus]);

  return (
    <VoteOptionsComponent
      onVoteChosen={onVoteChosen}
      activeLabel={handledChange}
      bottonFinishVoting={bottonFinishVoting}
      votedStatus={votedStatus}
    />
  );
};
