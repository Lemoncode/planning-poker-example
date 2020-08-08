import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

interface Props {
  onCreateSession : () => void;
}

export const CreateSessionComponent: React.FunctionComponent<Props> = (props) => {
  const {onCreateSession} = props;

  return (
    <>
      <Button variant="contained" color="primary" onClick={onCreateSession}>
        Crear nueva sesión
      </Button>
    </>
  );
};
