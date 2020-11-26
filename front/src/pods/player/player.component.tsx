import * as React from 'react';
import { cx } from 'emotion';
import Typography from '@material-ui/core/Typography';
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
  nickname: string;
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
    nickname,
  } = props;

  function showComponentBasedonPlayerStatus(status: PlayerStatus) {
    switch (status) {
      case PlayerStatus.CONNECTED:
        return (
          <ConnectComponent
            playerStatus={status}
            room={room}
            onConnect={onConnect}
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
            nickname={nickname}
          />
        );

      case PlayerStatus.SHOW_RESULTS:
        return (
          <ShowVotingResultsComponent
            title={story}
            voteCollectionResult={voteCollectionResult}
            nickname={nickname}
          />
        );
      default:
        return null;
    }
  }

  return <>{showComponentBasedonPlayerStatus(playerStatus)}</>;
};

interface VotingInProgressProps {
  title: string;
  onPlayerVoteChosen: (vote: string) => void;
  playerVoted: boolean;
  nickname: string;
}

const VotingInProgressComponent: React.FC<VotingInProgressProps> = props => {
  const { title, onPlayerVoteChosen, playerVoted, nickname } = props;

  return (
    <div className={classes.container}>
      <div className={classes.leftContainer}>
        <div className={classes.containerComponent}>
          {title ? (
            <Typography
              variant="h3"
              component="h2"
              className={classes.subtitle}
            >
              Hello <b>{nickname}</b>, this is the Story:
            </Typography>
          ) : null}
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
  nickname: string;
}

const ShowVotingResultsComponent: React.FC<ShowVotingResultsProps> = props => {
  const { voteCollectionResult, title, nickname } = props;
  return (
    <div className={classes.container}>
      <div className={classes.leftContainer}>
        <div className={classes.containerComponent}>
          {title ? (
            <Typography
              variant="h3"
              component="h2"
              className={classes.subtitle}
            >
              Hello <b>{nickname}</b>, this is the Story:
            </Typography>
          ) : null}
          {title ? <p className={classes.story}>{title}</p> : null}
        </div>
      </div>
      <div className={classes.rightContainer}>
        <div className={classes.containerComponent}>
          <h2 className={classes.title}>Show voting results</h2>
        </div>
        <div className={classes.containerComponent}>
          <TablePlayerComponent
            playersCollection={voteCollectionResult}
            headingLevel="h3"
          />
        </div>
        <div className={classes.containerComponent}>
          <h2 className={classes.title}>Wait for next story</h2>
        </div>
      </div>
    </div>
  );
};
