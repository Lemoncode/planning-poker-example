import { actionIds } from './definitions';
import { ActionBase } from 'core';

export const addPlayerAction = (nickname: string): ActionBase => ({
  type: actionIds.ADD_NEW_PLAYER,
  payload: nickname,
});

export const userVotedAction = (nickname: string): ActionBase => ({
  type: actionIds.USER_VOTED,
  payload: nickname,
});

export const resetAllVotedFlagsAction = (): ActionBase => ({
  type: actionIds.RESET_VOTED_FLAG_ON_EVERY_PLAYER,
  payload: null,
});

export const resetAllVotesValuesAction = (): ActionBase => ({
  type: actionIds.RESET_VOTE_VALUE_ON_EVERY_PLAYER,
  payload: null,
});


export const showVotingResults = (votingResults) : ActionBase => ({
  type: actionIds.SHOW_VOTING_RESULTS,
  payload: votingResults,
})
