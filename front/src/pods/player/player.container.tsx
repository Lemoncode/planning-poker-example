import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io';
import {
  createSocket,
  AuthContext,
  SocketErrorTypes,
  SocketInputMessageTypes,
  SocketContext,
  SocketOuputMessageLiteral,
  SocketOuputMessageTypes,
  PlayerVotingStatus,
} from 'core';
import { useScreenReaderSnackbarContext } from 'common';
import { PlayerStatus } from './player.vm';
import { PlayerComponent } from './player.component';

export const PlayerContainer = () => {
  const authContext = React.useContext(AuthContext);
  const socketContext = React.useContext(SocketContext);

  // TODO: type this.
  const params = useParams();
  const { showScreenReaderMessage } = useScreenReaderSnackbarContext();
  const [room, setRoom] = React.useState('');
  const [voted, setVoted] = React.useState(false);
  const [story, setStory] = React.useState('');
  const [vote, setVote] = React.useState('');
  const [voteCollectionResult, setVoteCollectionresult] = React.useState<
    PlayerVotingStatus[]
  >([]);
  const [playerStatus, setPlayerStatus] = React.useState<PlayerStatus>(
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
      if (msg.type) {
        switch (msg.type) {
          case SocketInputMessageTypes.CONNECTION_ESTABLISHED_PLAYER:
            setPlayerStatus(PlayerStatus.WAITING_FOR_STORY);
            showScreenReaderMessage('Waiting for master');
            break;
          case SocketInputMessageTypes.NEW_STORY:
            //alert('new Story !!');
            setVoted(false);
            setStory(msg.payload);
            setPlayerStatus(PlayerStatus.VOTING_IN_PROGRESS);
            showScreenReaderMessage(
              `Ready to start vote the "${msg.payload}" story`
            );
            break;
          case SocketInputMessageTypes.SHOW_VOTING_RESULTS:
            // refactor this to a map
            const playerVoteResults = msg.payload.map(voteResult => ({
              ...voteResult,
              voted: !!voteResult.vote,
            }));
            // ***
            setVoteCollectionresult(playerVoteResults);
            setPlayerStatus(PlayerStatus.SHOW_RESULTS);
            showScreenReaderMessage(
              `Please, check the "${story}" story\`s results`
            );
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
            setPlayerStatus(PlayerStatus.CONNECTED);
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
    setPlayerStatus(PlayerStatus.VOTING_IN_PROGRESS);

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
