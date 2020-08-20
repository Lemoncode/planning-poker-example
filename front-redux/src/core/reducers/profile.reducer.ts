import { ActionBase } from '../base';

export interface ProfileState {
  nickname: string;
  isMaster: boolean;
  room: string;
}

const createDefaultState = (): ProfileState => ({
  nickname: '',
  isMaster: false,
  room: '',
});

export const profileReducer = (
  state: ProfileState = createDefaultState(),
  action: ActionBase
) => {
  return state;
};
