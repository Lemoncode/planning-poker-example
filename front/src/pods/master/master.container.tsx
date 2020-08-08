import * as React from 'react';
import { createSocket } from './master.api';
import { AuthContext } from 'core';
import { useParams } from 'react-router-dom';

export const MasterContainer = () => {
  const authContext = React.useContext(AuthContext);
  const params = useParams(); // TODO: Type this

  React.useEffect(() => {
    // TODO: Error handling
    // Connect to the socket
    const nickname = authContext.nickname;
    const socket = createSocket({ user: nickname, room: params.room });
  }, []);

  return <h1>Hello from Master Container</h1>;
};
