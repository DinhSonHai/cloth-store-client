import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID, GET_CART } from '../types';

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

export const getAllProductsCart = (productIdList) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ productIdList });
  try {
    const res = await axios.post('/api/products/carts', body, config);
    dispatch({
      type: GET_CART,
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

export const review = (productId, { title, comment, starRatings }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ title, comment, starRatings });
  try {
    const res = await axios.post(`/api/reviews/${productId}/review`, body, config);
    dispatch(getProductById(productId));
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}

export const removeReview = (productId, reviewId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/reviews/${productId}/review/${reviewId}`);
    dispatch(getProductById(productId));
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}