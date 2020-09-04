import React from 'react';
import { cx } from 'emotion';
import * as classes from './create-session.styles';
import { Typography } from '@material-ui/core';
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
        <Typography className={classes.title} variant="h5">
          Enter your name and click on create session
        </Typography>
        <div className={classes.formContainer}>
          <TextField
            className={cx(classes.formItem, classes.textField)}
            label="Nickname"
            margin="normal"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
          <Button
            className={cx(classes.formItem, classes.button)}
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
