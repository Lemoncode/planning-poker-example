import * as React from 'react';
import { createSocket } from './master.api';
import {
  AuthContext,
  SocketContext,
  SocketInputMessageTypes,
  SocketOuputMessageLiteral,
  SocketOuputMessageTypes,
} from 'core';
import { useParams } from 'react-router-dom';
import { MasterComponent } from './master.component';
import { Player } from './master.vm';

export const MasterContainer = () => {
  const socketContext = React.useContext(SocketContext);
  const authContext = React.useContext(AuthContext);
  const params = useParams(); // TODO: Type this
  const [room, setRoom] = React.useState('');
  const [playerCollection, setPlayerCollection] = React.useState<Player[]>([]);
  const playerCollectionRef = React.useRef<Player[]>([]);

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
    socketContext.setSocket(socket);

    setRoom(room);

    socket.on(SocketOuputMessageLiteral.MESSAGE, msg => {
      console.log(msg);
      if (msg.type) {
        const { type, payload } = msg;

        switch (type) {
          case SocketInputMessageTypes.CONNECTION_ESTABLISHED_PLAYER:
            const nickname = payload;
            const newPlayerCollection = [
              ...playerCollectionRef.current,
              { nickname, voted: false },
            ];

            setPlayerCollection(newPlayerCollection);
            playerCollectionRef.current = newPlayerCollection;
            break;
          case SocketInputMessageTypes.NOTIFY_USER_VOTED:
            const updatedPlayerList = playerCollectionRef.current.map(player =>
              player.nickname === msg.payload
                ? {
                    ...player,
                    voted: true,
                  }
                : player
            );

            setPlayerCollection(updatedPlayerList);
            playerCollectionRef.current = updatedPlayerList;

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

  const handleSetStoryTitle = (title: string) => {
    // TODO: Sent vía sockets
    socketContext.socket.emit(SocketOuputMessageLiteral.MESSAGE, {
      type: SocketOuputMessageTypes.CREATE_STORY,
      payload: title,
    });
  };

  return (
    <MasterComponent
      room={room}
      playerCollection={playerCollection}
      onSetStoryTitle={handleSetStoryTitle}
    />
  );
};
