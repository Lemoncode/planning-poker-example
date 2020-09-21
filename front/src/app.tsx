import React from 'react';
import { hot } from 'react-hot-loader/root';
import { RouterComponent } from 'core/router';
import { AuthProvider, SocketProvider } from 'core';
import { ThemeProviderComponent } from 'core/theme';
import { SnackbarProvider } from 'common';

const App: React.FunctionComponent = () => {
  return (
    <SocketProvider>
      <AuthProvider>
        <ThemeProviderComponent>
          <SnackbarProvider>
            <RouterComponent />
          </SnackbarProvider>
        </ThemeProviderComponent>
      </AuthProvider>
    </SocketProvider>
  );
};

export default hot(App);
