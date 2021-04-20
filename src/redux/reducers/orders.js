import {
  GET_ALL_USERS_ORDERS
} from '../types';

const initialState = {
  orders: []
};

export default function orders(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_USERS_ORDERS:
      return {
        ...state,
        orders: payload
      }
    default:
      return state;
  }
}
