import { createStore, compose } from 'redux';
import { globalReducers } from 'core/reducers';

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) ||
  compose;

// TODO: We will add here combine reducers to cover everty pod
// globalReducer will sit under RootReducer (sibling of pod reducers)

export const store = createStore(globalReducers, {}, composeEnhancer());

