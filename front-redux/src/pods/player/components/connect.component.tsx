import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ConnectionStatus } from '../player.vm';
import { PlayerStatus } from '../player.const';

interface Props {
  room: string;
  onConnect: (nickname: string) => void;
  playerStatus: PlayerStatus;
}

export const ConnectComponent: React.FC<Props> = props => {
  const { room, onConnect, playerStatus } = props;
  const [nickname, setNickname] = React.useState('Buba');

  return (
    <>
      <Typography variant="h4">Join player to poker session: {room}</Typography>
      <TextField
        label="Nickname"
        margin="normal"
        value={nickname}
        onChange={e => setNickname(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={e => onConnect(nickname)}
        disabled={playerStatus === PlayerStatus.CONNECTION_IN_PROGRESS}
      >
        Crear nueva sesión
      </Button>
    </>
  );
};
