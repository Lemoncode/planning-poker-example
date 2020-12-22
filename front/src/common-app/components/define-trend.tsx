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
  const [trend, setTrend] = React.useState<number>(0);
  const [valueArray, setValueArray] = React.useState<number[]>([]);

  React.useEffect(() =>setValueArray([...playersCollection.map((elem)=>mapToNumber(elem.vote))]));

  const mapToNumber = (vote: string): number => {
    switch (vote) {
      case 'XS':
        return 1;
        break;
      case 'S':
        return 2;
        break;
      case 'M':
        return 3;
        break;
      case 'L':
        return 4;
        break;
      case 'XL':
        return 5;
        break;
      case 'XXL':
        return 6;
        break;
    }
  };

  const newValues = playersCollection.map((elem:PlayerVotingStatus) => mapToNumber(elem.vote));

  const mapToLabel = (): string => {
    getTrend();
    switch (trend) {
      case 1:
        return 'XS';
        break;
      case 2:
        return 'S';
        break;
      case 3:
        return 'M';
        break;
      case 4:
        return 'L';
        break;
      case 5:
        return 'XL';
        break;
      case 6:
        return 'XXL';
        break;
    }
  };

  const getTrend = (): void => {

    let numItem: number = 0;
    valueArray.map((value: number) => {
      const arrayLength = valueArray.filter(elem => elem === value).length;
      if (numItem < arrayLength) {
        numItem = arrayLength;
         setTrend(value);
      }
    });
  };

  const calculateTrend = (): string => mapToLabel();

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
                {calculateTrend()}
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
