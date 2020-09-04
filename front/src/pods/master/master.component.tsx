import * as React from 'react';
import { cx } from 'emotion';
import * as classes from './master.component.styles';
import { appBaseUrl } from 'core';
import { Player, MasterStatus, VoteResult } from './master.vm';
import { TablePlayerComponent } from 'common-app/components';
import { CopySessionLinkComponent } from './components/copy-session-link.component';
import { DefineStoryComponent } from './components';
import { VoteOptionsComponent } from 'common-app/components';
import { PlayerVotingStatus } from 'core';
import { Button } from '@material-ui/core';

interface Props {
  room: string;
  playerCollection: Player[];
  onSetStoryTitle: (title: string) => void;
  masterStatus: MasterStatus;
  onFinishVoting: () => void;
  onMoveToNextStory: () => void;
  onMasterVoteChosen: (vote: string) => void;
  masterVoted: boolean;
  voteCollectionResult: VoteResult[];
  title: string;
}

export const MasterComponent: React.FC<Props> = props => {
  const [playerVotingStatus, setPlayerVotingStatus] = React.useState<
    PlayerVotingStatus[]
  >([]);

  const {
    room,
    playerCollection,
    onSetStoryTitle,
    masterStatus,
    onFinishVoting,
    onMoveToNextStory,
    onMasterVoteChosen,
    masterVoted,
    voteCollectionResult,
    title,
  } = props;

  React.useEffect(() => {
    const statusCollection: PlayerVotingStatus[] = playerCollection.map(
      player => {
        const playerVoteItem = voteCollectionResult.find(
          v => v.nickname === player.nickname
        );

        return {
          ...player,
          vote: playerVoteItem ? playerVoteItem.vote : '',
        };
      }
    );

    setPlayerVotingStatus(statusCollection);
  }, [playerCollection, voteCollectionResult]);

  const buttonFinishVoting: JSX.Element = (
    <Button
      variant="contained"
      color="secondary"
      onClick={e => onFinishVoting()}
      className={'button'}
    >
      Finish Voting
    </Button>
  );

  const showComponentBasedOnMasterStatus = (status: MasterStatus) => {
    switch (status) {
      case MasterStatus.INITIALIZING:
        return null;
      case MasterStatus.CREATING_STORY:
        return (
          <>
            <div
              className={cx(classes.containerComponent, classes.leftContainer2)}
            >
              <DefineStoryComponent onSubmit={onSetStoryTitle} />
            </div>
            <div
              className={cx(classes.containerComponent, classes.rightContainer)}
            >
              {room ? (
                <TablePlayerComponent playersCollection={playerVotingStatus} />
              ) : null}
            </div>
          </>
        );
      case MasterStatus.VOTING_IN_PROGRESS:
        return (
          <>
            <div
              className={cx(classes.containerComponent, classes.leftContainer3)}
            >
              <TablePlayerComponent playersCollection={playerVotingStatus} />
            </div>
            <div className={classes.leftContainer2}>
              <div className={classes.containerComponent}>
                {title ? <h3 className={classes.subtitle}>Story:</h3> : null}
                {title ? <p className={classes.story}>{title}</p> : null}
              </div>
            </div>
            <div
              className={cx(classes.containerComponent, classes.rightContainer)}
            >
              <VoteOptionsComponent
                buttonFinishVoting={buttonFinishVoting}
                onVoteChosen={onMasterVoteChosen}
                votedStatus={masterVoted}
              />
            </div>
          </>
        );
      case MasterStatus.SHOWING_RESULTS:
        return (
          <>
            <div className={classes.rightContainer}>
              <div className={classes.containerComponent}>
                <h2 className={classes.title}>Show voting results</h2>
              </div>
              <div className={classes.containerComponent}>
                <TablePlayerComponent playersCollection={playerVotingStatus} />
              </div>
              <div className={classes.containerComponent}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onMoveToNextStory}
                  className={classes.button}
                >
                  Move to next story
                </Button>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div className={cx(classes.containerComponent, classes.leftContainer)}>
          <CopySessionLinkComponent url={`${appBaseUrl}/#/player/${room}`} />
        </div>

        {showComponentBasedOnMasterStatus(masterStatus)}
      </div>
    </>
  );
};
