import { actionIds } from './definitions';
import { ActionBase } from 'core';

export const addPlayer = (nickname: string): ActionBase => ({
  type: actionIds.ADD_NEW_PLAYER,
  payload: nickname,
});

export const resetAllVotes = (): ActionBase => ({
  type: actionIds.RESET_VOTED_FLAG_ON_EVERY_PLAYER,
  payload: null,
});
