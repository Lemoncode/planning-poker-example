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
import { AddNewPlayer, userVoted } from './master.business';

export const MasterContainer = () => {
  const socketContext = React.useContext(SocketContext);
  const authContext = React.useContext(AuthContext);
  const params = useParams(); // TODO: Type this
  const [room, setRoom] = React.useState('');
  const [playerCollection, setPlayerCollection] = React.useState<Player[]>([]);
  const playerCollectionRef = React.useRef<Player[]>([]);
  const [storyBeingVoted, setStoryBeingVoted] = React.useState(false);

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

    const updatePlayerCollection = (newPlayerCollection: Player[]) => {
      setPlayerCollection(newPlayerCollection);
      playerCollectionRef.current = newPlayerCollection;
    };

    socket.on(SocketOuputMessageLiteral.MESSAGE, msg => {
      console.log(msg);
      if (msg.type) {
        const { type, payload } = msg;

        switch (type) {
          case SocketInputMessageTypes.CONNECTION_ESTABLISHED_PLAYER:
            const newPlayerCollection = AddNewPlayer(
              playerCollectionRef.current,
              payload
            );

            updatePlayerCollection(newPlayerCollection);
            break;
          case SocketInputMessageTypes.NOTIFY_USER_VOTED:
            const updatedPlayerList = userVoted(
              playerCollectionRef.current,
              payload
            );
            updatePlayerCollection(updatedPlayerList);
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
    setStoryBeingVoted(true);
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
      storyBeingVoted={storyBeingVoted}
    />
  );
};
