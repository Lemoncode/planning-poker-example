import React from 'react';
import { ScreenReaderSnackbarOptions } from './screeen-reader-snackbar.vm';

interface Context {
  options: ScreenReaderSnackbarOptions;
  setOptions: (options: ScreenReaderSnackbarOptions) => void;
}

export const ScreenReaderSnackbarContext = React.createContext<Context>({
  options: {
    messages: [],
  },
  setOptions: options => {},
});

export const ScreenReaderSnackbarProvider: React.FunctionComponent = props => {
  const { children } = props;
  const [options, setOptions] = React.useState<ScreenReaderSnackbarOptions>({
    messages: [],
  });

  React.useEffect(() => {
    console.log('opcions ', options);
  }, [options]);
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
