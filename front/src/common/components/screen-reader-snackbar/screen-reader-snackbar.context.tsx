import React from 'react';
import { ScreenReaderSnackbarOptions } from './screeen-reader-snackbar.vm';

interface Context {
  options: ScreenReaderSnackbarOptions;
  setOptions: (options: ScreenReaderSnackbarOptions) => void;
}

export const ScreenReaderSnackbarContext = React.createContext<Context>(null);

interface Props {
  timeout?: number;
}

export const ScreenReaderSnackbarProvider: React.FunctionComponent<Props> = props => {
  const { timeout, children } = props;
  const [options, setOptions] = React.useState<ScreenReaderSnackbarOptions>({
    messages: [],
    timeout: Boolean(timeout) ? timeout : 0,
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
