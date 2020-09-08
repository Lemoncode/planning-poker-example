import * as React from 'react';
import { cx } from 'emotion';
import * as classes from './create-session.styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { PlayerStatus } from 'pods/player/player.vm';

interface Props {
  room: string;
  onConnect: (nickname: string) => void;
  playerStatus: PlayerStatus;
}

export const ConnectComponent: React.FC<Props> = props => {
  const { room, onConnect, playerStatus } = props;
  const [nickname, setNickname] = React.useState('Buba');

  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant="h6">
        Join player to poker session: {room}
      </Typography>
      <div className={classes.formContainer}>
        <TextField
          label="Nickname"
          margin="normal"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          className={cx(classes.formItem, classes.textField)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={e => onConnect(nickname)}
          disabled={playerStatus === PlayerStatus.WAITING_FOR_STORY}
          className={cx(classes.formItem, classes.button)}
        >
          Crear nueva sesión
        </Button>
      </div>
    </div>
  );
};
