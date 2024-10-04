import { createAction } from 'redux-actions';

export const SUCCESS_LOGIN = "SUCCESS_LOGIN"
export const loginsuccess = createAction(SUCCESS_LOGIN)

export const FAILURE_LOGIN ="FAILURE_LOGIN"
export const loginFailure = createAction(FAILURE_LOGIN)

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const loginRequested = createAction(LOGIN_REQUESTED);


export const LOGOUT_REQUESTED = "LOGOUT_REQUESTED"
export const requestlogout = createAction(LOGOUT_REQUESTED)

export const LOGOUT_FAILURE = "LOGOUT_FAILURE"
export const failurelogout = createAction(LOGOUT_FAILURE)

export const SUCCESS_LOGOUT = "SUCCESS_LOGOUT"
export const logoutSuccess = createAction(SUCCESS_LOGOUT)

export const LOADING_STATE = "LOADING_STATE"
export const loadingState = createAction(LOADING_STATE)


export const MESSAGE_STATE = "MESSAGE_STATE"
export const messageState = createAction(MESSAGE_STATE)