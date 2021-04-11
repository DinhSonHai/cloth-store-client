import axios from 'axios';
import { REGISTER_SUCCESS, LOGIN_SUCCESS, AUTH_ERRORS } from '../types';
import { toast } from 'react-toastify';

// Action creator
export const login = ({ email, password }) => async (dispatch) => {
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
    alert('Login success');
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


// Not action creator
export const register = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/auth/signup', formData, config);
    toast.success(res.data.message);
    dispatch({
      type: REGISTER_SUCCESS
    })
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      dispatch({
        type: AUTH_ERRORS,
        payload: { type: 'register', msg: errors[0].msg }
      });
    }
  }
}
