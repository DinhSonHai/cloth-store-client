import React, { useState } from 'react';
import { addItemToCart, removeItemFromCart } from '../../../utils/cart';
import QuantityBox from '../QuantityBox';
import { toast } from 'react-toastify';
// import PropTypes from 'prop-types';

import './styles.scss';

TableRow.propTypes = {
  
};

function TableRow({ cartItem, productCart }) {
  const [quantity, setQuantity] = useState(cartItem.quantity || 0);
  
  const handleChange = () => {
    const result = addItemToCart({ ...cartItem, quantity });
    if (result) {
      toast.success('Updated cart', { position: toast.POSITION.TOP_CENTER})
    }
  }
  const handleRemove = () => {
    removeItemFromCart(cartItem);
  }

  return (
    <tr className="table-row">
      <td style={{ width: '32%' }}>
        <div className="table-row__product-image">
          <img src={productCart?.photos[0]} alt=""/>
          <div className="table-row__product">
            <p className="product__name">{productCart?.name}</p>
            <div className="product__action">
              <button onClick={handleChange}>Change</button>
              <div className="action__divider"></div>
              <button onClick={handleRemove}>Remove</button>
            </div>
          </div>
        </div>
      </td>
      <td style={{ width: '12%' }}>
        <div className="table-row__color">
          <div className="color__demo" style={{ backgroundColor: `${productCart?.colors.find(item => item._id === cartItem?.colorId).colorName}`}}></div>
        </div>
      </td>
      <td style={{ width: '17%' }}>
        <div className="table-row__size">
          <p className="size__name">{productCart?.sizes.find(item => item._id === cartItem?.sizeId).sizeName}</p>
        </div>
      </td>
      <td >
        <div className="table-row__quantity">
          <QuantityBox quantity={quantity} setQuantity={setQuantity}/>
        </div>
      </td>
      <td>
        <div className="table-row__amount">
          <p className="amount">${cartItem?.quantity * productCart?.price}.00</p>
        </div>
      </td>
    </tr>
  );
}

export default TableRow;