import React from 'react';
import { ScreenReaderSnackbarOptions } from './screeenReaderSnackbar.vm';

interface Context {
  options: ScreenReaderSnackbarOptions;
  setOptions: (options: ScreenReaderSnackbarOptions) => void;
}

export const ScreenReaderSnackbarContext = React.createContext<Context>(null);

export const ScreenReaderSnackbarProvider: React.FunctionComponent = props => {
  const { children } = props;
  const [options, setOptions] = React.useState<ScreenReaderSnackbarOptions>({
    messages: [],
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
