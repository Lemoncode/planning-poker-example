import React from 'react';
import { CreateSessionContainer } from 'pods/create-session';
import { AppLayout } from 'layout';

export const CreateSessionScene: React.FC = () => {
  React.useEffect(() => {
    document.title = `Create New Session Page - T-Shirt Planning Poker - Lemoncode`;
  }, []);
  return (
    <AppLayout>
      <CreateSessionContainer />
    </AppLayout>
  );
};
