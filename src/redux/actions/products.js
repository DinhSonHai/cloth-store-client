import axios from 'axios';
import { GET_ALL_PRODUCTS } from '../types';

// Action creator
export const getAllProducts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/products');
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      // errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      // errors.forEach((error) => console.log(error.msg));
      // dispatch({
      //   type: AUTH_ERRORS,
      //   payload: errors[0].msg
      // });
    }
  }
}