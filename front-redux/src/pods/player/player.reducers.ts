import { PlayerStatus } from './player.const';
import { ActionBase, SocketOuputMessageTypes } from 'core';
import { actionIds } from 'core/actions';
import { podPlayerActionIds } from './player.actions';
import { combineReducers } from 'redux';

export interface PlayerPlanningPokerState {
  status: PlayerStatus;
}

const createDefaultMasterPlanningPokerState = () : PlayerPlanningPokerState => ({
  status: PlayerStatus.NOT_CONNECTED,
});

export const playerPlanningPokerReducer = (
  state: PlayerPlanningPokerState = createDefaultMasterPlanningPokerState(),
  action: ActionBase
): PlayerPlanningPokerState => {
  switch (action.type) {
    case podPlayerActionIds.PLAYER_SUCCESSFULLY_CONNECTED:
      return { ...state, status: PlayerStatus.CONNECTED };
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
    /*
    switch (message.type) {
      case SocketOuputMessageTypes.CREATE_STORY:
        return { ...state, status: MasterStatus.VOTING_IN_PROGRESS };
      case SocketOuputMessageTypes.END_VOTE_TIME:
        return { ...state, status: MasterStatus.SHOWING_RESULTS };
    }*/
  }

  return state;
};

export interface PlayerPodState {
  playerPlanningPokerState: PlayerPlanningPokerState;
}

export const playerPodReducers = combineReducers<PlayerPodState>({
  playerPlanningPokerState: playerPlanningPokerReducer,
});
