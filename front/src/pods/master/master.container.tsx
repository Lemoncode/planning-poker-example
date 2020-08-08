import * as React from 'react';
import { createSocket } from './master.api';
import { AuthContext } from 'core';

export const MasterContainer = () => {
  const authContext = React.useContext(AuthContext);

  React.useEffect(() => {
    // TODO: Error handling
    // Connect to the socket
    const nickname = authContext.nickname;
    const socket = createSocket({ user: nickname });
  }, []);

  return <h1>Hello from Master Container</h1>;
};
