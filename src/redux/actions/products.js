import axios from 'axios';
import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID } from '../types';

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

export const getProductById = (productId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/${productId}`);
    dispatch({
      type: GET_PRODUCT_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    const errors = err?.response?.data?.errors;
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
