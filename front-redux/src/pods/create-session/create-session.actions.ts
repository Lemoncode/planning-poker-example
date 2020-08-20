import { actionIds } from 'core/actions';
import { ActionBase } from 'core';

export const setMasterNickname = (nickname: string): ActionBase => ({
  type: actionIds.SET_MASTER_NICK_NAME,
  payload: nickname,
});

export const roomRequestStartAction = (): ActionBase => ({
  type: actionIds.ROOM_REQUEST_START,
  payload: null,
});

export const roomRequestCompletedAction = (room: string): ActionBase => ({
  type: actionIds.ROOM_REQUEST_COMPLETED,
  payload: room,
});
