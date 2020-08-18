import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ConnectionStatus } from '../player.vm';

interface Props {
  room: string;
  onConnect: (nickname: string) => void;
  connectionStatus: ConnectionStatus;
}

export const ConnectComponent: React.FC<Props> = props => {
  const { room, onConnect, connectionStatus } = props;
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
        disabled={connectionStatus === ConnectionStatus.ConnectionInProgress}
      >
        Crear nueva sesión
      </Button>
    </>
  );
};

