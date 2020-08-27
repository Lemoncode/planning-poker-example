import * as React from 'react';
import * as classes from './master.component.styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { appBaseUrl } from 'core';
import {
  DefineStoryComponent,
  PlayersConnectedComponent,
  VotingInProgress,
  ShowVotingResults,
} from './components';
import { Player, MasterStatus, VoteResult } from './master.vm';
import { VoteOptionsComponent } from 'common-app/components';
import { Divider } from '@material-ui/core';
import { button } from 'pods/create-session/create-session.styles';

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

  function showComponentBasedOnMasterStatus(status: MasterStatus) {
    switch (status) {
      case MasterStatus.INITIALIZING:
        return null;
      case MasterStatus.CREATING_STORY:
        return <DefineStoryComponent onSubmit={onSetStoryTitle} />;
      case MasterStatus.VOTING_IN_PROGRESS:
        return (
          <VotingInProgress
            masterVoted={masterVoted}
            onFinishVoting={onFinishVoting}
            onMasterVoteChosen={onMasterVoteChosen}
            title={title}
          />
        );
      case MasterStatus.SHOWING_RESULTS:
        return (
          <ShowVotingResults
            onMoveToNextStory={onMoveToNextStory}
            voteCollectionResult={voteCollectionResult}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className={classes.container}>
      <Divider variant="middle" />
      <Typography className={classes.subtitle} variant="subtitle1">
        Copy this link to the players that are going to join this poker planning
        session
      </Typography>
      <div className={classes.urlContainer}>
        <input type="text" value={`${appBaseUrl}/#/player/${room}`} disabled />
        <FileCopyIcon
          className={'copyIcon'}
          onClick={() => {
            navigator.clipboard.writeText(`${appBaseUrl}/#/player/${room}`);
          }}
        />
      </div>
    </div>
  );
};
