import React from 'react';
// import PropTypes from 'prop-types';

import './styles.scss';

CartDropdownItem.propTypes = {
  
};

function CartDropdownItem({ cartItem, productCart }) {
  return (
    <div cart-dropdown-item>
      <div className="item__img">
        <img src={productCart?.photos[0]} alt="Product"/>
      </div>
      <div className="item__info">
        <p className="info__name">{productCart?.name}</p>
        <p className="info__price">{productCart?.price}</p>
        <p className="info__detail">`${productCart?.sizes.map(item => item._id === cartItem.sizeId).sizeName}`</p>
      </div>
    </div>
  );
}

export default CartDropdownItem;