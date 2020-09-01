import * as React from 'react';
import * as classes from './master.component.styles';
import { appBaseUrl } from 'core';
import { Player, MasterStatus } from './master.vm';
import { TablePlayerComponent } from 'pods/table-player/table-player.component';
import { CopySessionLinkComponent } from './components/copy-session-link.component';

interface Props {
  room: string;
  playerCollection: Player[];
  masterStatus: MasterStatus;
  showComponentBasedOnMasterStatus: (status: MasterStatus) => any;
}

export const MasterComponent: React.FC<Props> = props => {
  const {
    room,
    playerCollection,
    masterStatus,
    showComponentBasedOnMasterStatus,
  } = props;

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
            <TablePlayerComponent playersCollection={playerCollection} />
          </div>
        ) : null}
      </div>
    </>
  );
};
