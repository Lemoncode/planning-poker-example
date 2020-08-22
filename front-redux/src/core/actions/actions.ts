import { actionIds } from './definitions';
import { ActionBase } from 'core';

export const addPlayerAction = (nickname: string): ActionBase => ({
  type: actionIds.ADD_NEW_PLAYER,
  payload: nickname,
});

export const serverInformsUserHasVotedAction = (
  nickname: string
): ActionBase => ({
  type: actionIds.SERVER_INFORMS_USER_HAS_VOTED_ACTION,
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

export const showVotingResults = (votingResults): ActionBase => ({
  type: actionIds.SHOW_VOTING_RESULTS,
  payload: votingResults,
});

export const setStoryTitle = (title: string): ActionBase => ({
  type: actionIds.SET_STORY_TITLE,
  payload: title,
});
