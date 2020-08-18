import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ConnectionStatus } from './player.vm';
import { ConnectComponent, WaitComponent, VoteComponent } from './components';

interface Props {
  room: string;
  onConnect: (nickname: string) => void;
  connectionStatus: ConnectionStatus;
  story: string;
  vote: string;
  onVoteChosen: (vote: string) => void;
}

export const PlayerComponent: React.FC<Props> = props => {
  const {
    room,
    onConnect,
    connectionStatus,
    story,
    vote,
    onVoteChosen,
  } = props;
  const [nickname, setNickname] = React.useState('Buba');

  return (
    <>
      {connectionStatus !== ConnectionStatus.Connected ? (
        <ConnectComponent
          connectionStatus={connectionStatus}
          onConnect={onConnect}
          room={room}
        />
      ) : story === '' ? (
        <WaitComponent />
      ) : (
        <VoteComponent story={story} vote={vote} onVoteChosen={onVoteChosen} />
      )}
    </>
  );
};
