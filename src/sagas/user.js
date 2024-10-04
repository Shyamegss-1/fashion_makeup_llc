import { all, call, delay, put, takeLatest } from 'redux-saga/effects';
import {
  LOGIN_REQUESTED,
  LOGOUT_REQUESTED,
  loginsuccess,
  loginFailure,
  loadingState,
  messageState,
  logoutSuccess,
} from '../actions/alert-actions';
import { detailsProduct } from '../actions/wishList-Action';
import { productuserSignin } from '../services/apiServices/apiService';

export function* loginHandler({ payload }) {
  let loginStatus = true;
  let result;

  yield productuserSignin(payload).then((e) => {
    if (e.data.Status == 201) {
      loginStatus = false;
      result = e.data;
    } else if (e.data.Status == '200 Ok!') {
      loginStatus = true;
      result = {
        message: e.data.message,
        id: e.data[0].id,
        token: e.data[0].token,
        username: e.data[0].username,
        email: e.data[0].email,
        status: e.data.Status,
      };
    }
  });

  if (!loginStatus) {
    yield put(loginFailure(result));
    yield put(loadingState());
    yield put(messageState());
    yield delay(3000);
    yield put(messageState());
  } else if (loginStatus) {
    yield put(loginsuccess(result));
    yield put(loadingState());
    yield put(messageState());
    yield delay(3000);
    yield put(messageState());
  }
}

export function* logoutHandler() {
  yield put(logoutSuccess());
}


export function* productCartHandler() {
  yield delay(1000);
  yield put(detailsProduct(1));
}


function* user() {
  yield all([
    takeLatest(LOGIN_REQUESTED, loginHandler),
    takeLatest(LOGOUT_REQUESTED, logoutHandler),
    takeLatest('PRODUCT_DATA_HANDLER', productCartHandler),
  ]);
}

export default user;
