import React from 'react';
import { ScreenReaderSnackbarOptions } from './screeen-reader-snackbar.vm';
import { ScreenReaderSnackbarContext } from './screen-reader-snackbar.context';

export const useScreenReaderSnackbarContext = () => {
  const { options, setOptions } = React.useContext(ScreenReaderSnackbarContext);

  const optionsRef = React.useRef<ScreenReaderSnackbarOptions>({
    messages: [],
    timeout: 1000,
  });

  const timer = React.useRef(null);

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleUpdateMessages = (messages: string[], timeout: number) => {
    optionsRef.current = {
      messages,
      timeout,
    };
    setOptions(optionsRef.current);
  };

  const showScreenReaderMessage = (message: string, timeout: number = 1000) => {
    handleUpdateMessages([...optionsRef.current.messages], timeout);

    timer.current = setTimeout(() => {
      handleUpdateMessages(
        optionsRef.current.messages.filter(m => m !== message),
        timeout
      );
    }, timeout);
  };
  return {
    showScreenReaderMessage,
  };
};
