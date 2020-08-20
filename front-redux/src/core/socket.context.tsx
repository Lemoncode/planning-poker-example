import React from 'react';
import SocketIOClient, { Socket } from 'socket.io';

interface Context {
  socket: Socket;
  setSocket: (socket: Socket) => void;
}

export const SocketContext = React.createContext<Context>({
  socket: null,
  setSocket: () =>
    console.warn(
      'Did you forget to place AuthContext provider on top of your app?'
    ),
});

export const SocketProvider: React.FC = props => {
  const { children } = props;
  const [socket, setSocket] = React.useState(null);

  return (
    <SocketContext.Provider
      value={{
        socket,
        setSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
