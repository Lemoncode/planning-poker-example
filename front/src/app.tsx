import React from 'react';
import { hot } from 'react-hot-loader/root';
import { RouterComponent } from 'core/router';
import { AuthProvider, SocketProvider } from 'core';
import { ThemeProviderComponent } from 'core/theme';
import {
  SnackbarProvider,
  ScreenReaderSnackbarProvider,
  ScreenReaderSnackbarComponent,
} from 'common/components';

const App: React.FunctionComponent = () => {
  return (
    <SocketProvider>
      <AuthProvider>
        <ThemeProviderComponent>
          <SnackbarProvider>
            <ScreenReaderSnackbarProvider timeout={1000}>
              <RouterComponent />
              <ScreenReaderSnackbarComponent />
            </ScreenReaderSnackbarProvider>
          </SnackbarProvider>
        </ThemeProviderComponent>
      </AuthProvider>
    </SocketProvider>
  );
};

export default hot(App);
