import * as React from 'react';
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

  const showComponentBasedOnMasterStatus = (status: MasterStatus) => {
    switch (status) {
      case MasterStatus.INITIALIZING:
        return null;
      case MasterStatus.CREATING_STORY:
        return (
          <CreatingStoryComponent
            onSetStoryTitle={onSetStoryTitle}
            playerVotingStatus={playerVotingStatus}
            room={room}
          />
        );

      case MasterStatus.VOTING_IN_PROGRESS:
        return (
          <VotingInProgressComponent
            onFinishVoting={onFinishVoting}
            masterVoted={masterVoted}
            onMasterVoteChosen={onMasterVoteChosen}
            playerVotingStatus={playerVotingStatus}
            title={title}
          />
        );

      case MasterStatus.SHOWING_RESULTS:
        return (
          <ShowVotingResultsComponent
            onMoveToNextStory={onMoveToNextStory}
            playerVotingStatus={playerVotingStatus}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div className={'container-component left-container'}>
          <CopySessionLinkComponent url={`${appBaseUrl}/#/player/${room}`} />
        </div>

        {showComponentBasedOnMasterStatus(masterStatus)}
      </div>
    </>
  );
};

interface CreatingStoryProps {
  onSetStoryTitle: (title: string) => void;
  playerVotingStatus: PlayerVotingStatus[];
  room: string;
}

const CreatingStoryComponent: React.FC<CreatingStoryProps> = props => {
  const { onSetStoryTitle, playerVotingStatus, room } = props;
  return (
    <>
      <div className={'container-component left-container2'}>
        <DefineStoryComponent onSubmit={onSetStoryTitle} />
      </div>
      <div className={'container-component right-container'}>
        {room ? (
          <TablePlayerComponent playersCollection={playerVotingStatus} />
        ) : null}
      </div>
    </>
  );
};

interface VotingInProgressProps {
  playerVotingStatus: PlayerVotingStatus[];
  title: string;
  onMasterVoteChosen: (vote: string) => void;
  masterVoted: boolean;
  onFinishVoting: () => void;
}

const VotingInProgressComponent: React.FC<VotingInProgressProps> = props => {
  const {
    playerVotingStatus,
    title,
    onMasterVoteChosen,
    masterVoted,
    onFinishVoting,
  } = props;

  return (
    <>
      <div className={'container-component left-container3'}>
        <TablePlayerComponent playersCollection={playerVotingStatus} />
      </div>
      <div className={'left-container2'}>
        <div className={'container-component'}>
          {title ? <h3 className={'subtitle'}>Story:</h3> : null}
          {title ? <p className={'story'}>{title}</p> : null}
        </div>
      </div>
      <div className={'container-component right-container'}>
        <VoteOptionsComponent
          onVoteChosen={onMasterVoteChosen}
          votedStatus={masterVoted}
        />
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="secondary"
            onClick={e => onFinishVoting()}
            className={classes.finshButton}
          >
            Finish Voting
          </Button>
        </div>
      </div>
    </>
  );
};

interface ShowVotingResultsProps {
  onMoveToNextStory: () => void;
  playerVotingStatus: PlayerVotingStatus[];
}

const ShowVotingResultsComponent: React.FC<ShowVotingResultsProps> = props => {
  const { onMoveToNextStory, playerVotingStatus } = props;
  return (
    <>
      <div className={'right-container'}>
        <div className={'container-component'}>
          <h2 className={'title'}>Show voting results</h2>
        </div>
        <div className={'container-component'}>
          <TablePlayerComponent playersCollection={playerVotingStatus} />
        </div>
        <div className={'container-component'}>
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
};
