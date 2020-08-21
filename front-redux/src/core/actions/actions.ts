import { actionIds } from './definitions';
import { ActionBase } from 'core';

export const addPlayer = (nickname: string): ActionBase => ({
  type: actionIds.ADD_NEW_PLAYER,
  payload: nickname,
});

export const resetAllVotedFlags = (): ActionBase => ({
  type: actionIds.RESET_VOTED_FLAG_ON_EVERY_PLAYER,
  payload: null,
});

export const resetAllVotesValues = (): ActionBase => ({
  type: actionIds.RESET_VOTE_VALUE_ON_EVERY_PLAYER,
  payload: null,
});
