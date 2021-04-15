import axios from 'axios';
import { LOGIN_SUCCESS, USER_LOADED, AUTH_ERRORS, LOG_OUT } from '../types';
import { toast } from 'react-toastify';

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERRORS
    });
  }
};

// Login
export const login = ({ email, password }, hideLogin) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/auth/login', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    hideLogin();
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      // errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      // errors.forEach((error) => console.log(error.msg));
      dispatch({
        type: AUTH_ERRORS,
        payload: { type: 'login', msg: errors[0].msg }
      });
    }
  }
}

// Register
export const register = (formData, hideRegister, showLogin) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/auth/signup', formData, config);
    toast.success(res.data.msg, { position: toast.POSITION.TOP_CENTER});
    hideRegister();
    showLogin();
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      dispatch({
        type: AUTH_ERRORS,
        payload: { type: 'register', msg: errors[0].msg }
      });
    }
    return false;
  }
}

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOG_OUT });
};
