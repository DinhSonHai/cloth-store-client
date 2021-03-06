import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { removeItemFromCart, updateCart } from '../../../utils/cart';
import QuantityBox from '../QuantityBox';
// import PropTypes from 'prop-types';

import './styles.scss';

TableRow.propTypes = {

};

function TableRow({ cartItem, productCart }) {
  const [quantity, setQuantity] = useState(cartItem.quantity || 0);

  const handleChange = (newQuantity) => {
    updateCart({ ...cartItem, quantity: newQuantity });
  }
  const handleRemove = () => {
    removeItemFromCart(cartItem);
  }

  useEffect(() => {
    setQuantity(cartItem.quantity);
  }, [cartItem]);

  return (
    <tr className="table-row">
      { productCart && (
        <Fragment>
          <td style={{ width: '32%' }}>
            <div className="table-row__product-image">
              <img src={productCart.photos[0]} alt="" />
              <div className="table-row__product">
                <Link to={`/products/${productCart._id}`} className="product__name">{productCart.name}</Link>
                <div className="product__action">
                  {/* <button onClick={handleChange}>Change</button>
              <div className="action__divider"></div> */}
                  <button onClick={handleRemove}>Remove</button>
                </div>
              </div>
            </div>
          </td>
          <td style={{ width: '12%' }}>
            <div className="table-row__color">
              <div className="color__demo" style={{ backgroundColor: `${productCart.colors.find(item => item._id === cartItem.colorId)?.colorName}` }}></div>
            </div>
          </td>
          <td style={{ width: '17%' }}>
            <div className="table-row__size">
              <p className="size__name">{productCart.sizes.find(item => item._id === cartItem.sizeId)?.sizeName}</p>
            </div>
          </td>
          <td style={{ width: '17%' }}>
            <div className="table-row__quantity">
              <QuantityBox cartItem={cartItem} quantity={quantity} setQuantity={setQuantity} handleChange={handleChange} />
            </div>
          </td>
          <td>
            <div className="table-row__amount">
              <p className="amount">${cartItem.quantity * productCart.price}.00</p>
            </div>
          </td>
        </Fragment>
      )}
    </tr>
  );
}

export default TableRow;