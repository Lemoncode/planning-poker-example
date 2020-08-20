import { ActionBase } from '../base';
import { actionIds } from '../actions';

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
  switch (action.type) {
    case actionIds.SET_USER_INFORMATION:
      return handleSetuserInformation(state, action.payload);
    case actionIds.SET_ROOM:
      return handleSetRoom(state, action.payload);
  }

  return state;
};

// TODO: Enhance payload typing
const handleSetuserInformation = (
  state: ProfileState,
  { nickname, isMaster }
): ProfileState => ({
  ...state,
  nickname,
  isMaster,
});

const handleSetRoom = (state: ProfileState, room: string): ProfileState => ({
  ...state,
  room,
});
