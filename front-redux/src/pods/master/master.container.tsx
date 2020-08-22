import * as React from 'react';
import { MasterComponent } from './master.component';
import { Player, VoteResult } from './master.vm';
import { MasterStatus } from './master.const';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from 'core/reducers';
import { selectVoteCollectionResult } from './master.selectors';
import {
  ConnectMasterAction,
  SendCreateStoryMessageToServerAction,
  voteTimeIsOverAction,
  masterVotesAction,
  masterVotedAction,
} from './master.actions';
import {
  setStoryTitle,
  cleanupBeforeMovingToNextStoryAction,
} from 'core/actions';

const useProps = () => {
  const { nickname, isMaster, room, story: storyTitle } = useSelector(
    (state: GlobalState) => state.sessionState
  );

  // TODO We should two selectors map to VM and VotedCollection should
  // not have vote field (or refactor needed)
  const playerCollection = useSelector(
    (state: GlobalState) => state.playerCollectionState
  );
  const voteCollectionResult = useSelector(selectVoteCollectionResult);

  // TODO: move this to reselect, build short cuts
  const { status: masterStatus, masterVoted } = useSelector(
    (state: GlobalState) => state.masterPodState.masterPlanningPokerState
  );

  return {
    nickname,
    room,
    isMaster,
    playerCollection,
    voteCollectionResult,
    masterStatus,
    masterVoted,
    storyTitle,
  };
};

const useHandlers = () => {
  const dispatch = useDispatch();

  const handleSetStoryTitle = (title: string) => {
    dispatch(setStoryTitle(title));
    dispatch(SendCreateStoryMessageToServerAction(title));
  };

  const handleMasterVoteChosen = (vote: string) => {
    // Unify?
    dispatch(masterVotedAction());
    dispatch(masterVotesAction(vote));
  };

  const handleFinishVoting = () => {
    dispatch(voteTimeIsOverAction());
  };

  const handleMoveToNextStory = () => {
    dispatch(cleanupBeforeMovingToNextStoryAction());
  };

  return {
    dispatch,
    handleSetStoryTitle,
    handleMasterVoteChosen,
    handleFinishVoting,
    handleMoveToNextStory,
  };
};

export const MasterContainer = () => {
  const {
    nickname,
    room,
    isMaster,
    playerCollection,
    voteCollectionResult,
    masterStatus,
    masterVoted,
    storyTitle,
  } = useProps();

  const {
    dispatch,
    handleSetStoryTitle,
    handleMasterVoteChosen,
    handleFinishVoting,
    handleMoveToNextStory,
  } = useHandlers();

  React.useEffect(() => {
    dispatch(
      ConnectMasterAction({
        user: nickname,
        isMaster: isMaster,
        room: room,
      })
    );
  }, []);

  return (
    <MasterComponent
      room={room}
      playerCollection={playerCollection}
      onSetStoryTitle={handleSetStoryTitle}
      masterStatus={masterStatus}
      onFinishVoting={handleFinishVoting}
      onMoveToNextStory={handleMoveToNextStory}
      onMasterVoteChosen={handleMasterVoteChosen}
      masterVoted={masterVoted}
      voteCollectionResult={voteCollectionResult}
      title={storyTitle}
    />
  );
};
