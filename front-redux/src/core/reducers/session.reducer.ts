import { ActionBase } from '../base';
import { actionIds } from '../actions';

export interface SessionState {
  nickname: string;
  isMaster: boolean;
  room: string;
  story: string;
}

const createDefaultState = (): SessionState => ({
  nickname: '',
  isMaster: false,
  room: '',
  story: '',
});

export const sessionReducer = (
  state: SessionState = createDefaultState(),
  action: ActionBase
) => {
  switch (action.type) {
    case actionIds.SET_MASTER_NICK_NAME:
      return handleSetMasterNickname(state, action.payload);
    case actionIds.ROOM_REQUEST_COMPLETED:
      return handleSetRoom(state, action.payload);
    case actionIds.SET_STORY_TITLE:
      return handleSetStoryTitle(state, action.payload);
    case actionIds.CLEANUP_BEFORE_MOVING_TO_NEXT_STORY:
      return handleCleanupBeforeMovingToNextStory(state);
  }

  return state;
};

const handleCleanupBeforeMovingToNextStory = (
  state: SessionState,
): SessionState => ({ ...state, story: '' });


const handleSetStoryTitle = (
  state: SessionState,
  story: string
): SessionState => ({ ...state, story });

// TODO: Enhance payload typing
const handleSetMasterNickname = (
  state: SessionState,
  nickname: string
): SessionState => ({
  ...state,
  nickname,
  isMaster: true,
});

const handleSetRoom = (state: SessionState, room: string): SessionState => ({
  ...state,
  room,
});
