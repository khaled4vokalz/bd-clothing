import { createAction } from '../../utils/reducer/reducer.util';
import { USER_ACTION_TYPES } from './user.types';

export const setCurrentUser = user =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const checkUserSession = () =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });

export const signInSuccess = user =>
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const signInFailure = error =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, error);

export const signUpStart = (displayName, email, password) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_START, {
    displayName,
    email,
    password,
  });

export const signUpSuccess = (user, additionalDetails) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails });

export const signUpFailure = error =>
  createAction(USER_ACTION_TYPES.SIGN_UP_FAILURE, error);
