import * as React from 'react';
import * as classes from './define-story.styles';
import { Typography, Button } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { formValidation } from './define-story.validation';
import { TextAreaComponent } from 'common';

interface Props {
  onSubmit: (story: string) => void;
}

export const DefineStoryComponent = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const { onSubmit } = props;
    React.useEffect(() => {
      console.log('Estoy en Define Story Component');
      console.log(ref);
    }, []);
    return (
      <div className={classes.container}>
        <Typography
          className={classes.subtitle}
          variant="subtitle1"
          component="h2"
          id="define"
        >
          Define here your user story
        </Typography>
        <Formik
          onSubmit={defineStoryForm => onSubmit(defineStoryForm.story)}
          initialValues={{ story: '' }}
          validate={formValidation.validateForm}
        >
          {() => {
            return (
              <Form>
                <TextAreaComponent
                  inputRef={ref}
                  aria-labelledby="define"
                  className={classes.textArea}
                  rows={3}
                  name={'story'}
                />
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  START VOTING
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
);
