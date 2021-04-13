import {
  GET_ALL_PRODUCTS
} from '../types';

const initialState = {
  products: [],
  total: 0,
  product: null,
  loading: true
};

export default function products(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: payload,
        total: payload.total,
        loading: false
      }
    default:
      return state;
  }
}
