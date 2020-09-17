import * as React from 'react';
import { createDefaultPlayerEntity, createSocket } from 'core';
import {
  AuthContext,
  SocketContext,
  SocketInputMessageTypes,
  SocketOuputMessageLiteral,
  SocketOuputMessageTypes,
  PlayerEntity,
  PlayersContext,
  mapFromApiToVm,
} from 'core';
import { useParams } from 'react-router-dom';
import { MasterComponent } from './master.component';
import { MasterStatus } from './master.vm';

export const usePlayerEntity = () => {
  const [room, setRoom] = React.useState<string>('');
  const [vote, setVote] = React.useState<string>('');
  const [voted, setVoted] = React.useState<boolean>(false);
  const [nickname, setNickname] = React.useState<string>('');
  const [isMaster, setIsMaster] = React.useState<boolean>(false);
  const playerRef = React.useRef<PlayerEntity>(createDefaultPlayerEntity());
  const playersContext = React.useContext(PlayersContext);

  React.useEffect(() => {
    const dataPlayer: PlayerEntity = { nickname, room, isMaster, voted, vote };
    updatePlayersCollection(dataPlayer);
  }, [nickname, room, vote, voted, isMaster]);

  const updatePlayersCollection = (player: PlayerEntity) => {
    playersContext.players.map(playerContext =>
      playerContext.nickname === player.nickname
        ? { ...playerContext, ...player }
        : playersContext.setPlayers([...playersContext.players, player])
    );
  };

  const resetVotedOnEveryPlayer = () => {
    const wipedVotedPlayerCollection = playersContext.players.map(item => ({
      ...item,
      voted: false,
      vote: '',
    }));
    playersContext.setPlayers(wipedVotedPlayerCollection);
  };

  return {
    playerRef,
    setNickname,
    setIsMaster,
    room,
    setRoom,
    voted,
    setVoted,
    setVote,
    resetVotedOnEveryPlayer,
    playersContext,
  };
};

export const MasterContainer = () => {
  const socketContext = React.useContext(SocketContext);
  const authContext = React.useContext(AuthContext);
  const params = useParams(); // TODO: Type this
  const {
    playerRef,
    setNickname,
    setIsMaster,
    room,
    setRoom,
    voted,
    setVoted,
    setVote,
    resetVotedOnEveryPlayer,
    playersContext,
  } = usePlayerEntity();

  const [masterStatus, SetMasterStatus] = React.useState<MasterStatus>(
    MasterStatus.INITIALIZING
  );

  const [storyTitle, setStoryTitle] = React.useState('');

  React.useEffect(() => {
    // TODO: Error handling
    // Connect to the socket
    setNickname(authContext.nickname);
    setRoom(params['room']);
    setIsMaster(true);

    const socket = createSocket(playerRef);
    socketContext.setSocket(socket);

    SetMasterStatus(MasterStatus.CREATING_STORY);

    socket.on(SocketOuputMessageLiteral.MESSAGE, msg => {
      console.log(msg);

      if (msg.type) {
        const { type, payload } = msg;

        switch (type) {
          case SocketInputMessageTypes.CONNECTION_ESTABLISHED_PLAYER:
            setNickname(payload);
            console.log(`connection-established ${payload}`);
            break;
          case SocketInputMessageTypes.NOTIFY_USER_VOTED:
            setNickname(payload);
            setVoted(voted);
            console.log(`notify-user ${payload}`);
            break;
          case SocketInputMessageTypes.SHOW_VOTING_RESULTS:
            setNickname(payload.nickname);
            setVote(payload.vote);

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
    setStoryTitle(title);
    SetMasterStatus(MasterStatus.VOTING_IN_PROGRESS);
    socketContext.socket.emit(SocketOuputMessageLiteral.MESSAGE, {
      type: SocketOuputMessageTypes.CREATE_STORY,
      payload: title,
    });
  };

  const handleMasterVoteChosen = (vote: string) => {
    setVoted(true);
    setVote(vote);

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
    resetVotedOnEveryPlayer();

    SetMasterStatus(MasterStatus.CREATING_STORY);
  };

  return (
    <MasterComponent
      room={room}
      onSetStoryTitle={handleSetStoryTitle}
      masterStatus={masterStatus}
      onFinishVoting={handleFinishVoting}
      onMoveToNextStory={handleMoveToNextStory}
      onMasterVoteChosen={handleMasterVoteChosen}
      title={storyTitle}
    />
  );
};
