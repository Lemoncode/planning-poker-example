import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

interface Props {
  onSubmit: (title: string) => void;
}

export const DefineStoryComponent: React.FC<Props> = props => {
  const [title, setTitle] = React.useState('');
  const { onSubmit } = props;

  return (
    <>
      <Typography variant="h3">User Story:</Typography>
      <TextField
        label="Title"
        margin="normal"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={e => onSubmit(title)}
      >
        send
      </Button>
    </>
  );
};
