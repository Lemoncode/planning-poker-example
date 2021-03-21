import React from 'react';
import { ScreenReaderSnackbarContext } from './screenReadersnackbar.context';

export const useScreenReaderSnackbarContext = () => {
  const { setOptions } = React.useContext(ScreenReaderSnackbarContext);

  return {
    showScreeanReaderMessage: (messages: string[]) => {
      setOptions({ messages });
    },
  };
};
