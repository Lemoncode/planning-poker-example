import * as React from 'react';
import * as classes from './table-player.styles';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

interface DataPlayers {
  nickname: string;
  voted?: boolean;
  vote?: string;
}

interface Props {
  playersCollection: DataPlayers[];
}

export const TablePlayerComponent: React.FC<Props> = (props: Props) => {
  const { playersCollection } = props;

  return (
    <div className={classes.container}>
      <Typography className={'subtitle'} variant="h6">
        Players connected:
      </Typography>
      <TableContainer className={'table'}>
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
          <TableBody className={'body'}>
            {playersCollection.map(player => (
              <TableRow key={player.nickname}>
                <TableCell className={'cell'} component="th" scope="row">
                  {player.nickname}
                </TableCell>
                <TableCell className={'cell'} align="right">
                  {player.vote === '' ? (
                    <CloseIcon color={'error'} />
                  ) : player.voted || player.vote ? (
                    <CheckIcon color={'primary'} />
                  ) : null}
                </TableCell>
                <TableCell className={'cell'} align="right">
                  {player.vote}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
