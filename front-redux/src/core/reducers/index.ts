import { ProfileState, profileReducer } from './profile.reducer';
import { combineReducers } from 'redux';

export interface GlobalState {
  profileState: ProfileState;
}

export const globalReducers = combineReducers<GlobalState>({
  profileState: profileReducer,
});
