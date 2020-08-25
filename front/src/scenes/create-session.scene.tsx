import React from 'react';
import { CreateSessionContainer } from 'pods/create-session';
import { CenteredLayout } from 'layout';
import { Header, Footer } from 'common-app/components';

export const CreateSessionScene: React.FC = () => {
  return (
    <CenteredLayout>
      <Header />
      <CreateSessionContainer />
      <Footer />
    </CenteredLayout>
  );
};
