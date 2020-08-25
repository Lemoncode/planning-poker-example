import * as React from 'react';
import { PlayerContainer } from 'pods/player';
import { CenteredLayout } from 'layout';
import { Header, Footer } from 'common-app/components';

export const PlayerScene = () => {
  return (
    <CenteredLayout>
      <Header />
      <PlayerContainer />
      <Footer />
    </CenteredLayout>
  );
};
