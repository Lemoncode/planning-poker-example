import { call, put, takeEvery } from 'redux-saga/effects';
import { actionIds, roomRequestCompletedAction } from 'core/actions';
import { createRoom } from './create-session.api';

export function* watchRoomRequestStart() {
  yield takeEvery(actionIds.ROOM_REQUEST_START, fireRoomRequest);
}

// TODO: Add error handling
function* fireRoomRequest() {
  const room = yield call(createRoom);
  yield put(roomRequestCompletedAction(room));
}
