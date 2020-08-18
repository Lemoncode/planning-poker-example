import * as React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { appBaseUrl } from 'core';
import { DefineStoryComponent, PlayersConnectedComponent } from './components';
import { Player } from './master.vm';

interface Props {
  room: string;
  playerCollection: Player[];
  onSetStoryTitle: (title: string) => void;
}

export const MasterComponent: React.FC<Props> = props => {
  const { room, playerCollection, onSetStoryTitle } = props;

  return (
    <>
      <Typography variant="h3">
        Share this link to let other participants join the session:
      </Typography>

      <Typography variant="h3">{`${appBaseUrl}/#/player/${room}`}</Typography>

      {room ? (
        <>
          <DefineStoryComponent onSubmit={onSetStoryTitle} />
          <PlayersConnectedComponent playerCollection={playerCollection} />
        </>
      ) : null}
    </>
  );
};
