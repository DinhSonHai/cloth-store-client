import { UPDATE_CART, REMOVE_FROM_CART, GET_CART } from '../types';

const initialState = {
  isHaveCart: false,
  cart: [],
  productsCart: []
}

export default function cart (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_CART:
      return {
        ...state,
        isHaveCart: payload.isHaveCart,
        cart: payload.cart,
      };
    case GET_CART:
      return {
        ...state,
        productsCart: payload
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        isHaveCart: false,
        cart: [],
      };
    default:
      return state;
  }
}
