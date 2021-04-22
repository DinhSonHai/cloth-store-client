import {
  GET_ALL_PRODUCTS,
  GET_PRODUCTS_BY_TYPE,
  GET_SEARCH_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GET_TYPE_BY_ID,
  GET_CATEGORIES_BY_TYPE,
  GET_SEARCH_CATEGORIES,
  GET_PRODUCTS_BY_BRAND
} from '../types';

const initialState = {
  products: [],
  total: 0,
  product: null,
  type: null,
  categories: [],
  brandProducts: []
};

export default function products(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_PRODUCTS:
    case GET_PRODUCTS_BY_TYPE:
    case GET_SEARCH_PRODUCTS:
      return {
        ...state,
        products: payload,
        total: payload.length
      }
    case GET_PRODUCTS_BY_BRAND:
      return {
        ...state,
        brandProducts: payload
      }
    case GET_TYPE_BY_ID:
      return {
        ...state,
        type: payload
      }
    case GET_CATEGORIES_BY_TYPE:
    case GET_SEARCH_CATEGORIES:
      return {
        ...state,
        categories: payload
      }
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        product: payload
      }
    default:
      return state;
  }
}
