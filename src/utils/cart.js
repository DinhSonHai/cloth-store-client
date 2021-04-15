import store from '../app/store';
import { UPDATE_CART } from '../redux/types';

// Add item to cart
export const addItemToCart = ({ productId, sizeId, colorId, quantity}) => {
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

  localStorage.setItem('cart', JSON.stringify(cartCopy));
  return true;
};

// export const removeItem = (_id) => {
//   let cart = JSON.parse(localStorage.getItem('cart'));
//   let updatedCart = cart.filter((item) => {
//     return item._id !== _id;
//   });
//   if (updatedCart.length <= 0) {
//     store.dispatch({
//       type: REMOVE_CART,
//     });
//   } else {
//     store.dispatch({
//       type: UPDATE_CART,
//       payload: {
//         isHaveCart: true,
//         cartState: updatedCart,
//       },
//     });
//   }
//   localStorage.setItem('cart', JSON.stringify(updatedCart));
// };

// export const setAmount = (_id, value) => {
//   if (!value || isNaN(value) || !Number.isInteger(value)) {
//     return message.error('Số lượng không hợp lệ!');
//   }
//   if (value > 100) {
//     return message.error('Số lượng phải nhỏ hơn 100!');
//   }
//   let cart = JSON.parse(localStorage.getItem('cart'));
//   let updatedCart = cart.map((item) => {
//     return item._id === _id ? { ...item, amount: value } : item;
//   });
//   store.dispatch({
//     type: UPDATE_CART,
//     payload: { isHaveCart: true, cartState: updatedCart },
//   });
//   localStorage.setItem('cart', JSON.stringify(updatedCart));
// };

