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
): PlayerCollectionState => {
  switch (action.type) {
    case actionIds.ADD_NEW_PLAYER:
      return handleAddPLayer(state, action.payload);
    case actionIds.RESET_VOTED_FLAG_ON_EVERY_PLAYER:
      return handleResetVotedFlagOnEveryPlayer(state);
    case actionIds.RESET_VOTE_VALUE_ON_EVERY_PLAYER:
      return handleResetVoteValueOnEveryPlayer(state);
    case actionIds.USER_VOTED:
      return handleUserVoted(state, action.payload);
  }

  return state;
};

const handleUserVoted = (state: PlayerCollectionState, nickname: string) =>
  state.map(user =>
    user.nickname == nickname
      ? {
          ...user,
          voted: true,
        }
      : user
  );

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

// TODO: This to reset actions should we joined
const handleResetVotedFlagOnEveryPlayer = (
  state: PlayerCollectionState
): PlayerCollectionState =>
  state.map(player => ({
    ...player,
    voted: false,
  }));

const handleResetVoteValueOnEveryPlayer = (
  state: PlayerCollectionState
): PlayerCollectionState =>
  state.map(player => ({
    ...player,
    vote: '',
  }));
