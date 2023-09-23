import { takeLatest, put, all, call } from 'redux-saga/effects';
import { USER_ACTION_TYPES } from './user.types';
import { signInSuccess, signInFailure } from './user.action';
import {
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth) {
  try {
    const userSnapshot = yield call(createUserDocumentFromAuth, userAuth);
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
    yield call(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield put(signInSuccess({ ...user }));
  } catch (error) {
    yield call(signInFailure(error));
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
    yield call(signInFailure(error));
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

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onSignInWithEmailAndPasswordStart),
  ]);
}
