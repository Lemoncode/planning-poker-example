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

export const cleanupBeforeMovingToNextStoryAction = (): ActionBase => ({
  type: actionIds.CLEANUP_BEFORE_MOVING_TO_NEXT_STORY,
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
