import * as React from 'react';
import * as classes from './players-connected.styles';
import { PlayerComponent } from 'pods/player/player.component';
import { Player } from '../master.vm';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TablePlayerComponent } from '../../table-player/table-player.component';

interface Props {
  playerCollection: Player[];
}

export const PlayersConnectedComponent: React.FC<Props> = (props: Props) => {
  const { playerCollection } = props;

  return <TablePlayerComponent playersCollection={playerCollection} />;
};
