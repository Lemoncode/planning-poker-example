import * as React from 'react';
import * as classes from './master.component.styles';
import { appBaseUrl } from 'core';
import { Player, MasterStatus, VoteResult } from './master.vm';
import { TablePlayerComponent } from 'pods/table-player/table-player.component';
import { CopySessionLinkComponent } from './components/copy-session-link.component';
import { DefineStoryComponent, ShowVotingResults } from './components';
// TODO: Move this to common-app
import { VoteOptionsComponent } from 'pods/vote-options';
import { PlayerVotingStatus } from 'core';

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
        return <DefineStoryComponent onSubmit={onSetStoryTitle} />;
      case MasterStatus.VOTING_IN_PROGRESS:
        return (
          <>
            <VoteOptionsComponent
              onFinishVoting={onFinishVoting}
              onVoteChosen={onMasterVoteChosen}
            />
          </>
        );
      case MasterStatus.SHOWING_RESULTS:
        return (
          <>
            <ShowVotingResults
              onMoveToNextStory={onMoveToNextStory}
              playerVotingStatus={playerVotingStatus}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className={classes.container}>
        {/* <div className={'left-container'}> */}
        <CopySessionLinkComponent url={`${appBaseUrl}/#/player/${room}`} />
        <div className={classes.component}>
          {showComponentBasedOnMasterStatus(masterStatus)}
        </div>
        {/* </div> */}

        {room ? (
          <div className={classes.table}>
            {' '}
            <TablePlayerComponent playersCollection={playerVotingStatus} />
          </div>
        ) : null}
      </div>
    </>
  );
};
