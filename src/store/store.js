import { compose, createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import { rootReducer } from './root.reducer';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root.saga';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [logger, sagaMiddleware];

const composedEnhancer = compose(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, composedEnhancer);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
