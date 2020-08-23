import * as React from 'react';
import { PlayerComponent } from './player.component';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from 'core/reducers';
import {
  connectPlayerAction,
  playerVotesAction,
  hideNickNameInUseNotification,
} from './player.actions';
import { setProfileInfo } from 'core/actions';
import { selectVoteCollectionResult } from './player.selector';

const useProps = () => {
  const { nickname, room, story } = useSelector(
    (state: GlobalState) => state.sessionState
  );

  const { status: playerStatus, nicknameInUse } = useSelector(
    (state: GlobalState) => state.playerPodState.playerPlanningPokerState
  );

  const voteCollectionResult = useSelector(selectVoteCollectionResult);

  return {
    room,
    nickname,
    playerStatus,
    nicknameInUse,
    story,
    voteCollectionResult,
  };
};

const useHandlers = () => {
  const dispatch = useDispatch();
  // TODO: type this.
  const params = useParams();

  const handleConnect = nickname => {
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
  };

  const handleVoteChosen = (vote: string) => {
    dispatch(playerVotesAction(vote));
  };

  return {
    dispatch,
    handleConnect,
    handleVoteChosen,
  };
};

export const PlayerContainer = () => {
  const {
    room,
    playerStatus,
    story,
    voteCollectionResult,
    nicknameInUse,
  } = useProps();
  const { dispatch, handleConnect, handleVoteChosen } = useHandlers();

  // TODO: remove this, just maintained to keep compatiblity with children component
  // on UI redesign is done remot it
  // Likely we could remove vote/setVote or move it to reducer
  // I think is not in use by children components
  const [vote, setVote] = React.useState('');

  React.useEffect(() => {
    if (nicknameInUse) {
      dispatch(hideNickNameInUseNotification());
      alert('nick name in use, try with another nick name');
    }
  }, [nicknameInUse]);

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
