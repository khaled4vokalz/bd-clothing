import { compose, createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import { rootReducer } from './root.reducer';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [logger];

const composedEnhancer = compose(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, composedEnhancer);

export const persistor = persistStore(store);
