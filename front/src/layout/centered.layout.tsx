import React from 'react';
import * as classes from './centered.layout.styles';

export const CenteredLayout: React.FunctionComponent = props => {
  const { children } = props;
  return (
    <>
      <div className={classes.background}></div>
      <div className={classes.root}>{children}</div>
    </>
  );
};
