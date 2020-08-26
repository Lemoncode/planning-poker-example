import React from 'react';
import { hot } from 'react-hot-loader/root';
import { RouterComponent } from 'core/router';
import { AuthProvider, SocketProvider } from 'core';
import { ThemeProviderComponent } from 'core/theme';

const App: React.FunctionComponent = () => {
  return (
    <SocketProvider>
      <AuthProvider>
        <ThemeProviderComponent>
          <RouterComponent />
        </ThemeProviderComponent>
      </AuthProvider>
    </SocketProvider>
  );
};

export default hot(App);
