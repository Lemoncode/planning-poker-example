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

const usePlayerCollection = () => {
  const [playerCollection, setPlayerCollection] = React.useState<Player[]>([]);
  const playerCollectionRef = React.useRef<Player[]>([]);

  const updatePlayerCollection = (newPlayerCollection: Player[]) => {
    setPlayerCollection(newPlayerCollection);
    playerCollectionRef.current = newPlayerCollection;
  };

  const resetVotedFlagOnEveryPlayer = () => {
    const wipedVotedPlayerCollection = playerCollectionRef.current.map(
      item => ({ ...item, voted: false })
    );
    updatePlayerCollection(wipedVotedPlayerCollection);
  };

  return {
    playerCollection,
    playerCollectionRef,
    updatePlayerCollection,
    resetVotedFlagOnEveryPlayer,
  };
};

const useVoteCollectionResult = () => {
  const [voteCollectionResult, setVoteCollectionResult] = React.useState<
    VoteResult[]
  >([]);

  const resetValueOnVoteCollection = () => {
    const wipedVoteCollection = voteCollectionResult.map(item => ({
      ...item,
      vote: '',
    }));
    setVoteCollectionResult(wipedVoteCollection);
  };

  return {
    voteCollectionResult,
    setVoteCollectionResult,
    resetValueOnVoteCollection,
  };
};

export const MasterContainer = () => {
  const socketContext = React.useContext(SocketContext);
  const authContext = React.useContext(AuthContext);
  const params = useParams(); // TODO: Type this
  const [room, setRoom] = React.useState('');
  const {
    voteCollectionResult,
    setVoteCollectionResult,
    resetValueOnVoteCollection,
  } = useVoteCollectionResult();
  const [masterStatus, SetMasterStatus] = React.useState<MasterStatus>(
    MasterStatus.INITIALIZING
  );
  const [masterVoted, setMasterVoted] = React.useState(false);
  const [storyTitle, setStoryTitle] = React.useState('');
  const {
    playerCollection,
    playerCollectionRef,
    updatePlayerCollection,
    resetVotedFlagOnEveryPlayer,
  } = usePlayerCollection();
  const nickname = useSelector(
    (state: GlobalState) => state.profileState.nickname
  );

  React.useEffect(() => {
    // TODO: Error handling
    // Connect to the socket
    //const nickname = authContext.nickname;
    const room = params['room'];
    const socket = createSocket({
      user: nickname,
      room,
      isMaster: true,
    });
    socketContext.setSocket(socket);

    setRoom(room);
    SetMasterStatus(MasterStatus.CREATING_STORY);

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
  }, []);

  const handleSetStoryTitle = (title: string) => {
    setMasterVoted(false);
    setStoryTitle(title);
    SetMasterStatus(MasterStatus.VOTING_IN_PROGRESS);
    socketContext.socket.emit(SocketOuputMessageLiteral.MESSAGE, {
      type: SocketOuputMessageTypes.CREATE_STORY,
      payload: title,
    });
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
    socketContext.socket.emit(SocketOuputMessageLiteral.MESSAGE, {
      type: SocketOuputMessageTypes.END_VOTE_TIME,
      payload: null,
    });
  };

  const handleMoveToNextStory = () => {
    // Reset values, extract this, to business or hook
    setStoryTitle('');
    resetValueOnVoteCollection();
    resetVotedFlagOnEveryPlayer();

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
