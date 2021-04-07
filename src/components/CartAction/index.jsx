import React from 'react';

import { CartIcon } from '../../assets/icons';

import './styles.scss';

CartAction.propTypes = {

};

function CartAction(props) {
  return (
    <div className="cart-action">
      <CartIcon />
      <span className="cart-action__oval">7</span>
    </div>
  );
}

export default CartAction;