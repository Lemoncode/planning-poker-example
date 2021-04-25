import React from 'react';
import { ScreenReaderSnackbarOptions } from './screeen-reader-snackbar.vm';

interface Context {
  options: ScreenReaderSnackbarOptions;
  setOptions: (options: ScreenReaderSnackbarOptions) => void;
}

export const ScreenReaderSnackbarContext = React.createContext<Context>({
  options: {
    messages: [],
    timeout: 1000,
  },
  setOptions: options => {},
});

export const ScreenReaderSnackbarProvider: React.FunctionComponent = props => {
  const { children } = props;
  const [options, setOptions] = React.useState<ScreenReaderSnackbarOptions>({
    messages: [],
    timeout: 1000,
  });

  return (
    <ScreenReaderSnackbarContext.Provider
      value={{
        options,
        setOptions,
      }}
    >
      {children}
    </ScreenReaderSnackbarContext.Provider>
  );
};
