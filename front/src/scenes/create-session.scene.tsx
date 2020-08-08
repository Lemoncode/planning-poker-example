import React from 'react';
import { CreateSessionContainer } from 'pods/create-session';
import { CenteredLayout } from 'layout';

export const CreateSessionScene: React.FC = () => {
  return (
    <CenteredLayout>
      <CreateSessionContainer />
    </CenteredLayout>
  );
};
