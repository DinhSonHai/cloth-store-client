import React from 'react';

import { Minus, Plus } from '../../../assets/icons';
import './styles.scss';

QuantityField.propTypes = {
  
};

function QuantityField(props) {
  return (
    <div className="quantity__field">
      <button><Minus /></button>
      <p>0</p>
      <button><Plus /></button>
    </div>
  );
}

export default QuantityField;
