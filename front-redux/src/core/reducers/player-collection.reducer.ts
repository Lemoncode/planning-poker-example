import { ActionBase } from '../base';
import { actionIds } from '../actions';

interface Player {
  nickname: string;
  voted: boolean;
  vote: string;
}

export type PlayerCollectionState = Player[];

const createDefaultState = (): PlayerCollectionState => [];

export const playerCollectionReducer = (
  state: PlayerCollectionState = createDefaultState(),
  action: ActionBase
) => {
  switch (action.type) {
    case actionIds.ADD_PLAYER:
      return handleAddPLayer(state, action.payload);
  }

  return state;
};

const handleAddPLayer = (
  state: PlayerCollectionState,
  nickname: string
): PlayerCollectionState => [
  ...state,
  {
    nickname,
    voted: false,
    vote: '',
  },
];
