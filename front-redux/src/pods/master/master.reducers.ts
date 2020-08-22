import { MasterStatus } from './master.const';
import { ActionBase, SocketOuputMessageTypes } from 'core';
import { actionIds } from 'core/actions';
import { podMasterActionIds } from './master.actions';
import { combineReducers } from 'redux';

export interface MasterPlanningPokerState {
  status: MasterStatus;
}

const createDefaultMasterPlanningPokerState = () => ({
  status: MasterStatus.INITIALIZING,
});

export const masterPlanningPokerReducer = (
  state: MasterPlanningPokerState = createDefaultMasterPlanningPokerState(),
  action: ActionBase
): MasterPlanningPokerState => {
  switch (action.type) {
    case podMasterActionIds.CONNECT_MASTER:
      return { ...state, status: MasterStatus.CREATING_STORY };
    case podMasterActionIds.SEND_MESSAGE_MASTER:
      return handleSendMessageMaster(state, action.payload);
    // TODO unify all cleanup in one action
    case actionIds.RESET_VOTE_VALUE_ON_EVERY_PLAYER:
      return { ...state, status: MasterStatus.CREATING_STORY };
  }

  return state;
};

// TODO: Type this
const handleSendMessageMaster = (
  state: MasterPlanningPokerState,
  message: any
): MasterPlanningPokerState => {
  // TODO: consider using lodash get here
  if (message && message.type) {
    switch (message.type) {
      case SocketOuputMessageTypes.CREATE_STORY:
        return { ...state, status: MasterStatus.VOTING_IN_PROGRESS };
      case SocketOuputMessageTypes.END_VOTE_TIME:
        return { ...state, status: MasterStatus.SHOWING_RESULTS };
    }
  }

  return state;
};

export interface MasterPodState {
  masterPlanningPokerState: MasterPlanningPokerState;
}

export const masterPodReducers = combineReducers<MasterPodState>({
  masterPlanningPokerState: masterPlanningPokerReducer,
});
