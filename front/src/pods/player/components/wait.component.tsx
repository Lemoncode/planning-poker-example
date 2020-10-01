import * as React from 'react';
import { cx } from 'emotion';
import * as classes from './wait.component.styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

export const WaitComponent: React.FC = () => {
  return (
    <div className={classes.spinnerContainer}>
      <Typography
        className={cx(classes.title, classes.titleSpinner)}
        variant="h6"
      >
        Waiting for master
      </Typography>
      <CircularProgress
        className={classes.spinner}
        color="secondary"
        size={'6rem'}
        thickness={1.5}
      />
    </div>
  );
};
