import { combineReducers } from 'redux';
import auth from './auth';
import products from './products';
import cart from './cart';
import orders from './orders';
import collections from './collections';

export default combineReducers({
  auth,
  products,
  cart,
  orders,
  collections
});
