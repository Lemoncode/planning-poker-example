import React from 'react';
import { ScreenReaderSnackbarContext } from './screenReadersnackbar.context';

export const useScreenReaderSnackbarContext = () => {
  const { options, setOptions } = React.useContext(ScreenReaderSnackbarContext);

  return {
    showScreeanReaderMessage: (message: string) => {
      console.log(options);
      console.log(message);
      const newMessage = [...options.messages, message];
      console.log(newMessage);
      setOptions({ messages: [...options.messages, message] });
    },
  };
};
