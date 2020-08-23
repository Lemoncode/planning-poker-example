import * as React from 'react';
import { PlayerComponent } from './player.component';
import { useParams } from 'react-router-dom';
import { createSocket } from 'core';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from 'core/reducers';
import { connectPlayerAction, playerVotesAction } from './player.actions';
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
import { selectVoteCollectionResult } from './player.selector';

const useProps = () => {
  const { nickname, room, story } = useSelector(
    (state: GlobalState) => state.sessionState
  );

  const playerStatus = useSelector(
    (state: GlobalState) => state.playerPodState.playerPlanningPokerState.status
  );

  const voteCollectionResult = useSelector(selectVoteCollectionResult);

  return { room, nickname, playerStatus, story, voteCollectionResult };
};

const useHandlers = () => {
  const dispatch = useDispatch();

  return {
    dispatch,
  };
};

export const PlayerContainer = () => {
  const { room, playerStatus, story, voteCollectionResult } = useProps();
  const { dispatch } = useHandlers();

  const authContext = React.useContext(AuthContext);
  const socketContext = React.useContext(SocketContext);

  // TODO: type this.
  const params = useParams();

  // Likely we could remove vote/setVote or move it to reducer
  // I think is not in use by children components
  const [vote, setVote] = React.useState('');

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
    dispatch(playerVotesAction(vote));
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
