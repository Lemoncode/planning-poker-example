import { actionIds } from './definitions';
import { ActionBase } from 'core';

interface UserInformation {
  nickname: string;
  isMaster: boolean;
}

export const setUserProfileAction = (
  userInformation: UserInformation
): ActionBase => ({
  type: actionIds.SET_USER_INFORMATION,
  payload: userInformation,
});

export const setRoomAction = (room: string): ActionBase => ({
  type: actionIds.SET_ROOM,
  payload: room,
});
