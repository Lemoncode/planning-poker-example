import React from 'react';
import { Typography } from '@material-ui/core';
import * as classes from './create-session.styles';
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
      <div className={classes.container}>
        <Typography className={'title'} variant="h5">
          Enter your name and click on create session
        </Typography>
        <div className={'formContainer'}>
          <TextField
            className={'formItem textField'}
            label="Nickname"
            margin="normal"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
          <Button
            className={`formItem ${classes.button}`}
            variant="contained"
            color="primary"
            onClick={e => onCreateSession(nickname)}
          >
            Create new session
          </Button>
        </div>
      </div>
    </>
  );
};
