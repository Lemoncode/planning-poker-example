import * as React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { appBaseUrl } from 'core';

interface Props {
  room: string;
}

export const MasterComponent: React.FC<Props> = props => {
  const { room } = props;
  return (
    <>
      <Typography variant="h3">
        Comparta este enlace con los participantes:
      </Typography>
      {/* TODO: avoid harcoding here*/}
      <Typography variant="h3">{`${appBaseUrl}/#/player/${room}`}</Typography>
    </>
  );
};
