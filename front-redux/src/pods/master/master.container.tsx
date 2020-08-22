import * as React from 'react';
import { createSocket } from 'core';
import {
  AuthContext,
  SocketContext,
  SocketInputMessageTypes,
  SocketOuputMessageLiteral,
  SocketOuputMessageTypes,
} from 'core';
import { useParams } from 'react-router-dom';
import { MasterComponent } from './master.component';
import { Player, MasterStatus, VoteResult } from './master.vm';
import { AddNewPlayer, userVoted } from './master.business';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from 'core/reducers';
import { selectVoteCollectionResult } from './master.selectors';
import {
  ConnectMasterAction,
  SendCreateStoryMessageToServerAction,
  voteTimeIsOverAction,
} from './master.actions';
import {
  resetAllVotedFlagsAction,
  resetAllVotesValuesAction,
} from 'core/actions';

export const MasterContainer = () => {
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
  const dispatch = useDispatch();

  const socketContext = React.useContext(SocketContext);
  const authContext = React.useContext(AuthContext);
  const params = useParams(); // TODO: Type this
  const [masterStatus, SetMasterStatus] = React.useState<MasterStatus>(
    MasterStatus.INITIALIZING
  );
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

    SetMasterStatus(MasterStatus.CREATING_STORY);

    /*
    socket.on(SocketOuputMessageLiteral.MESSAGE, msg => {
      console.log(msg);
      if (msg.type) {
        const { type, payload } = msg;

        switch (type) {
          case SocketInputMessageTypes.NOTIFY_USER_VOTED:
            const updatedPlayerList = userVoted(
              playerCollectionRef.current,
              payload
            );
            updatePlayerCollection(updatedPlayerList);
            break;
          case SocketInputMessageTypes.SHOW_VOTING_RESULTS:
            setVoteCollectionResult(msg.payload);
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
    */
  }, []);

  const handleSetStoryTitle = (title: string) => {
    setMasterVoted(false);
    setStoryTitle(title);
    dispatch(SendCreateStoryMessageToServerAction(title));

    SetMasterStatus(MasterStatus.VOTING_IN_PROGRESS);
  };

  const handleMasterVoteChosen = (vote: string) => {
    setMasterVoted(true);
    // Send messsage to server informing about the vote
    socketContext.socket.emit(SocketOuputMessageLiteral.MESSAGE, {
      type: SocketOuputMessageTypes.USER_VOTED,
      payload: vote,
    });
  };

  const handleFinishVoting = () => {
    console.log('finished voting...');
    SetMasterStatus(MasterStatus.SHOWING_RESULTS);
    dispatch(voteTimeIsOverAction());
  };

  const handleMoveToNextStory = () => {
    // Reset values, extract this, to business or hook
    setStoryTitle('');
    dispatch(resetAllVotesValuesAction());
    dispatch(resetAllVotedFlagsAction());

    SetMasterStatus(MasterStatus.CREATING_STORY);
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
