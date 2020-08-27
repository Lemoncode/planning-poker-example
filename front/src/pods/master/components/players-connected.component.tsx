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

interface Props {
  playerCollection: Player[];
}

export const PlayersConnectedComponent: React.FC<Props> = (props: Props) => {
  const { playerCollection } = props;

  return (
    <div className={classes.container}>
      <Typography className={classes.subtitle} variant="h6">
        Players connected:
      </Typography>
      <TableContainer className={classes.table}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell className={'head cell'}>Players</TableCell>
              <TableCell className={'head cell'} align="right">
                Status
              </TableCell>
              <TableCell className={'head cell'} align="right">
                Result
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playerCollection.map(player => (
              <TableRow className={'body'} key={player.nickname}>
                <TableCell className={'cell'} component="th" scope="row">
                  {player.nickname}
                </TableCell>
                <TableCell className={'cell'} align="right">
                  {player.voted}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
