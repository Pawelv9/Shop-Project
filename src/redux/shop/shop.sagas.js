import { takeEvery, call, put } from 'redux-saga/effects';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

import ShopActionTyres from './shop.types';
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from './shop.actions'


export function* fetchCollections() {
  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    yield put(fetchCollectionsSuccess(collectionsMap))
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message))
  }
}

export function* fetchCollectionsStart() {
  yield takeEvery(ShopActionTyres.FETCH_COLLECTIONS_START, fetchCollections);
}