import * as React from 'react';
import { PlayerComponent } from './player.component';
import { useParams } from 'react-router-dom';
import { createSocket } from 'core';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from 'core/reducers';
import { connectPlayerAction } from './player.actions';
import { PlayerStatus } from './player.const';

import {
  AuthContext,
  SocketErrorTypes,
  SocketInputMessageTypes,
  SocketContext,
  SocketOuputMessageLiteral,
  SocketOuputMessageTypes,
} from 'core';
import SocketIOClient, { Socket } from 'socket.io';
import { ConnectionStatus, VoteResult } from './player.vm';
import { setProfileInfo } from 'core/actions';

const useProps = () => {
  const { nickname, room, story } = useSelector(
    (state: GlobalState) => state.sessionState
  );

  const playerStatus = useSelector(
    (state: GlobalState) => state.playerPodState.playerPlanningPokerState.status
  );

  return { room, nickname, playerStatus, story };
};

const useHandlers = () => {
  const dispatch = useDispatch();

  return {
    dispatch,
  };
};

export const PlayerContainer = () => {
  const { room, playerStatus, story } = useProps();
  const { dispatch } = useHandlers();

  const authContext = React.useContext(AuthContext);
  const socketContext = React.useContext(SocketContext);

  // TODO: type this.
  const params = useParams();

  const [vote, setVote] = React.useState('');
  const [voteCollectionResult, setVoteCollectionresult] = React.useState<
    VoteResult[]
  >([]);
  /*const [playerStatus, SetplayerStatus] = React.useState<PlayerStatus>(
    PlayerStatus.NOT_CONNECTED
  );*/

  const handleConnect = nickname => {
    // TODO: move to redux state
    //SetplayerStatus(PlayerStatus.CONNECTION_IN_PROGRESS);

    // TODO: move to redux state
    const room = params['room'];

    // Maybe we could just use one action for both, but then we
    // have to import connectPlayer into global reducer or
    // the other way around
    dispatch(setProfileInfo({ nickname, room, isMaster: false }));
    dispatch(
      connectPlayerAction({
        user: nickname,
        room,
        isMaster: false,
      })
    );

    /*

    socket.on('message', msg => {
      console.log(msg);
      if (msg.type) {
        switch (msg.type) {
          case SocketInputMessageTypes.NEW_STORY:
            //alert('new Story !!');
            setStory(msg.payload);
            SetplayerStatus(PlayerStatus.VOTING_IN_PROGRESS);
            break;
          case SocketInputMessageTypes.SHOW_VOTING_RESULTS:
            setVoteCollectionresult(msg.payload);
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
            SetplayerStatus(PlayerStatus.NOT_CONNECTED);
            break;
        }
      }
      console.log(msg);
    });
    */
    // TODO close socket on navgiate away (use effect return)
  };

  const handleVoteChosen = (vote: string) => {
    setVote(vote);
    //SetplayerStatus(PlayerStatus.VOTING_CLOSED);

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
        playerStatus={playerStatus}
        room={room}
        onConnect={handleConnect}
        story={story}
        vote={vote}
        onVoteChosen={handleVoteChosen}
        voteCollectionResult={voteCollectionResult}
        title={story}
      />
    </>
  );
};
