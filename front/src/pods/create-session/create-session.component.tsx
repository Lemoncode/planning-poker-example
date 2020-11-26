import React from 'react';
import { cx } from 'emotion';
import { Formik, Form } from 'formik';
import { Typography, Button } from '@material-ui/core';
import { TextFieldComponent } from 'common/components/forms';
import { initMasterNickname } from 'core/const';
import { formValidation } from './create-session.validation';
import * as classes from './create-session.styles';

interface Props {
  onCreateSession: (nickname: string) => void;
}

export const CreateSessionComponent: React.FunctionComponent<Props> = props => {
  const { onCreateSession } = props;

  return (
    <>
      <div className={classes.container}>
        <Typography className={classes.title} variant="h5">
          Enter your name and click on create session
        </Typography>
        <Formik
          onSubmit={sessionForm => onCreateSession(sessionForm.nickname)}
          initialValues={{ nickname: initMasterNickname }}
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
                  className={cx(classes.formItem, classes.button)}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Create new session
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};
