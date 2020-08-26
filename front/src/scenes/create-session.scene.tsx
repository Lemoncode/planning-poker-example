import React from 'react';
import { CreateSessionContainer } from 'pods/create-session';
import { AppLayout } from 'layout';

export const CreateSessionScene: React.FC = () => {
  return (
    <AppLayout>
      <CreateSessionContainer />
    </AppLayout>
  );
};
