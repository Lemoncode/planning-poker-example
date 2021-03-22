import React from 'react';
import { ScreenReaderSnackbarContext } from './screenReadersnackbar.context';

export const useScreenReaderSnackbarContext = () => {
  const { options, setOptions } = React.useContext(ScreenReaderSnackbarContext);

  return {
    showScreeanReaderMessage: (message: string) => {
      setOptions({ messages: [...options.messages, message] });
    },
  };
};
