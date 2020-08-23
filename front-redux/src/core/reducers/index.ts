import { SessionState, sessionReducer } from './session.reducer';
import {
  MasterPodState,
  masterPodReducers,
  PlayerPodState,
  playerPodReducers,
} from 'pods';

import {
  PlayerCollectionState,
  playerCollectionReducer,
} from './player-collection.reducer';
import { combineReducers } from 'redux';

export interface GlobalState {
  sessionState: SessionState;
  playerCollectionState: PlayerCollectionState;
  masterPodState: MasterPodState;
  playerPodState: PlayerPodState;
}

export const globalReducers = combineReducers<GlobalState>({
  sessionState: sessionReducer,
  playerCollectionState: playerCollectionReducer,
  masterPodState: masterPodReducers,
  playerPodState: playerPodReducers,
});
