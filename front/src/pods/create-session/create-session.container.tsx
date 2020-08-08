import React from 'react';
import { CreateSessionComponent } from './create-session.component';
import { useHistory } from 'react-router-dom';
import { createRoom } from './create-session.api';
import { routes } from 'core/router';

export const CreateSessionContainer: React.FunctionComponent = () => {
  const history = useHistory();

  const handleCreateSession = async () => {
    // TODO: Error handling
    try {
      const room = await createRoom();

      history.push(routes.master(room));
    } catch (e) {
      console.log('captured error: ', e);
    }
  };

  return (
    <>
      <CreateSessionComponent onCreateSession={handleCreateSession} />
    </>
  );
};
