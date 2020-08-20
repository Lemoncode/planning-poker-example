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
    case actionIds.SET_MASTER_NICK_NAME:
      return handleSetMasterNickname(state, action.payload);
    case actionIds.ROOM_REQUEST_COMPLETED:
      return handleSetRoom(state, action.payload);
  }

  return state;
};

// TODO: Enhance payload typing
const handleSetMasterNickname = (
  state: ProfileState,
  nickname: string
): ProfileState => ({
  ...state,
  nickname,
  isMaster: true,
});

const handleSetRoom = (state: ProfileState, room: string): ProfileState => ({
  ...state,
  room,
});
