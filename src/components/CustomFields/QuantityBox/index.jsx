import React from 'react';

import { Minus, Plus } from '../../../assets/icons';
import './styles.scss';

QuantityBox.propTypes = {
  
};

function QuantityBox({ quantity, setQuantity }) {

  const handleDecrement = () => {
    if (quantity >= 2) {
      setQuantity(quantity - 1);
    }
  }

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  }

  return (
    <div className="quantity__field">
      <button onClick={handleDecrement} disabled={quantity < 2}><Minus /></button>
      <p>{quantity}</p>
      <button onClick={handleIncrement}><Plus /></button>
    </div>
  );
}

export default QuantityBox;
