import axios from 'axios';
import { LOGIN_SUCCESS, USER_LOADED, AUTH_ERRORS, UPDATE_PROFILE_ERRORS, LOG_OUT, FORGOT_PASSWORD_ERROR, SEND_FORGOT_MAIL_SUCCESS, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR } from '../types';
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
    const error = err.response.data;
    if (error) {
      dispatch({
        type: AUTH_ERRORS,
        payload: { type: 'login', message: error.message }
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
    toast.success(res.data.message, { position: toast.POSITION.TOP_CENTER });
    hideRegister();
    showLogin();
  } catch (err) {
    const error = err.response.data;
    if (error) {
      dispatch({
        type: AUTH_ERRORS,
        payload: { type: 'register', message: error.message }
      });
    }
    return false;
  }
}

// Change info
export const changeInfo = ({ name, email }, setEdit) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email });
  try {
    const res = await axios.put('/api/auth/info', body, config);
    dispatch(loadUser());
    setEdit(false);
    toast.success(res.data.message, { position: toast.POSITION.TOP_CENTER });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      dispatch({
        type: UPDATE_PROFILE_ERRORS,
        payload: { type: 'changeInfo', message: error.message }
      });
    }
  }
}

// Change password
export const changePassword = ({ currentPassword, newPassword }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ currentPassword, newPassword });
  try {
    const res = await axios.put('/api/auth/password', body, config);
    dispatch(loadUser());
    toast.success(res.data.message, { position: toast.POSITION.TOP_CENTER });
    return true;
  } catch (err) {
    const error = err.response.data;
    if (error) {
      dispatch({
        type: UPDATE_PROFILE_ERRORS,
        payload: { type: 'changePassword', message: error.message }
      });
    }
  }
}

// Forgot password
export const forgotPassword = ({ email }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email });
  try {
    const res = await axios.put('/api/auth/forgotpassword', body, config);
    dispatch({
      type: SEND_FORGOT_MAIL_SUCCESS
    });
    toast.success(res.data.message, { position: toast.POSITION.TOP_CENTER });
    return true;
  } catch (err) {
    const error = err.response.data;
    if (error) {
      dispatch({
        type: FORGOT_PASSWORD_ERROR,
        payload: { type: 'forgotPassWord', message: error.message }
      });
    }
  }
}

// Reset password
export const resetPassword = ({ password, resetPasswordLink }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ password, resetPasswordLink });
  try {
    const res = await axios.put('/api/auth/resetpassword', body, config);
    dispatch({
      type: RESET_PASSWORD_SUCCESS
    });
    toast.success(res.data.message, { position: toast.POSITION.TOP_CENTER });
    return true;
  } catch (err) {
    const error = err.response.data;
    if (error) {
      dispatch({
        type: RESET_PASSWORD_ERROR,
        payload: { type: 'resetPassword', message: error.message }
      });
    }
  }
}

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOG_OUT });
};
