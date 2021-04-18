import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { CartIcon } from '../../assets/icons';

import './styles.scss';
// import { Link } from 'react-router-dom';
import CartDropdownItem from '../CartDropdownItem';
import { getAllProductsCart } from '../../redux/actions/products';

CartAction.propTypes = {
  cart: PropTypes.object.isRequired
};

function CartAction({ cart: { cart, isHaveCart, productsCart } }) {

  useEffect(() => {
    if (cart.length > 0) {
      let list = cart.map(item => item.productId);
      getAllProductsCart(list);
    }
  }, [cart, getAllProductsCart]);

  return (
    <div className="action-cart">
      <div className="cart-action">
        <CartIcon />
        <span className="cart-action__oval">{cart?.length || 0}</span>
      </div>
      <div className="cart__dropdown">
        {cart?.length > 0 && cart.map(item => (
          <CartDropdownItem key={item.productId.concat(',', item.sizeId, ',', item.colorId)} cartItem={item} productCart={productsCart.find(productCart => productCart._id === item.productId)} />
        ))
        }
        <Link to="/cart" className="dropdown__cart">View cart</Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart
})

export default connect(mapStateToProps, { getAllProductsCart })(CartAction);