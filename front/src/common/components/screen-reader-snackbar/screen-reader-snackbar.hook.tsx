import React from 'react';
import { ScreenReaderSnackbarOptions } from './screeen-reader-snackbar.vm';
import { ScreenReaderSnackbarContext } from './screen-reader-snackbar.context';

export const useScreenReaderSnackbarContext = () => {
  const { options, setOptions } = React.useContext(ScreenReaderSnackbarContext);

  const optionsRef = React.useRef<ScreenReaderSnackbarOptions>({
    messages: [],
  });

  const timer = React.useRef(null);

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleUpdateMessages = (messages: string[]) => {
    optionsRef.current = {
      messages,
    };
    setOptions(optionsRef.current);
  };

  const showScreenReaderMessage = (message: string, timeout: number = 1000) => {
    handleUpdateMessages([...optionsRef.current.messages, message]);

    timer.current = setTimeout(() => {
      handleUpdateMessages(
        optionsRef.current.messages.filter(m => m !== message)
      );
    }, timeout);
  };
  return {
    showScreenReaderMessage,
  };
};
