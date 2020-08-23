import { eventChannel } from 'redux-saga';
import { all, call, fork, put, take, cancel } from 'redux-saga/effects';
import { actionIds } from 'core/actions';
import {
  ActionBase,
  promisifiedCreateSocket,
  SocketOuputMessageLiteral,
  SocketInputMessageTypes,
} from 'core';
import { showVotingResults } from 'core/actions';
import { podPlayerActionIds } from './player.actions';

function* handleIO(socket) {
  //  yield fork(read, socket);
  //  yield fork(write, socket);
}

function* flow() {
  while (true) {
    const action: ActionBase = yield take(podPlayerActionIds.CONNECT_PLAYER);
    const { socket, error } = yield call(
      promisifiedCreateSocket,
      action.payload
    );

    if (error) {
      // TODO Fire action to notify error on connection
      console.log('flow: connection failed');
    } else {
      console.log('Player: connected to socket...');
      const ioTask = yield fork(handleIO, socket);
      yield take(podPlayerActionIds.DISCONNECT_PLAYER);
      yield cancel(ioTask);
    }
    socket.disconnect();
  }
}

export function* playerPodRootSagas() {
  yield all([fork(flow)]);
}
