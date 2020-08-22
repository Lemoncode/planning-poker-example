import { ProfileState, profileReducer } from './profile.reducer';
import { MasterPodState, masterPodReducers } from 'pods';

import {
  PlayerCollectionState,
  playerCollectionReducer,
} from './player-collection.reducer';
import { combineReducers } from 'redux';

export interface GlobalState {
  profileState: ProfileState;
  playerCollectionState: PlayerCollectionState;
  masterPodState: MasterPodState;
}

export const globalReducers = combineReducers<GlobalState>({
  profileState: profileReducer,
  playerCollectionState: playerCollectionReducer,
  masterPodState: masterPodReducers,
});
