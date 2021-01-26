import * as React from 'react';
import { cx } from 'emotion';
import Typography from '@material-ui/core/Typography';
import * as classes from './master.component.styles';
import { appBaseUrl } from 'core';
import { MasterStatus, VoteResult } from './master.vm';
import { TablePlayerComponent } from 'common-app/components';
import { CopySessionLinkComponent } from './components/copy-session-link.component';
import { DefineStoryComponent } from './components';
import { VoteOptionsComponent } from 'common-app/components';
import { PlayerVotingStatus } from 'core';
import { Button } from '@material-ui/core';

interface Props {
  room: string;
  playerVotingStatus: PlayerVotingStatus[];
  onSetStoryTitle: (title: string) => void;
  masterStatus: MasterStatus;
  onFinishVoting: () => void;
  onMoveToNextStory: () => void;
  onMasterVoteChosen: (vote: string) => void;
  masterVoted: boolean;
  title: string;
}

export const MasterComponent = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const elementoTextArea = React.useRef<HTMLDivElement>(null);
    const {
      room,
      playerVotingStatus,
      onSetStoryTitle,
      masterStatus,
      onFinishVoting,
      onMoveToNextStory,
      onMasterVoteChosen,
      masterVoted,
      title,
    } = props;
    React.useEffect(() => {
      console.log('Recibo en master component');
      console.log(ref);
    }, []);
    const showComponentBasedOnMasterStatus = ref => (status: MasterStatus) => {
      console.log('Envio a Creating Story Component');
      console.log(ref);
      switch (status) {
        case MasterStatus.INITIALIZING:
          return null;
        case MasterStatus.CREATING_STORY:
          return (
            <CreatingStoryComponent
              onSetStoryTitle={onSetStoryTitle}
              playerVotingStatus={playerVotingStatus}
              room={room}
              ref={ref}
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
          <div
            className={cx(classes.containerComponent, classes.leftContainer)}
          >
            <CopySessionLinkComponent url={`${appBaseUrl}#/player/${room}`} />
          </div>

          {showComponentBasedOnMasterStatus(ref)(masterStatus)}
        </div>
      </>
    );
  }
);

interface CreatingStoryProps {
  onSetStoryTitle: (title: string) => void;
  playerVotingStatus: PlayerVotingStatus[];
  room: string;
}

const CreatingStoryComponent = React.forwardRef<
  HTMLDivElement,
  CreatingStoryProps
>((props, ref) => {
  React.useEffect(() => {
    console.log('Recibo en Creating Story Component');
    console.log(ref);
  }, []);
  const { onSetStoryTitle, playerVotingStatus, room } = props;
  return (
    <>
      <div className={cx(classes.containerComponent, classes.leftContainer2)}>
        {' '}
        <DefineStoryComponent onSubmit={onSetStoryTitle} ref={ref} />
      </div>
      <div className={cx(classes.containerComponent, classes.rightContainer)}>
        {room ? (
          <TablePlayerComponent playersCollection={playerVotingStatus} />
        ) : null}
      </div>
    </>
  );
});

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
      <div className={cx(classes.containerComponent, classes.leftContainer3)}>
        <TablePlayerComponent playersCollection={playerVotingStatus} />
      </div>
      <div className={classes.leftContainer2}>
        <div className={classes.containerComponent}>
          {title ? (
            <Typography
              variant="h3"
              component="h2"
              className={classes.subtitle}
            >
              Story:
            </Typography>
          ) : null}
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
  playerVotingStatus: PlayerVotingStatus[];
  title: string;
}

const ShowVotingResultsComponent: React.FC<ShowVotingResultsProps> = props => {
  const { onMoveToNextStory, playerVotingStatus, title } = props;
  const refTabla = React.useRef<HTMLTableElement>(null);

  React.useEffect(() => {
    if (refTabla != null) {
      refTabla.current.focus();
    }
  }, []);

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
          <TablePlayerComponent
            playersCollection={playerVotingStatus}
            ref={refTabla}
          />
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
