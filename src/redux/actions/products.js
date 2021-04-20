import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_ALL_PRODUCTS, GET_PRODUCTS_BY_TYPE, GET_PRODUCT_BY_ID, GET_CART, REMOVE_FROM_CART, GET_TYPE_BY_ID, GET_CATEGORIES_BY_TYPE, GET_PRODUCTS_BY_BRAND } from '../types';

// Action creator
export const getAllProducts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/products');
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}

export const getProductsByType = (typeId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/types/${typeId}`);
    dispatch({
      type: GET_PRODUCTS_BY_TYPE,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}

export const getProductsByBrand = (productId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/brands/${productId}`);
    dispatch({
      type: GET_PRODUCTS_BY_BRAND,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}

export const getCategoriesByType = (typeId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/categories/types/${typeId}`);
    dispatch({
      type: GET_CATEGORIES_BY_TYPE,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
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
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
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
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}

export const getTypeById = (typeId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/types/${typeId}`);
    dispatch({
      type: GET_TYPE_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
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
    await axios.post(`/api/reviews/${productId}/review`, body, config);
    dispatch(getProductById(productId));
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}

export const editReview = (productId, reviewId, { title, comment, starRatings }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ title, comment, starRatings });
  try {
    await axios.put(`/api/reviews/${productId}/review/${reviewId}`, body, config);
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
    await axios.delete(`/api/reviews/${productId}/review/${reviewId}`);
    dispatch(getProductById(productId));
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}

export const checkOut = (detail) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ detail });
  try {
    const res = await axios.post(`/api/orders`, body, config);
    toast.success(res.data.message);
    localStorage.cart = JSON.stringify([]);
    dispatch({ type: REMOVE_FROM_CART });
    return true;
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}