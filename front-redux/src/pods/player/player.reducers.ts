import { PlayerStatus } from './player.const';
import { ActionBase, SocketOuputMessageTypes } from 'core';
import { actionIds } from 'core/actions';
import { podPlayerActionIds, playerVotesAction } from './player.actions';
import { combineReducers } from 'redux';

export interface PlayerPlanningPokerState {
  status: PlayerStatus;
  nicknameInUse: boolean;
}

const createDefaultMasterPlanningPokerState = (): PlayerPlanningPokerState => ({
  status: PlayerStatus.NOT_CONNECTED,
  nicknameInUse: false,
});

export const playerPlanningPokerReducer = (
  state: PlayerPlanningPokerState = createDefaultMasterPlanningPokerState(),
  action: ActionBase
): PlayerPlanningPokerState => {
  switch (action.type) {
    case podPlayerActionIds.CONNECT_PLAYER:
      return { ...state, status: PlayerStatus.CONNECTION_IN_PROGRESS };
    case podPlayerActionIds.PLAYER_SUCCESSFULLY_CONNECTED:
      return { ...state, status: PlayerStatus.WAITING_FOR_STORY };
    case actionIds.SET_STORY_TITLE:
      return { ...state, status: PlayerStatus.VOTING_IN_PROGRESS };
    case podPlayerActionIds.SEND_MESSAGE_PLAYER:
      return handleSendMessagePlayer(state, action.payload);
    case actionIds.SHOW_VOTING_RESULTS:
      return { ...state, status: PlayerStatus.SHOW_RESULTS };
    case podPlayerActionIds.DISCONNECT_PLAYER:
      return { ...state, status: PlayerStatus.NOT_CONNECTED };
    case podPlayerActionIds.NOTIFY_NICKNAME_IN_USE:
      return { ...state, nicknameInUse: true };
    case podPlayerActionIds.HIDE_NICKNAME_INUSE_NOTIFICATION:
      return { ...state, nicknameInUse: false };
  }

  return state;
};

// TODO: Type this
const handleSendMessagePlayer = (
  state: PlayerPlanningPokerState,
  message: any
): PlayerPlanningPokerState => {
  // TODO: consider using lodash get here
  if (message && message.type) {
    switch (message.type) {
      case SocketOuputMessageTypes.USER_VOTED:
        return { ...state, status: PlayerStatus.VOTING_CLOSED };
      case SocketOuputMessageTypes.END_VOTE_TIME:
        return { ...state, status: PlayerStatus.SHOW_RESULTS };
    }
  }

  return state;
};

export interface PlayerPodState {
  playerPlanningPokerState: PlayerPlanningPokerState;
}

export const playerPodReducers = combineReducers<PlayerPodState>({
  playerPlanningPokerState: playerPlanningPokerReducer,
});
