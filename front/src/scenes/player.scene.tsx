import * as React from 'react';
import { PlayerContainer } from 'pods/player';
import { AppLayout } from 'layout';

export const PlayerScene = () => {
  React.useEffect(() => {
    document.title = `Player Page - T-Shirt Planning Poker - Lemoncode`;
  }, []);
  return (
    <AppLayout>
      <PlayerContainer />
    </AppLayout>
  );
};
