import React from 'react';
import { hot } from 'react-hot-loader/root';
import { RouterComponent } from 'core/router';
import { AuthProvider, SocketProvider } from 'core';
import { ThemeProviderComponent } from 'core/theme';
import { SnackbarProvider } from 'common';
import { ScreenReaderSnackbarProvider } from 'common';

const App: React.FunctionComponent = () => {
  return (
    <SocketProvider>
      <AuthProvider>
        <ThemeProviderComponent>
          <SnackbarProvider>
            <ScreenReaderSnackbarProvider>
              <RouterComponent />
            </ScreenReaderSnackbarProvider>
          </SnackbarProvider>
        </ThemeProviderComponent>
      </AuthProvider>
    </SocketProvider>
  );
};

export default hot(App);
