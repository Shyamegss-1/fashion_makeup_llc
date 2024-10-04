import {
  FAILURE_LOGIN,
  LOGIN_REQUESTED,
  SUCCESS_LOGIN,
  LOGOUT_FAILURE,
  LOGOUT_REQUESTED,
  SUCCESS_LOGOUT,
  LOADING_STATE,
  MESSAGE_STATE,
} from '../actions/alert-actions';

const initialState = {
  loader: false,
  token: null,
  messageState: false,
  userDetail: {},
};

export default function userLogin(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_LOGIN:
      return {
        ...state,
        token: action.payload.token,
        userDetail: action.payload,
      };

    case LOADING_STATE:
      return {
        ...state,
        loader: !state.loader,
      };

    case FAILURE_LOGIN:
      return {
        ...state,
        userDetail: action.payload,
        token: null,
      };

    case MESSAGE_STATE:
      return {
        ...state,
        messageState: !state.messageState,
      };

    case SUCCESS_LOGOUT:
      return {
        ...state,
        messageState: false,
        token: null,
        userDetail: {},
      };

    default:
      return state;
  }
}
