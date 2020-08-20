import React from 'react';
import { hot } from 'react-hot-loader/root';
import { RouterComponent } from 'core/router';
import { AuthProvider, SocketProvider } from 'core';
import { Provider } from 'react-redux';
import { store } from './store';

const App: React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      <SocketProvider>
        <AuthProvider>
          <RouterComponent />
        </AuthProvider>
      </SocketProvider>
    </Provider>
  );
};

export default hot(App);
