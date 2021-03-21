import React from 'react';
import { ScreenReaderSnackbarContext } from './screenReadersnackbar.context';

export const useScreenReaderSnackbarContext = () => {
  const { setOptions, options } = React.useContext(ScreenReaderSnackbarContext);

  return {
    showScreeanReaderMessage: (message: string) => {
      setTimeout(
        () => setOptions({ messages: [...options.messages, message] }),
        2500
      );
    },
  };
};
