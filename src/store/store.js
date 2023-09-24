import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import { rootReducer } from './root.reducer';

const middlewares = [logger];
export const store = configureStore({
  reducer: rootReducer,
  // the default middlewares consist of redux thunk as well
  // we wanna keep that
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
});
