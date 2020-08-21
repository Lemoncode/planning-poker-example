import { createSelector, Selector } from 'reselect';
import { GlobalState } from 'core/reducers';
import { VoteResult } from './master.vm';

// TODO: create a selector to access the right POD or Global
// We would avoid future refactors of reducers

export const selectVoteCollectionResult: Selector<
  GlobalState,
  VoteResult[]
> = createSelector(
  (state: GlobalState) => state.playerCollectionState,
  playerCollection =>
    playerCollection.map(({ nickname, vote }) => ({
      nickname,
      vote,
    }))
);
