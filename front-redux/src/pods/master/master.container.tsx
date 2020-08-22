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
} from './master.actions';
import {
  resetAllVotedFlagsAction,
  resetAllVotesValuesAction,
} from 'core/actions';

const useProps = () => {
  const nickname = useSelector(
    (state: GlobalState) => state.profileState.nickname
  );
  const profileInfo = useSelector((state: GlobalState) => state.profileState);
  const room = useSelector((state: GlobalState) => state.profileState.room);

  // TODO We should two selectors map to VM and VotedCollection should
  // not have vote field (or refactor needed)
  const playerCollection = useSelector(
    (state: GlobalState) => state.playerCollectionState
  );
  const voteCollectionResult = useSelector(selectVoteCollectionResult);

  // TODO: move this to reselect, build short cuts
  const masterStatus = useSelector(
    (state: GlobalState) => state.masterPodState.masterPlanningPokerState.status
  );

  return {
    nickname,
    profileInfo,
    room,
    playerCollection,
    voteCollectionResult,
    masterStatus,
  };
};

export const MasterContainer = () => {
  const {
    nickname,
    profileInfo,
    room,
    playerCollection,
    voteCollectionResult,
    masterStatus,
  } = useProps();

  const dispatch = useDispatch();

  // TODO: not sure if worth to move it to redux state
  const [masterVoted, setMasterVoted] = React.useState(false);
  const [storyTitle, setStoryTitle] = React.useState('');

  React.useEffect(() => {
    dispatch(
      ConnectMasterAction({
        user: profileInfo.nickname,
        isMaster: profileInfo.isMaster,
        room: profileInfo.room,
      })
    );
  }, []);

  const handleSetStoryTitle = (title: string) => {
    setMasterVoted(false);
    setStoryTitle(title);
    dispatch(SendCreateStoryMessageToServerAction(title));
  };

  const handleMasterVoteChosen = (vote: string) => {
    setMasterVoted(true);
    dispatch(masterVotesAction(vote));
  };

  const handleFinishVoting = () => {
    dispatch(voteTimeIsOverAction());
  };

  const handleMoveToNextStory = () => {
    // We could just have single action MOVE_TO_NEXT_STORY_CLEANUP
    // were all the affected reducers are listening and perform
    // this cleanup in one go
    // May we store story title in a reducer? on the current session
    // current story
    setStoryTitle('');
    dispatch(resetAllVotesValuesAction());
    dispatch(resetAllVotedFlagsAction());
  };

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
