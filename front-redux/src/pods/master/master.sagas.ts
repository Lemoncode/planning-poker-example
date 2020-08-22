import { eventChannel } from 'redux-saga';
import { all, call, fork, put, take, cancel } from 'redux-saga/effects';
import { actionIds } from 'core/actions';
import { podMasterActionIds } from './master.actions';
import {
  ActionBase,
  promisifiedCreateSocket,
  SocketOuputMessageLiteral,
  SocketInputMessageTypes,
} from 'core';
import {
  addPlayerAction,
  serverInformsUserHasVotedAction,
  showVotingResults,
} from 'core/actions';

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on(SocketOuputMessageLiteral.MESSAGE, msg => {
      console.log(`Socket Msg received in Saga: ${msg}`);
      if (msg.type) {
        const { type, payload } = msg;

        switch (type) {
          case SocketInputMessageTypes.CONNECTION_ESTABLISHED_PLAYER:
            emit(addPlayerAction(payload));
            break;
          case SocketInputMessageTypes.NOTIFY_USER_VOTED:
            emit(serverInformsUserHasVotedAction(payload));
            break;
          case SocketInputMessageTypes.SHOW_VOTING_RESULTS:
            emit(showVotingResults(payload));
            break;
        }
      }
    });

    /*
    socket.on('disconnect', e => {
      // TODO: handle
    });
    socket.on('error', error => {
      // TODO: handle
      console.log('Error while trying to connect, TODO: proper handle of this event');
    });*/

    return () => {};
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* write(socket) {
  while (true) {
    const { payload } = yield take(podMasterActionIds.SEND_MESSAGE_MASTER);
    socket.emit(SocketOuputMessageLiteral.MESSAGE, payload);
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}

function* flow() {
  while (true) {
    const action: ActionBase = yield take(podMasterActionIds.CONNECT_MASTER);
    const { socket, error } = yield call(
      promisifiedCreateSocket,
      action.payload
    );

    if (error) {
      // TODO Fire action to notify error on connection
      console.log('flow: connection failed');
    } else {
      const ioTask = yield fork(handleIO, socket);
      yield take(podMasterActionIds.DISCONNECT_MASTER);
      yield cancel(ioTask);
    }
    socket.disconnect();
  }
}

export function* masterPodRootSagas() {
  yield all([fork(flow)]);
}
