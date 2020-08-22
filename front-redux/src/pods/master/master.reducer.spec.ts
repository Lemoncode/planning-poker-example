import {
  masterPlanningPokerReducer,
  MasterPlanningPokerState,
} from './master.reducers';
import { ActionBase } from 'core';
import {
  ConnectMasterAction,
  SendCreateStoryMessageToServerAction,
  voteTimeIsOverAction,
} from './master.actions';
import { resetAllVotesValuesAction } from 'core/actions';
import { MasterStatus } from './master.const';

// TODO: configure Jest Debug testing

describe('masterPlanningPokerReducer', () => {
  it('Should transition from INITIALIZING to CREATING_STORY when CONNECT_MASTER actions is received', () => {
    // Arrange

    // TODO: Discussion, should we rely on this action creator?
    const action: ActionBase = ConnectMasterAction({
      user: 'John',
      isMaster: true,
      room: 'test',
    });

    // Act
    const newState = masterPlanningPokerReducer(void 0, action);
    // Assert
    expect(newState.status).toBe(MasterStatus.CREATING_STORY);
  });

  it('Should transition from CREATING_STORY to VOTING_IN_PROGRESS when SEND_MESSAGE_MASTER/CREATE_STORY actions is received', () => {
    // Arrange
    const previousState: MasterPlanningPokerState = {
      status: MasterStatus.CREATING_STORY,
    };

    // TODO: Discussion, should we rely on this action creator?
    const action: ActionBase = SendCreateStoryMessageToServerAction(
      'As  a user I want to blah blah blah'
    );

    // Act
    const newState = masterPlanningPokerReducer(previousState, action);
    // Assert
    expect(newState.status).toBe(MasterStatus.VOTING_IN_PROGRESS);
  });

  it('Should transition from VOTING_IN_PROGRESS to SHOWING_RESULTS when SEND_MESSAGE_MASTER/END_VOTE_TIME actions is received', () => {
    // Arrange
    const previousState: MasterPlanningPokerState = {
      status: MasterStatus.VOTING_IN_PROGRESS,
    };

    // TODO: Discussion, should we rely on this action creator?
    const action: ActionBase = voteTimeIsOverAction();

    // Act
    const newState = masterPlanningPokerReducer(previousState, action);
    // Assert
    expect(newState.status).toBe(MasterStatus.SHOWING_RESULTS);
  });

  it('Should transition from SHOWING_RESULTS to CREATING_STORY when CREATE_STORY actions is received', () => {
    // Arrange
    const previousState: MasterPlanningPokerState = {
      status: MasterStatus.SHOWING_RESULTS,
    };

    // TODO: Unify all reset actions maybe createNewStory action
    const action: ActionBase = resetAllVotesValuesAction();

    // Act
    const newState = masterPlanningPokerReducer(previousState, action);
    // Assert
    expect(newState.status).toBe(MasterStatus.CREATING_STORY);
  });
});
