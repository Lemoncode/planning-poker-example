import * as React from 'react';
import { cx } from 'emotion';
import * as classes from './player.component.styles';
import { TablePlayerComponent } from 'common-app/components';
import { PlayerStatus } from './player.vm';
import { PlayerVotingStatus } from 'core';
import { ConnectComponent, WaitComponent } from './components';

import { VoteOptionsComponent } from 'common-app/components/vote-options.component';

interface Props {
  room: string;
  onConnect: (nickname: string) => void;
  story: string;
  vote: string;
  voted: boolean;
  onVoteChosen: (vote: string) => void;
  playerStatus: PlayerStatus;
  voteCollectionResult: PlayerVotingStatus[];
  title: string;
  showAlert: boolean;
  setShowAlert: (e: boolean) => void;
}

export const PlayerComponent: React.FC<Props> = props => {
  const {
    room,
    onConnect,
    story,
    voted,
    onVoteChosen,
    playerStatus,
    voteCollectionResult,
    showAlert,
    setShowAlert,
  } = props;

  function showComponentBasedonPlayerStatus(status: PlayerStatus) {
    switch (status) {
      case PlayerStatus.CONNECTED:
        return (
          <ConnectComponent
            playerStatus={status}
            room={room}
            onConnect={onConnect}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
          />
        );
      case PlayerStatus.WAITING_FOR_STORY:
        return <WaitComponent />;
      case PlayerStatus.VOTING_IN_PROGRESS:
        {
          /* TODO: Temporary workaround til player is completed*/
        }
        return (
          <VotingInProgressComponent
            onPlayerVoteChosen={onVoteChosen}
            playerVoted={voted}
            title={story}
            voteCollectionResult={voteCollectionResult}
          />
        );

      case PlayerStatus.SHOW_RESULTS:
        return (
          <ShowVotingResultsComponent
            title={story}
            voteCollectionResult={voteCollectionResult}
          />
        );
      default:
        return null;
    }
  }

  return <>{showComponentBasedonPlayerStatus(playerStatus)}</>;
};

interface VotingInProgressProps {
  voteCollectionResult: PlayerVotingStatus[];
  title: string;
  onPlayerVoteChosen: (vote: string) => void;
  playerVoted: boolean;
}

const VotingInProgressComponent: React.FC<VotingInProgressProps> = props => {
  const {
    voteCollectionResult,
    title,
    onPlayerVoteChosen,
    playerVoted,
  } = props;

  return (
    <div className={classes.container}>
      <div className={cx(classes.containerComponent, classes.leftContainer2)}>
        <TablePlayerComponent playersCollection={voteCollectionResult} />
      </div>
      <div className={classes.leftContainer}>
        <div className={classes.containerComponent}>
          {title ? <h3 className={classes.subtitle}>Story:</h3> : null}
          {title ? <p className={classes.story}>{title}</p> : null}
        </div>
      </div>
      <div className={cx(classes.containerComponent, classes.rightContainer)}>
        <VoteOptionsComponent
          onVoteChosen={onPlayerVoteChosen}
          votedStatus={playerVoted}
        />
      </div>
    </div>
  );
};

interface ShowVotingResultsProps {
  voteCollectionResult: PlayerVotingStatus[];
  title: string;
}

const ShowVotingResultsComponent: React.FC<ShowVotingResultsProps> = props => {
  const { voteCollectionResult, title } = props;
  return (
    <div className={classes.container}>
      <div className={classes.leftContainer}>
        <div className={classes.containerComponent}>
          {title ? <h3 className={classes.subtitle}>Story:</h3> : null}
          {title ? <p className={classes.story}>{title}</p> : null}
        </div>
      </div>
      <div className={classes.rightContainer}>
        <div className={classes.containerComponent}>
          <h2 className={classes.title}>Show voting results</h2>
        </div>
        <div className={classes.containerComponent}>
          <TablePlayerComponent playersCollection={voteCollectionResult} />
        </div>
        <div className={classes.containerComponent}>
          <h2 className={classes.title}>Wait for next story</h2>
        </div>
      </div>
    </div>
  );
};
