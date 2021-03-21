import React from 'react';
import { ScreenReaderSnackbarContext } from './screenReadersnackbar.context';
import * as classes from './screenReaderSnackbar.styles';

export const ScreenReaderSnackbarComponent: React.FunctionComponent = () => {
  const { options } = React.useContext(ScreenReaderSnackbarContext);

  return (
    <>
      {options.messages.length > 0 && (
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
      )}
    </>
  );
};
