import { takeLatest, put, all, call } from 'redux-saga/effects';
import { USER_ACTION_TYPES } from './user.types';
import {
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure,
  signOutSuccess,
  signOutFailed,
} from './user.action';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser,
} from '../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) {
      return;
    }
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmailAndPassword({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signUpWithEmailAndPassword({
  payload: { displayName, email, password },
}) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onSignInWithEmailAndPasswordStart() {
  yield takeLatest(
    USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    signInWithEmailAndPassword
  );
}

export function* onSignUpWithEmailAndPasswordStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpWithEmailAndPassword);
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onSignInWithEmailAndPasswordStart),
    call(onSignUpWithEmailAndPasswordStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
