import React from 'react';
import { ScreenReaderSnackbarContext } from './screen-reader-snackbar.context';
import * as classes from './screen-reader-snackbar.styles';

export const ScreenReaderSnackbarComponent: React.FunctionComponent = () => {
  const { options } = React.useContext(ScreenReaderSnackbarContext);

  return (
    <div
      aria-live="assertive"
      aria-atomic="true"
      className={classes.screenReaderOnly}
    >
      {options.messages.map((message, index) => (
        <p role="paragraph" key={index}>
          {message}
        </p>
      ))}
    </div>
  );
};
