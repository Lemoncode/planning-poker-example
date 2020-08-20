import { ProfileState, profileReducer } from './profile.reducer';
import {
  PlayerCollectionState,
  playerCollectionReducer,
} from './player-collection.reducer';
import { combineReducers } from 'redux';

export interface GlobalState {
  profileState: ProfileState;
  playerCollectionState: PlayerCollectionState;
}

export const globalReducers = combineReducers<GlobalState>({
  profileState: profileReducer,
  playerCollectionState: playerCollectionReducer,
});
