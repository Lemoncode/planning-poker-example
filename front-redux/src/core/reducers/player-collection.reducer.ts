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
    case actionIds.ADD_NEW_PLAYER:
      return handleAddPLayer(state, action.payload);
    case actionIds.RESET_VOTED_FLAG_ON_EVERY_PLAYER:
      return handleResetVotedFlagOnEveryPlayer(state);
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

const handleResetVotedFlagOnEveryPlayer = (
  state: PlayerCollectionState
): PlayerCollectionState =>
  state.map(player => ({
    ...player,
    voted: false,
  }));
