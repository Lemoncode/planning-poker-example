import * as React from 'react';
import { cx } from 'emotion';
import * as classes from './master.component.styles';
import { appBaseUrl } from 'core';
import { MasterStatus } from './master.vm';
import { TablePlayerComponent } from 'common-app/components';
import { CopySessionLinkComponent } from './components/copy-session-link.component';
import { DefineStoryComponent } from './components';
import { VoteOptionsComponent } from 'common-app/components';
import { PlayersContext, PlayerEntity } from 'core';
import { Button } from '@material-ui/core';

interface Props {
  room: string;
  onSetStoryTitle: (title: string) => void;
  masterStatus: MasterStatus;
  onFinishVoting: () => void;
  onMoveToNextStory: () => void;
  onMasterVoteChosen: (vote: string) => void;
  title: string;
}

export const MasterComponent: React.FC<Props> = props => {
  const {
    room,
    onSetStoryTitle,
    masterStatus,
    onFinishVoting,
    onMoveToNextStory,
    onMasterVoteChosen,
    title,
  } = props;

  const showComponentBasedOnMasterStatus = (status: MasterStatus) => {
    switch (status) {
      case MasterStatus.INITIALIZING:
        return null;
      case MasterStatus.CREATING_STORY:
        return (
          <CreatingStoryComponent
            onSetStoryTitle={onSetStoryTitle}
            room={room}
          />
        );

      case MasterStatus.VOTING_IN_PROGRESS:
        return (
          <VotingInProgressComponent
            onFinishVoting={onFinishVoting}
            masterVoted={false}
            onMasterVoteChosen={onMasterVoteChosen}
            title={title}
          />
        );

      case MasterStatus.SHOWING_RESULTS:
        return (
          <ShowVotingResultsComponent
            onMoveToNextStory={onMoveToNextStory}
            title={title}
          />
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

interface CreatingStoryProps {
  onSetStoryTitle: (title: string) => void;
  room: string;
}

const CreatingStoryComponent: React.FC<CreatingStoryProps> = props => {
  const { onSetStoryTitle, room } = props;
  return (
    <>
      <div className={cx(classes.containerComponent, classes.leftContainer2)}>
        <DefineStoryComponent onSubmit={onSetStoryTitle} />
      </div>
      <div className={cx(classes.containerComponent, classes.rightContainer)}>
        {room ? <TablePlayerComponent /> : null}
      </div>
    </>
  );
};

interface VotingInProgressProps {
  title: string;
  onMasterVoteChosen: (vote: string) => void;
  masterVoted: boolean;
  onFinishVoting: () => void;
}

const VotingInProgressComponent: React.FC<VotingInProgressProps> = props => {
  const { title, onMasterVoteChosen, masterVoted, onFinishVoting } = props;

  return (
    <>
      <div className={cx(classes.containerComponent, classes.leftContainer3)}>
        <TablePlayerComponent />
      </div>
      <div className={classes.leftContainer2}>
        <div className={classes.containerComponent}>
          {title ? <h3 className={classes.subtitle}>Story:</h3> : null}
          {title ? <p className={classes.story}>{title}</p> : null}
        </div>
      </div>
      <div className={cx(classes.containerComponent, classes.rightContainer)}>
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
  title: string;
}

const ShowVotingResultsComponent: React.FC<ShowVotingResultsProps> = props => {
  const { onMoveToNextStory, title } = props;
  return (
    <>
      <div className={classes.leftContainer2}>
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
          <TablePlayerComponent />
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
};
