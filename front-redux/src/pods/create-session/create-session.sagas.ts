import { call, put, takeEvery, fork, all } from 'redux-saga/effects';
import { actionIds } from 'core/actions';
import { createRoom } from './create-session.api';
import { history, routes } from 'core/router';
import { roomRequestCompletedAction } from './create-session.actions';

function* watchRoomRequestStart() {
  yield takeEvery(actionIds.ROOM_REQUEST_START, fireRoomRequest);
}

// TODO: Add error handling
function* fireRoomRequest() {
  const room = yield call(createRoom);
  yield put(roomRequestCompletedAction(room));
  history.push(routes.master(room));
}

export const createSessionPodRootSaga = function* root() {
  yield all([fork(watchRoomRequestStart)]);
};
