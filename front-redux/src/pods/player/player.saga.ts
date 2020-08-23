import { eventChannel } from 'redux-saga';
import { all, call, fork, put, take, cancel } from 'redux-saga/effects';
import { actionIds } from 'core/actions';
import {
  ActionBase,
  promisifiedCreateSocket,
  SocketOuputMessageLiteral,
  SocketInputMessageTypes,
} from 'core';
import { showVotingResults, setStoryTitle } from 'core/actions';
import { podPlayerActionIds, playerSuccessfulyConnectedAction } from './player.actions';


function subscribe(socket) {
  return eventChannel(emit => {
    socket.on(SocketOuputMessageLiteral.MESSAGE, msg => {
      console.log(`Socket Msg received in Saga: ${msg}`);
      if (msg.type) {
        const { type, payload } = msg;

        switch (type) {
          case SocketInputMessageTypes.CONNECTION_ESTABLISHED_PLAYER:
            emit(playerSuccessfulyConnectedAction());
            break;
          case SocketInputMessageTypes.NEW_STORY:
            emit(setStoryTitle(payload))
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
    const { payload } = yield take(podPlayerActionIds.SEND_MESSAGE_PLAYER);
    socket.emit(SocketOuputMessageLiteral.MESSAGE, payload);
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
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
