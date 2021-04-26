import { combineReducers } from 'redux';
import auth from './auth';
import products from './products';
import cart from './cart';
import orders from './orders';
import collections from './collections';
import brands from './brands';
import sizes from './sizes';
import colors from './colors';

export default combineReducers({
  auth,
  products,
  cart,
  orders,
  collections,
  brands,
  sizes,
  colors
});
