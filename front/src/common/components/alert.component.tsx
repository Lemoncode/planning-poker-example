import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

const Alert: React.FC<AlertProps> = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme: Theme) => ({
  position: {
    position: 'relative',
  },
}));

interface Props {
  textAlert: string;
  setShowAlert: (e: boolean) => void;
  showAlert: boolean;
}

export const CustomAlert: React.FC<Props> = props => {
  const { textAlert, showAlert, setShowAlert } = props;
  const classes = useStyles();

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    <Snackbar
      open={showAlert}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      className={classes.position}
    >
      <Alert onClose={handleClose} severity="error">
        {textAlert}
      </Alert>
    </Snackbar>
  );
};
