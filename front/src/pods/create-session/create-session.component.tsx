import React from 'react';
import { cx } from 'emotion';
import * as classes from './create-session.styles';
import { Formik } from 'formik';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { TextFieldComponent, formValidation } from 'common-app/components';

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
          onSubmit={() => {}}
          initialValues={{ nickname: 'master of puppets' }}
          validate={formValidation.validateForm}
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
                  className={cx(classes.formItem, classes.button)}
                  variant="contained"
                  color="primary"
                  onClick={e => onCreateSession(values.nickname)}
                >
                  Create new session
                </Button>
              </form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};
