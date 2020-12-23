import * as React from 'react';
import { cx } from 'emotion';
import * as classes from './table-player.styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { PlayerVotingStatus } from 'core';

interface Props {
  playersCollection: PlayerVotingStatus[];
  headingLevel?: React.ElementType;
}

export const TablePlayerTrendComponent: React.FC<Props> = (props: Props) => {
  const { playersCollection, headingLevel } = props;

  const getTrend = (): string => {
    const result = playersCollection.map((elem: PlayerVotingStatus) =>
      playersCollection.filter(
        (player: PlayerVotingStatus) => player.vote === elem.vote
      ).length
    );

    const foundIndex = result.indexOf(Math.max(...result));

    return playersCollection[foundIndex].vote;
  };

  return (
    <div className={classes.container}>
      <TableContainer className={classes.table}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell className={cx(classes.head, classes.cell)}>
                Vote Trend
              </TableCell>
              <TableCell
                className={cx(classes.head, classes.cell)}
                align="right"
              >
                Result
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.body}>
            <TableRow key={1}>
              <TableCell className={classes.cell} component="th" scope="row">
                Trend result
              </TableCell>
              <TableCell className={classes.cell} align="right">
                { getTrend()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

TablePlayerTrendComponent.defaultProps = {
  headingLevel: 'h2',
};
