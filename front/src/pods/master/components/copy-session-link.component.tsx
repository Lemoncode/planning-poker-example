import * as React from 'react';
import * as classes from './copy-session-link.styles';
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopy';

interface Props {
  url: string;
}

export const CopySessionLinkComponent: React.FC<Props> = props => {
  const { url } = props;

  return (
    <div className={classes.urlContainer}>
      <Typography className={classes.subtitle} variant="subtitle1">
        Copy this link to the players that are going to join this poker planning
        session
      </Typography>
      <div className={classes.url}>
        <input className={classes.input} type="text" value={url} disabled />
        <FileCopyIcon
          className={classes.copyIcon}
          onClick={() => {
            navigator.clipboard.writeText(url);
          }}
        />
      </div>
    </div>
  );
};
