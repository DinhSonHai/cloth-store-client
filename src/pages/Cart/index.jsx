import React from 'react';

import './styles.scss';
import ImageTest from '../../assets/images/ladies-outfit.jpg';

Cart.propTypes = {

};

function Cart(props) {
  return (
    <div className="cart">
      <p className="cart__title">My Bag</p>
      <div className="cart__main">
        <div className="main__detail">
          <table className="detail__table">
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
                  <img src={ImageTest} alt="Product" />
                </td>
                <td><div className="table__color"></div></td>
                <td>S</td>
                <td>S</td>
                <td>$69.00</td>
              </tr>
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
              <p className="total__money">$6.900</p>
            </div>
            <div className="info__divider"></div>
            <div className="info__subtotal">
              <p>Subtotal</p>
              <p className="subtotal__money">$6.900</p>
            </div>
          </div>
          <button className="total__button">Check out</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;