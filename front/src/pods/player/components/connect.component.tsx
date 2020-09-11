import * as React from 'react';
import { cx } from 'emotion';
import * as classes from './create-session.styles';
import { Formik } from 'formik';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { PlayerStatus } from 'pods/player/player.vm';
import { TextFieldComponent } from './text-field.component';
import { fieldValidation } from 'core';

interface Props {
  room: string;
  onConnect: (nickname: string) => void;
  playerStatus: PlayerStatus;
}

export const ConnectComponent: React.FC<Props> = props => {
  const { room, onConnect, playerStatus } = props;

  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant="h5">
        Join player to poker session: {room}
      </Typography>
      <Formik
        onSubmit={() => {}}
        initialValues={{ nickname: 'Neo' }}
        validate={fieldValidation.validateForm}
      >
        {props => {
          const { handleChange, values } = props;
          return (
            <form onSubmit={() => {}} className={classes.formContainer}>
              <TextFieldComponent
                name="nickname"
                label="Nickname"
                value={values.nickname}
                onChange={handleChange}
                className={cx(classes.formItem, classes.textField)}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={e => onConnect(values.nickname)}
                disabled={playerStatus === PlayerStatus.WAITING_FOR_STORY}
                className={cx(classes.formItem, classes.button)}
              >
                Crear nueva sesión
              </Button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
