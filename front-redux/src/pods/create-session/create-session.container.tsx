import React from 'react';
import { CreateSessionComponent } from './create-session.component';
import { useHistory } from 'react-router-dom';
import { createRoom } from './create-session.api';
import { routes } from 'core/router';
import { useSelector, useDispatch } from 'react-redux';
import {
  roomRequestStartAction,
  setMasterNickname,
} from './create-session.actions';
import { addPlayerAction } from 'core/actions';

export const CreateSessionContainer: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  // TODO REMOVE AUTHCONTEXT

  const handleCreateSession = async (nickname: string) => {
    dispatch(roomRequestStartAction());
    dispatch(setMasterNickname(nickname));
    dispatch(addPlayerAction(nickname));
  };

  return (
    <>
      <CreateSessionComponent onCreateSession={handleCreateSession} />
    </>
  );
};
