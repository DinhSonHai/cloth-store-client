import store from '../app/store';
import { getAllProductsCart } from '../redux/actions/products';
import { UPDATE_CART, REMOVE_FROM_CART } from '../redux/types';

// Add item to cart
export const addItemToCart = ({ productId, sizeId, colorId, quantity }) => {
  let cartCopy = JSON.parse(localStorage.getItem('cart')) || [];
  let existingItem = cartCopy.find((cartItem) => cartItem.productId === productId && cartItem.sizeId === sizeId && cartItem.colorId === colorId);
  if (existingItem) {
    existingItem.quantity = existingItem.quantity + quantity;
  } else {
    cartCopy.push({ productId, sizeId, colorId, quantity });
  }

  store.dispatch({
    type: UPDATE_CART,
    payload: { isHaveCart: true, cart: cartCopy },
  });

  let list = cartCopy.map(item => item.productId);

  store.dispatch(getAllProductsCart(list));

  localStorage.setItem('cart', JSON.stringify(cartCopy));
};

export const removeItemFromCart = ({ productId, sizeId, colorId }) => {
  let cartCopy = JSON.parse(localStorage.getItem('cart')) || [];
  let updatedCart = cartCopy.filter((item) => {
    if (item.productId !== productId) {
      return true;
    }
    else if (item.sizeId !== sizeId) {
      return true;
    }
    else if (item.colorId !== colorId) {
      return true;
    }
    return false;
  });

  if (updatedCart.length <= 0) {
    store.dispatch({
      type: REMOVE_FROM_CART,
    });
  }
  else {
    store.dispatch({
      type: UPDATE_CART,
      payload: {
        isHaveCart: true,
        cart: updatedCart,
      },
    });

    // let list = updatedCart.map(item => item.productId);

    // store.dispatch(getAllProductsCart(list));
  }
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};

// Update cart
export const updateCart = ({ productId, sizeId, colorId, quantity }) => {
  let cartCopy = JSON.parse(localStorage.getItem('cart')) || [];
  let existingItem = cartCopy.find((cartItem) => cartItem.productId === productId && cartItem.sizeId === sizeId && cartItem.colorId === colorId);
  if (existingItem) {
    existingItem.quantity = quantity;
  } else {
    cartCopy.push({ productId, sizeId, colorId, quantity });
  }

  store.dispatch({
    type: UPDATE_CART,
    payload: { isHaveCart: true, cart: cartCopy },
  });

  // let list = cartCopy.map(item => item.productId);

  // store.dispatch(getAllProductsCart(list));

  localStorage.setItem('cart', JSON.stringify(cartCopy));
};

