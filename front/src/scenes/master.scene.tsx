import React from 'react';
import { CreateSessionContainer } from 'pods/create-session';
import { AppLayout } from 'layout';
import { MasterContainer } from 'pods/master';

export const MasterScene: React.FC = () => {
  return (
    <AppLayout>
      <MasterContainer />
    </AppLayout>
  );
};
