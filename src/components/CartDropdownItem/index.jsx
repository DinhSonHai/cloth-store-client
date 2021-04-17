import React from 'react';
// import PropTypes from 'prop-types';

import './styles.scss';

CartDropdownItem.propTypes = {

};

function CartDropdownItem({ cartItem, productCart }) {
  return (
    <div className="cart-dropdown-item">
      <div className="item__img">
        <img src={productCart?.photos[0]} alt="Product" />
      </div>
      <div className="item__info">
        <p className="info__name">{productCart?.name}</p>
        <div className="second-row">
          <p className="info__price">${productCart?.price}</p>
          <p className="info__detail">{productCart?.sizes.find(item => item._id === cartItem.sizeId).sizeName} &#183; {productCart?.colors.find(item => item._id === cartItem.colorId).colorName} &#183; {cartItem.quantity}</p>
        </div>
      </div>
    </div>
  );
}

export default CartDropdownItem;