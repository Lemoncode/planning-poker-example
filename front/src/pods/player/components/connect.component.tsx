import * as React from 'react';
import { cx } from 'emotion';
import * as classes from './connect.styles';
import { Formik, Form } from 'formik';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { PlayerStatus } from 'pods/player/player.vm';
import { CustomAlert, TextFieldComponent } from 'common';
import { formValidation } from './connect.validation';

interface Props {
  room: string;
  onConnect: (nickname: string) => void;
  playerStatus: PlayerStatus;
  showAlert: boolean;
  setShowAlert: (e: boolean) => void;
}

export const ConnectComponent: React.FC<Props> = props => {
  const { room, onConnect, playerStatus, showAlert, setShowAlert } = props;

  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant="h5">
        Join player to poker session: {room}
      </Typography>
      <div>
        <CustomAlert
          textAlert={'Please Choose another nickname'}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      </div>
      <Formik
        onSubmit={connectForm => onConnect(connectForm.nickname)}
        initialValues={{ nickname: 'Neo' }}
        validate={formValidation.validateForm}
      >
        {() => {
          return (
            <Form className={classes.formContainer}>
              <TextFieldComponent
                name="nickname"
                label="Nickname"
                className={cx(classes.formItem, classes.textField)}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={playerStatus === PlayerStatus.WAITING_FOR_STORY}
                className={cx(classes.formItem, classes.button)}
              >
                Crear nueva sesión
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
