import * as React from 'react';
import * as classes from './define-story.styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { TextareaAutosize } from '@material-ui/core';

interface Props {
  onSubmit: (title: string) => void;
}

export const DefineStoryComponent: React.FC<Props> = props => {
  const [title, setTitle] = React.useState('');
  const { onSubmit } = props;

  return (
    <div className={classes.container}>
      <Typography className={classes.subtitle} variant="subtitle1">
        Define here you user history and click on start voting
      </Typography>
      <TextareaAutosize
        className={classes.textArea}
        rowsMin={3}
        placeholder="Define here..."
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={e => onSubmit(title)}
      >
        START VOTING
      </Button>
    </div>
  );
};
