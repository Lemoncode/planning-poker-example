import * as React from 'react';
import { PlayerComponent } from './player.component';
import { useParams } from 'react-router-dom';
import { createSocket } from 'core';
import {
  AuthContext,
  SocketErrorTypes,
  SocketInputMessageTypes,
  SocketContext,
  SocketOuputMessageLiteral,
  SocketOuputMessageTypes,
} from 'core';
import { Socket } from 'socket.io';
import { PlayerStatus } from './player.vm';
import { PlayerVotingStatus } from 'core';

export const PlayerContainer = () => {
  const authContext = React.useContext(AuthContext);
  const socketContext = React.useContext(SocketContext);

  // TODO: type this.
  const params = useParams();
  const [room, setRoom] = React.useState('');
  const [voted, setVoted] = React.useState(false);
  const [story, setStory] = React.useState('');
  const [vote, setVote] = React.useState('');
  const [voteCollectionResult, setVoteCollectionresult] = React.useState<
    PlayerVotingStatus[]
  >([]);
  const [playerStatus, SetplayerStatus] = React.useState<PlayerStatus>(
    PlayerStatus.CONNECTED
  );

  const handleConnect = nickname => {
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
            //alert('Connection established !!!');
            SetplayerStatus(PlayerStatus.WAITING_FOR_STORY);
            break;
          case SocketInputMessageTypes.NEW_STORY:
            //alert('new Story !!');
            setVoted(false);
            setStory(msg.payload);
            SetplayerStatus(PlayerStatus.VOTING_IN_PROGRESS);
            break;
          case SocketInputMessageTypes.SHOW_VOTING_RESULTS:
            // refactor this to a map
            const playerVoteResults = msg.payload.map(voteResult => ({
              ...voteResult,
              voted: !!voteResult.vote,
            }));
            // ***
            setVoteCollectionresult(playerVoteResults);
            SetplayerStatus(PlayerStatus.SHOW_RESULTS);
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
            SetplayerStatus(PlayerStatus.CONNECTED);
            break;
        }
      }
      console.log(msg);
    });

    // TODO close socket on navgiate away (use effect return)
  };

  const handleVoteChosen = (vote: string) => {
    setVote(vote);
    setVoted(true);
    SetplayerStatus(PlayerStatus.VOTING_IN_PROGRESS);

    // Send messsage to server informing about the vote
    socketContext.socket.emit(SocketOuputMessageLiteral.MESSAGE, {
      type: SocketOuputMessageTypes.USER_VOTED,
      payload: vote,
    });
  };

  return (
    <PlayerComponent
      playerStatus={playerStatus}
      room={room}
      onConnect={handleConnect}
      story={story}
      vote={vote}
      voted={voted}
      onVoteChosen={handleVoteChosen}
      voteCollectionResult={voteCollectionResult}
      title={story}
      nickname={authContext.nickname}
    />
  );
};
