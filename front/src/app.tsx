import React from 'react';
import { hot } from 'react-hot-loader/root';
import { RouterComponent } from 'core/router';
import { AuthProvider, SocketProvider, PlayersProvider } from 'core';
import { ThemeProviderComponent } from 'core/theme';

const App: React.FunctionComponent = () => {
  return (
    <PlayersProvider>
      <SocketProvider>
        <AuthProvider>
          <ThemeProviderComponent>
            <RouterComponent />
          </ThemeProviderComponent>
        </AuthProvider>
      </SocketProvider>
    </PlayersProvider>
  );
};

export default hot(App);
