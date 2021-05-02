import React from 'react';

import { Minus, Plus } from '../../../assets/icons';
import './styles.scss';

QuantityBox.propTypes = {

};

function QuantityBox({ quantity, setQuantity, handleChange }) {

  const handleDecrement = () => {
    if (quantity >= 2) {
      let newQuantity = quantity - 1;
      handleChange(newQuantity);
      setQuantity(newQuantity);
    }
  }

  const handleIncrement = () => {
    let newQuantity = quantity + 1;
    handleChange(newQuantity);
    setQuantity(newQuantity);
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
