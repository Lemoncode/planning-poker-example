import * as React from 'react';
import { createSocket } from './master.api';
import { AuthContext, SocketMessageTypes } from 'core';
import { useParams } from 'react-router-dom';
import { MasterComponent } from './master.component';

export const MasterContainer = () => {
  const authContext = React.useContext(AuthContext);
  const params = useParams(); // TODO: Type this
  const [room, setRoom] = React.useState('');
  const [playerCollection, setPlayerCollection] = React.useState<string[]>([]);

  React.useEffect(() => {
    // TODO: Error handling
    // Connect to the socket
    const nickname = authContext.nickname;
    const room = params['room'];
    const socket = createSocket({
      user: nickname,
      room,
      isMaster: true,
    });

    setRoom(room);

    socket.on('message', msg => {
      if (msg.type) {
        const { type, payload } = msg;

        switch (type) {
          case SocketMessageTypes.CONNECTION_ESTABLISHED_PLAYER:
            const nickname = payload;
            setPlayerCollection([...playerCollection, nickname]);
            break;
        }
      }
    });

    // TODO we are assuming all goes fine
    // plus time lapse between room is assigned
    // and connection established has no colllision
    // later on we can control that handling the sockets
    // responses (add spinner, and show entering, succeeded,
    // or error)
  }, []);

  return <MasterComponent room={room} playerCollection={playerCollection} />;
};
