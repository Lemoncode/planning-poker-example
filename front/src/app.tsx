import React from 'react';
import { hot } from 'react-hot-loader/root';
import { RouterComponent } from 'core/router';
import { AuthProvider, SocketProvider } from 'core';

const App: React.FunctionComponent = () => {
  return (
    <SocketProvider>
      <AuthProvider>
        <RouterComponent />
      </AuthProvider>
    </SocketProvider>
  );
};

export default hot(App);
