import {
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOG_OUT,
  USER_LOADED,
  UPDATE_PROFILE_ERRORS,
  FORGOT_PASSWORD_ERROR,
  SEND_FORGOT_MAIL_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR
} from '../types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
  error: null
}

export default function auth(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    // case REGISTER_SUCCESS:
    //   return {
    //     ...state,
    //     isAuthenticated: false,
    //     loading: false,
    //     errors: {}
    //   }
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        error: null
      }
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        error: null
      }
    case SEND_FORGOT_MAIL_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        error: null
      }
    case UPDATE_PROFILE_ERRORS:
    case FORGOT_PASSWORD_ERROR:
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        error: payload
      }
    case AUTH_ERROR:
    case LOG_OUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: payload
      }
    default:
      return state;
  }
}