import {
  LOGIN_SUCCESS,
  AUTH_ERRORS,
  LOG_OUT,
  USER_LOADED
} from '../types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  errors: {}
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
        errors: {}
      }
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        errors: {}
      }
    case AUTH_ERRORS:
    case LOG_OUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        errors: payload
      }
    default:
      return state;
  }
}