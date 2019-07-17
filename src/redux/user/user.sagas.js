import { takeLatest, put, all, call } from 'redux-saga/effects';
// import { signInWithGoogle } from '../../firebase/firebase.utils';

import userActionTypes from './user.types';

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure } from './user.actions'

export function* getSnapshotWithUserAuth(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
  } catch (error) {
    yield put(signInFailure(error))
  }
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess())
  } catch(error) {
    yield put(signOutFailure(error))
  } 
}

export function* signInWithGoogle() {
  try {
    const {user} = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotWithUserAuth(user)
  } catch(error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({payload: { email, password }}) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotWithUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
} 

export function* onEmailSignInStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
} 

export function* isUserAuthenticated() {
try{
  const userAuth = yield getCurrentUser();
  if (!userAuth) return;
  yield getSnapshotWithUserAuth(userAuth);
} catch (error) {
  yield put(signInFailure(error))
}
}

export function* onCheckUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart), 
    call(onEmailSignInStart), 
    call(isUserAuthenticated), 
    call(onSignOutStart)]);
}