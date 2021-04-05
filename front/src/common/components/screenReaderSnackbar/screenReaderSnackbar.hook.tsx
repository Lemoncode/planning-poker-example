import React from 'react';
import { ScreenReaderSnackbarOptions } from './screeenReaderSnackbar.vm';
import { ScreenReaderSnackbarContext } from './screenReadersnackbar.context';

export const useScreenReaderSnackbarContext = () => {
  const { options, setOptions } = React.useContext(ScreenReaderSnackbarContext);

  const optionsRef = React.useRef<ScreenReaderSnackbarOptions>({
    messages: [],
  });

  const [intervalScreen, setIntervalScreen] = React.useState(null);

  return {
    showScreeanReaderMessage: (message: string) => {
      optionsRef.current = {
        messages: [...optionsRef.current.messages, message],
      };
      setOptions(optionsRef.current);
      const interval = setInterval(() => {
        //Delete message
        if (
          optionsRef.current.messages != undefined &&
          optionsRef.current.messages.length > 0
        ) {
          setTimeout(() => {
            optionsRef.current.messages.pop();

            setOptions({
              messages: optionsRef.current.messages,
            });
          }, 1000);
        }
      }, 2000);

      setIntervalScreen(interval);
    },
    intervalScreen,
  };
};
