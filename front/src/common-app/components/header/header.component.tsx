import * as React from 'react';
import { Typography, Divider } from '@material-ui/core';
import * as classes from './header.styles';

interface Props {}

export const Header: React.FC<Props> = props => {
  const {} = props;

  return (
    <header className={classes.logoContainer}>
      <img className={classes.logo} src="./src/assets/logo.png" alt="logo" />
      <Typography className={classes.title} variant="h4" component="h4">
        T-Shirt Planning Poker
      </Typography>
    </header>
  );
};
