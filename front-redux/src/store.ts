import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { globalReducers } from 'core/reducers';
import { all, fork } from 'redux-saga/effects';
import { createSessionPodRootSaga } from 'pods/create-session';
import { masterPodRootSagas } from 'pods/master';
import { playerPodRootSagas } from 'pods/player';

const sagaMiddleware = createSagaMiddleware();

// Group here all pods sagas
const rootSaga = function* root() {
  yield all([
    fork(createSessionPodRootSaga),
    fork(masterPodRootSagas),
    fork(playerPodRootSagas),
  ]);
};

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) ||
  compose;

// TODO: We will add here combine reducers to cover everty pod
// globalReducer will sit under RootReducer (sibling of pod reducers)

export const store = createStore(
  globalReducers,
  {},
  composeEnhancer(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
