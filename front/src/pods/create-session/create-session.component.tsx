import React from 'react';
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
        Create new session
      </Button>
    </>
  );
};
