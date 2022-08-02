import { call, put, takeLatest } from 'redux-saga/effects';

import AuthorizedAPI from '../../apis/authorized';
import {
  COLLECTION,
} from '../../configs/server';
import { createAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { GetCollectionsResponse } from '../../types/Axios';
import CollectionSlice from './collection.slice';

export const FETCH_COLLECTIONS = createAction('FETCH_COLLECTIONS');

function* handleFetchCollections() {
  try {
    const res: AxiosResponse<GetCollectionsResponse> = yield call(
      AuthorizedAPI.get,
      COLLECTION,
    );

    yield put(
      CollectionSlice.actions.setCollections(res.data.data),
    );
  } catch (err) {
    const errorMessage =
      (err as AxiosError<{ message: string }>)?.response?.data?.message ||
      (err as Error).message;
    console.log('ERROR', errorMessage);
  }
}

export default function* CollectionSaga() {
  yield takeLatest(FETCH_COLLECTIONS.type, handleFetchCollections);
}
