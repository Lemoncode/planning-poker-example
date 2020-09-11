import * as React from 'react';
import * as classes from './define-story.styles';
import { Typography, Button } from '@material-ui/core';
import { Formik } from 'formik';
import { fieldValidation } from 'core';
import { TextAreaComponent } from './textArea-field.component';

interface Props {
  onSubmit: (story: string) => void;
}

export const DefineStoryComponent: React.FC<Props> = props => {
  const { onSubmit } = props;

  return (
    <div className={classes.container}>
      <Typography className={classes.subtitle} variant="subtitle1">
        Define here you user history and click on start voting
      </Typography>
      <Formik
        onSubmit={() => {}}
        initialValues={{ story: '' }}
        validate={fieldValidation.validateForm}
      >
        {props => {
          const { handleChange, values, errors } = props;
          return (
            <form onSubmit={() => {}}>
              <TextAreaComponent
                className={classes.textArea}
                rows={3}
                placeholder="Define here..."
                value={values.story}
                onChange={handleChange}
                name={'story'}
              />
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={e => onSubmit(values.story)}
              >
                START VOTING
              </Button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
