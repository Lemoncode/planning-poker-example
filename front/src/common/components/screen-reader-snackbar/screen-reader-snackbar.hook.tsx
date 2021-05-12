import React from 'react';
import { ScreenReaderSnackbarOptions } from './screeen-reader-snackbar.vm';
import { ScreenReaderSnackbarContext } from './screen-reader-snackbar.context';

export const useScreenReaderSnackbarContext = () => {
  const { options, setOptions } = React.useContext(ScreenReaderSnackbarContext);
  const optionsRef = React.useRef<ScreenReaderSnackbarOptions>(options);
  const timer = React.useRef(null);

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleUpdateMessages = (messages: string[]) => {
    optionsRef.current = {
      ...options,
      messages,
    };
    setOptions(optionsRef.current);
  };

  const showScreenReaderMessage = (message: string, timeout?: number) => {
    const currentTimeout = Boolean(timeout) ? timeout : optionsRef.current.timeout;
    handleUpdateMessages([...optionsRef.current.messages, message]);

    timer.current = setTimeout(() => {
      handleUpdateMessages(
        optionsRef.current.messages.filter(m => m !== message)
      );
    }, currentTimeout);
  };
  return {
    showScreenReaderMessage,
  };
};
