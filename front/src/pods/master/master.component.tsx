import * as React from 'react';
import * as classes from './master.component.styles';
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { appBaseUrl } from 'core';
import {
  DefineStoryComponent,
  VotingInProgress,
  ShowVotingResults,
} from './components';
import { Player, MasterStatus, VoteResult } from './master.vm';
import { VoteOptionsComponent } from '../vote-options/vote-options.component';
import { Divider } from '@material-ui/core';
import { TablePlayerComponent } from 'pods/table-player/table-player.component';

interface Props {
  room: string;
  setRoom: (room: string) => void;
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
    setRoom,
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
        setRoom('');
        return (
          <VotingInProgress
            masterVoted={masterVoted}
            onFinishVoting={onFinishVoting}
            onMasterVoteChosen={onMasterVoteChosen}
            title={title}
            playerCollection={playerCollection}
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
    <>
      <div className={classes.container}>
        <div className={'left-container'}>
          <div className={classes.urlContainer}>
            <Typography className={'subtitle'} variant="subtitle1">
              Copy this link to the players that are going to join this poker
              planning session
            </Typography>
            <div className={'url'}>
              <input
                type="text"
                value={`${appBaseUrl}/#/player/${room}`}
                disabled
              />
              <FileCopyIcon
                className={'copyIcon'}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${appBaseUrl}/#/player/${room}`
                  );
                }}
              />
            </div>
          </div>
          <div className={classes.component}>
            {showComponentBasedOnMasterStatus(masterStatus)}
          </div>
        </div>
        <div className={classes.table}>
          {room ? (
            <TablePlayerComponent playersCollection={playerCollection} />
          ) : null}
        </div>
      </div>
    </>
  );
};
