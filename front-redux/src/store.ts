import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { globalReducers } from 'core/reducers';

const sagaMiddleware = createSagaMiddleware();

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
