import React from 'react';
import { CreateSessionContainer } from 'pods/create-session';
import { CenteredLayout } from 'layout';
import { MasterContainer } from 'pods/master';
import { Header, Footer } from 'common-app/components';

export const MasterScene: React.FC = () => {
  return (
    <CenteredLayout>
      <Header />
      <MasterContainer />
      <Footer />
    </CenteredLayout>
  );
};
