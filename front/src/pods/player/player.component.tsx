import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

interface Props {
  room: string;
  onConnect: (nickname: string) => void;
}

export const PlayerComponent: React.FC<Props> = props => {
  const { room, onConnect } = props;
  const [nickname, setNickname] = React.useState('Buba');

  return (
    <>
      <Typography variant="h4">Join to player poker session: {room}</Typography>
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
      >
        Crear nueva sesión
      </Button>
    </>
  );
};
