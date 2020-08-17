import * as React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { appBaseUrl } from 'core';
import { DefineStoryComponent, PlayersConnectedComponent } from './components';

interface Props {
  room: string;
  playerCollection: string[];
}

export const MasterComponent: React.FC<Props> = props => {
  const { room, playerCollection } = props;

  const handleSetStoryTitle = (title: string) => {
    console.log(title);
    // TODO: Sent vía sockets
  };

  return (
    <>
      <Typography variant="h3">
        Share this link to let other participants join the session:
      </Typography>
      {/* TODO: avoid harcoding here*/}
      <Typography variant="h3">{`${appBaseUrl}/#/player/${room}`}</Typography>

      {room ? (
        <>
          <DefineStoryComponent onSubmit={handleSetStoryTitle} />
          <PlayersConnectedComponent playerCollection={playerCollection} />
        </>
      ) : null}
    </>
  );
};
