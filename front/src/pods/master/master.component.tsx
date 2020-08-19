import * as React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { appBaseUrl } from 'core';
import { DefineStoryComponent, PlayersConnectedComponent } from './components';
import { Player, MasterStatus } from './master.vm';

interface Props {
  room: string;
  playerCollection: Player[];
  onSetStoryTitle: (title: string) => void;
  masterStatus: MasterStatus;
}

export const MasterComponent: React.FC<Props> = props => {
  const { room, playerCollection, onSetStoryTitle, masterStatus } = props;

  function showComponentBasedOnMasterStatus(status: MasterStatus) {
    switch (status) {
      case MasterStatus.INITIALIZING:
        return null;
      case MasterStatus.CREATING_STORY:
        return <DefineStoryComponent onSubmit={onSetStoryTitle} />;
      case MasterStatus.VOTING_IN_PROGRESS:
        return <span>Finish Vote</span>;
      case MasterStatus.SHOWING_RESULTS:
        return null;
      default:
        return null;
    }
  }

  return (
    <>
      <Typography variant="h3">
        Share this link to let other participants join the session:
      </Typography>

      <Typography variant="h3">{`${appBaseUrl}/#/player/${room}`}</Typography>

      {showComponentBasedOnMasterStatus(masterStatus)}
      {room ? (
        <PlayersConnectedComponent playerCollection={playerCollection} />
      ) : null}
    </>
  );
};

interface PropsCommandLine {
  storyBeingVoted: boolean;
  onSetStoryTitle: (title: string) => void;
}
