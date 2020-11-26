import * as React from 'react';
import { cx } from 'emotion';
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
import { PlayerVotingStatus } from 'core';

interface Props {
  playersCollection: PlayerVotingStatus[];
  headingLevel?: React.ElementType;
}

export const TablePlayerComponent: React.FC<Props> = (props: Props) => {
  const { playersCollection, headingLevel } = props;

  return (
    <div className={classes.container}>
      <Typography
        className={classes.subtitle}
        variant="h6"
        component={headingLevel}
      >
        Players connected:
      </Typography>
      <TableContainer className={classes.table}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell className={cx(classes.head, classes.cell)}>
                Players connected
              </TableCell>
              <TableCell
                className={cx(classes.head, classes.cell)}
                align="right"
              >
                Status Vote
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
            {playersCollection.map(player => (
              <TableRow key={player.nickname}>
                <TableCell className={classes.cell} component="th" scope="row">
                  {player.nickname}
                </TableCell>
                <TableCell className={classes.cell} align="right">
                  {player.voted ? (
                    <CheckIcon
                      color="primary"
                      aria-hidden={false}
                      aria-label="User voted"
                    />
                  ) : (
                    <CloseIcon
                      color="error"
                      aria-hidden={false}
                      aria-label="User didn't vote"
                    />
                  )}
                </TableCell>
                <TableCell className={classes.cell} align="right">
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

TablePlayerComponent.defaultProps = {
  headingLevel: 'h2',
};
