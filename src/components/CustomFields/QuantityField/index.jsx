import React, { useState } from 'react';

import { Minus, Plus } from '../../../assets/icons';
import './styles.scss';

QuantityField.propTypes = {
  
};

function QuantityField({ data, setData }) {

  const handleDecrement = () => {
    if (data.quantity >= 2) {
      const quantity = data.quantity - 1;
      setData({...data, quantity});
    }
  }

  const handleIncrement = () => {
    const quantity = data.quantity + 1;
    setData({...data, quantity});
  }

  return (
    <div className="quantity__field">
      <button onClick={handleDecrement} disabled={data.quanity < 2}><Minus /></button>
      <p>{data.quantity}</p>
      <button onClick={handleIncrement}><Plus /></button>
    </div>
  );
}

export default QuantityField;
