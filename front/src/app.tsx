import React from 'react';
import { hot } from 'react-hot-loader/root';
import { RouterComponent } from 'core/router';
import { AuthProvider } from 'core';

const App: React.FunctionComponent = () => {
  return (
    <AuthProvider>
      <RouterComponent />
    </AuthProvider>
  );
};

export default hot(App);
