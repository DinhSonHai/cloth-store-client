import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';
import { connect } from 'react-redux';
import { getAllProductsCart } from '../../redux/actions/products';
import Spinner from '../../components/Spinner';
import TableRow from '../../components/CustomFields/TableRow';

Cart.propTypes = {
  cart: PropTypes.object.isRequired,
  getAllProductsCart: PropTypes.func.isRequired
};

function Cart({ cart: { cart, isHaveCart, productsCart }, getAllProductsCart }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // let cartStore = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length > 0) {
      let list = cart.map(item => item.productId);
      getAllProductsCart(list);
    }
    setLoading(false);
  }, [getAllProductsCart, cart]);

  const totalMoney = cart?.reduce((total, item) => {
    const price = productsCart.find(productCart => productCart._id === item.productId)?.price;
    if (price) {
      total = total + item.quantity * price;
    }
    return total;
  }, 0)

  return (
    <div className="cart">
      { loading ? <Spinner /> : (
        cart?.length <= 0 ? (<div>No cart</div>) : (<Fragment>
          <p className="cart__title">My Bag</p>
          <div className="cart__main">
            <div className="main__detail">
              <table className="detail__table">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Product</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th style={{ textAlign: 'center' }}>Quantity</th>
                    <th style={{ textAlign: 'right' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  { cart?.length > 0 && cart.map(item => (
                    <TableRow key={item.productId.concat(',', item.sizeId, ',', item.colorId)} cartItem={item} productCart={productsCart.find(productCart => productCart._id === item.productId)}/>
                    ))
                  } 
                </tbody>
              </table>
            </div>
            <div className="main__total">
              <p className="total__title">Total</p>
              <div className="total__info">
                <div className="info__ship">
                  <p>Shipping & Handling: </p>
                  <p className="ship__fee">Free</p>
                </div>
                <div className="info__total">
                  <p>Total product: </p>
                  <p className="total__money">
                    ${totalMoney || 0}.00
                  </p>
                </div>
                <div className="info__divider"></div>
                <div className="info__subtotal">
                  <p>Subtotal</p>
                  <p className="subtotal__money">${totalMoney || 0}.00</p>
                </div>
              </div>
              <button className="total__button">Check out</button>
            </div>
          </div>
        </Fragment>)
        
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart
})

export default connect(mapStateToProps, { getAllProductsCart })(Cart);