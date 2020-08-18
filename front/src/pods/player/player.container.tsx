import * as React from 'react';
import { PlayerComponent } from './player.component';
import { useParams } from 'react-router-dom';
import { createSocket } from './player.api';
import {
  AuthContext,
  SocketErrorTypes,
  SocketInputMessageTypes,
  SocketContext,
  SocketOuputMessageLiteral,
  SocketOuputMessageTypes,
} from 'core';
import SocketIOClient, { Socket } from 'socket.io';
import { ConnectionStatus } from './player.vm';

export const PlayerContainer = () => {
  const authContext = React.useContext(AuthContext);
  const socketContext = React.useContext(SocketContext);

  // TODO: type this.
  const params = useParams();
  const [room, setRoom] = React.useState('');
  const [connected, setConnected] = React.useState<ConnectionStatus>(
    ConnectionStatus.notConnected
  );
  const [story, setStory] = React.useState('');
  const [vote, setVote] = React.useState('');

  const handleConnect = nickname => {
    setConnected(ConnectionStatus.ConnectionInProgress);
    authContext.setNickname(nickname);

    const room = params['room'];
    // No Error handling here
    // connection maybe refused, e.g. room is not valid
    // or nickname is already in use in that room
    // TODO: fix this
    const socket: Socket = createSocket({
      user: nickname,
      room,
      isMaster: false,
    });

    socketContext.setSocket(socket);

    setRoom(room);

    socket.on('message', msg => {
      console.log(msg);
      if (msg.type) {
        switch (msg.type) {
          case SocketInputMessageTypes.CONNECTION_ESTABLISHED_PLAYER:
            alert('Connection established !!!');
            setConnected(ConnectionStatus.Connected);
            break;
          case SocketInputMessageTypes.NEW_STORY:
            alert('new Story !!');
            setStory(msg.payload);
            break;
        }
      }
    });

    socket.on('error-app', msg => {
      if (msg.type) {
        switch (msg.type) {
          case SocketErrorTypes.NICKNAME_ALREADY_IN_USE:
            alert('Please Choose another nickname');
            socket.disconnect();
            setConnected(ConnectionStatus.notConnected);
            break;
        }
      }
      console.log(msg);
    });

    // TODO close socket on navgiate away (use effect return)
  };

  const handleVoteChosen = (vote: string) => {
    setVote(vote);

    // Send messsage to server informing about the vote
    socketContext.socket.emit(SocketOuputMessageLiteral.MESSAGE, {
      type: SocketOuputMessageTypes.USER_VOTED,
      payload: vote,
    });
  };

  return (
    <>
      <h1>Player Container</h1>
      <PlayerComponent
        connectionStatus={connected}
        room={room}
        onConnect={handleConnect}
        story={story}
        vote={vote}
        onVoteChosen={handleVoteChosen}
      />
    </>
  );
};
