import { PlayerStatus } from './player.const';
import { ActionBase, SocketOuputMessageTypes } from 'core';
import { actionIds } from 'core/actions';
import { podPlayerActionIds } from './player.actions';
import { combineReducers } from 'redux';

export interface PlayerPlanningPokerState {
  status: PlayerStatus;
}

const createDefaultMasterPlanningPokerState = (): PlayerPlanningPokerState => ({
  status: PlayerStatus.NOT_CONNECTED,
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
      /* case SocketOuputMessageTypes.END_VOTE_TIME:
        return { ...state, status: MasterStatus.SHOWING_RESULTS };*/
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
