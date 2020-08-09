import * as React from 'react';
import { PlayerComponent } from './player.component';
import { useParams } from 'react-router-dom';
import { createSocket } from './player.api';
import { AuthContext } from 'core';

export const PlayerContainer = () => {
  const authContext = React.useContext(AuthContext);
  // TODO: type this.
  const params = useParams();
  const [room, setRoom] = React.useState('');

  const handleConnect = nickname => {
    authContext.setNickname(nickname);

    const room = params['room'];
    const socket = createSocket({
      user: nickname,
      room,
      isMaster: false,
    });

    setRoom(room);

    socket.on('message', msg => {
      console.log(msg);
    });

    // TODO close socket on navgiate away (use effect return)
  };

  return (
    <>
      <h1>Player Container</h1>
      <PlayerComponent room={room} onConnect={handleConnect} />
    </>
  );
};
