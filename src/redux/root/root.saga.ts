import { all } from 'redux-saga/effects';
import AuthSaga from '../auth/auth.saga';
import CollectionSaga from '../collection/collection.saga';
import UserSaga from '../user/user.saga';

function* rootSaga() {
  yield all([AuthSaga(), UserSaga(), CollectionSaga()]);
}

export default rootSaga;
