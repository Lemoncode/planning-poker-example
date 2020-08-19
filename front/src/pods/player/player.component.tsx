import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { PlayerStatus, VoteResult } from './player.vm';
import {
  ConnectComponent,
  WaitComponent,
  ShowVotingResults,
} from './components';

import { VoteOptionsComponent } from 'common-app/components';

interface Props {
  room: string;
  onConnect: (nickname: string) => void;
  story: string;
  vote: string;
  onVoteChosen: (vote: string) => void;
  playerStatus: PlayerStatus;
  voteCollectionResult: VoteResult[];
}

export const PlayerComponent: React.FC<Props> = props => {
  const {
    room,
    onConnect,
    story,
    vote,
    onVoteChosen,
    playerStatus,
    voteCollectionResult,
  } = props;
  const [nickname, setNickname] = React.useState('Buba');

  function showComponentBasedonPlayerStatus(status: PlayerStatus) {
    switch (status) {
      case PlayerStatus.NOT_CONNECTED:
        return (
          <ConnectComponent
            playerStatus={status}
            room={room}
            onConnect={onConnect}
          />
        );
      case PlayerStatus.WAITING_FOR_STORY:
        return <WaitComponent />;
      case PlayerStatus.VOTING_IN_PROGRESS:
        return <VoteOptionsComponent onVoteChosen={onVoteChosen} />;
      case PlayerStatus.VOTING_CLOSED:
        return <span>You voted: {vote} wait for next story</span>;
      case PlayerStatus.SHOW_RESULTS:
        return (
          <ShowVotingResults voteCollectionResult={voteCollectionResult} />
        );
      default:
        return null;
    }
  }

  return <>{showComponentBasedonPlayerStatus(playerStatus)}</>;
};
