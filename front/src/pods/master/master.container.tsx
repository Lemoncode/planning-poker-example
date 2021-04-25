import * as React from 'react';
import { createSocket } from 'core';
import {
  AuthContext,
  SocketContext,
  SocketInputMessageTypes,
  SocketOuputMessageLiteral,
  SocketOuputMessageTypes,
  PlayerVotingStatus,
} from 'core';
import { useParams } from 'react-router-dom';
import { MasterComponent } from './master.component';
import { MasterStatus, VoteResult } from './master.vm';
import { AddNewPlayer, userVoted } from './master.business';
import { useScreenReaderSnackbarContext } from 'common';

const usePlayerCollection = () => {
  const [playerCollection, setPlayerCollection] = React.useState<
    PlayerVotingStatus[]
  >([]);
  const playerCollectionRef = React.useRef<PlayerVotingStatus[]>([]);

  const updatePlayerCollection = (
    newPlayerCollection: PlayerVotingStatus[]
  ) => {
    setPlayerCollection(newPlayerCollection);
    playerCollectionRef.current = newPlayerCollection;
  };

  const setPlayerCollectionVoteResult = (
    votesResultCollection: VoteResult[]
  ) => {
    const playerCollectionUpdated = playerCollectionRef.current.map(player => {
      const voteResult = votesResultCollection.find(
        voteResult => voteResult.nickname === player.nickname
      );
      const voted = voteResult.vote !== '' ? true : false;
      return voteResult
        ? {
            ...player,
            voted,
            vote: voteResult.vote,
          }
        : player;
    });

    updatePlayerCollection(playerCollectionUpdated);
  };

  const resetVotedInfoOnEveryPlayer = () => {
    const wipedVotedPlayerCollection = playerCollectionRef.current.map(
      item => ({ ...item, voted: false, vote: '' })
    );
    updatePlayerCollection(wipedVotedPlayerCollection);
  };

  return {
    playerCollection,
    playerCollectionRef,
    updatePlayerCollection,
    resetVotedInfoOnEveryPlayer,
    setPlayerCollectionVoteResult,
  };
};

export const MasterContainer = () => {
  const socketContext = React.useContext(SocketContext);
  const authContext = React.useContext(AuthContext);
  const params = useParams(); // TODO: Type this
  const [room, setRoom] = React.useState('');
  const [masterStatus, setMasterStatus] = React.useState<MasterStatus>(
    MasterStatus.INITIALIZING
  );
  const [masterVoted, setMasterVoted] = React.useState(false);
  const [storyTitle, setStoryTitle] = React.useState('');
  const {
    playerCollection,
    playerCollectionRef,
    updatePlayerCollection,
    resetVotedInfoOnEveryPlayer,
    setPlayerCollectionVoteResult,
  } = usePlayerCollection();
  const { showScreenReaderMessage } = useScreenReaderSnackbarContext();

  React.useEffect(() => {
    // TODO: Error handling
    // Connect to the socket
    const nickname = authContext.nickname;
    const room = params['room'];
    const socket = createSocket({
      user: nickname,
      room,
      isMaster: true,
    });
    socketContext.setSocket(socket);

    setRoom(room);

    // Set Master as first player in the room
    updatePlayerCollection([{ nickname, voted: false, vote: '' }]);

    setMasterStatus(MasterStatus.CREATING_STORY);

    socket.on(SocketOuputMessageLiteral.MESSAGE, msg => {
      if (msg.type) {
        const { type, payload } = msg;

        switch (type) {
          case SocketInputMessageTypes.CONNECTION_ESTABLISHED_PLAYER:
            const newPlayerCollection = AddNewPlayer(
              playerCollectionRef.current,
              payload
            );
            showScreenReaderMessage(
              `El usuario ${payload} se ha conectado`,
              1500
            );
            updatePlayerCollection(newPlayerCollection);
            break;
          case SocketInputMessageTypes.NOTIFY_USER_VOTED:
            const updatedPlayerList = userVoted(
              playerCollectionRef.current,
              payload
            );
            showScreenReaderMessage(`El usuario ${payload} ha votado`, 1500);
            updatePlayerCollection(updatedPlayerList);
            break;
          case SocketInputMessageTypes.SHOW_VOTING_RESULTS:
            // refactor this to a map
            const playerVoteResults = msg.payload.map(voteResult => ({
              ...voteResult,
              voted: !!voteResult.vote,
            }));
            // ***
            setPlayerCollectionVoteResult(playerVoteResults);
            setMasterStatus(MasterStatus.SHOWING_RESULTS);
            break;
          case SocketInputMessageTypes.USER_DISCONNECTED:
            showScreenReaderMessage(
              `El usuario ${payload} se ha desconectado`,
              1500
            );
            //TODO Refresh list of users in master room
            updatePlayerCollection(
              playerCollectionRef.current.filter(p => p.nickname !== payload)
            );
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
    setMasterStatus(MasterStatus.VOTING_IN_PROGRESS);
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
    setMasterStatus(MasterStatus.SHOWING_RESULTS);
    socketContext.socket.emit(SocketOuputMessageLiteral.MESSAGE, {
      type: SocketOuputMessageTypes.END_VOTE_TIME,
      payload: null,
    });
  };

  const handleMoveToNextStory = () => {
    // Reset values, extract this, to business or hook
    setStoryTitle('');
    resetVotedInfoOnEveryPlayer();

    setMasterStatus(MasterStatus.CREATING_STORY);
  };

  return (
    <MasterComponent
      room={room}
      playerVotingStatus={playerCollection}
      onSetStoryTitle={handleSetStoryTitle}
      masterStatus={masterStatus}
      onFinishVoting={handleFinishVoting}
      onMoveToNextStory={handleMoveToNextStory}
      onMasterVoteChosen={handleMasterVoteChosen}
      masterVoted={masterVoted}
      title={storyTitle}
    />
  );
};
