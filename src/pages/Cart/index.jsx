import React from 'react';

import './styles.scss';

Cart.propTypes = {

};

function Cart(props) {
  return (
    <div className="cart">
      <p className="cart__title">My Bag</p>
      <div className="cart__main">
        <div className="cart__main__detail">
          <table className="cart__main__detail__table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Color</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>

                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="cart__main__total">
          <p className="cart__main__total__title">Total</p>
          <div className="cart__main__total__info">
            <div className="cart__main__total__info__ship">
              <p>Shipping & Handling: </p>
              <p className="cart__main__total__info__ship__fee">Free</p>
            </div>
            <div className="cart__main__total__info__total">
              <p>Total product: </p>
              <p className="cart__main__total__info__total__money">$6.900</p>
            </div>
            <div className="cart__main__total__info__divider"></div>
            <div className="cart__main__total__info__subtotal">
              <p>Subtotal</p>
              <p className="cart__main__total__info__subtotal__money">$6.900</p>
            </div>
          </div>
          <button className="cart__main__total__button">Check out</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;