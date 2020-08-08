import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

interface Props {
  onCreateSession: (nickname: string) => void;
}

export const CreateSessionComponent: React.FunctionComponent<Props> = props => {
  const { onCreateSession } = props;
  const [nickname, setNickname] = React.useState('master');

  return (
    <>
      <TextField
        label="Nickname"
        margin="normal"
        value={nickname}
        onChange={e => setNickname(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={e => onCreateSession(nickname)}
      >
        Crear nueva sesión
      </Button>
    </>
  );
};
