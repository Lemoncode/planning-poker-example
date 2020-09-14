import React from 'react';
import { CreateSessionComponent } from './create-session.component';
import { useHistory } from 'react-router-dom';
import { createRoom } from './create-session.api';
import { routes } from 'core/router';
import { AuthContext } from 'core';

export const CreateSessionContainer: React.FunctionComponent = () => {
  const history = useHistory();
  const authContext = React.useContext(AuthContext);

  const handleCreateSession = async (nickname: string) => {
    // TODO: Error handling
    try {
      const room = await createRoom();
      authContext.setNickname(nickname);
      history.push(routes.master(room));
    } catch (e) {
      // TODO: Add proper error control
      console.log('captured error: ', e);
    }
  };

  return (
    <>
      <CreateSessionComponent onCreateSession={handleCreateSession} />
    </>
  );
};
