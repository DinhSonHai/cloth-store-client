import React, { Fragment } from 'react';

import { Minus, Plus } from '../../../assets/icons';
import './styles.scss';

QuantityField.propTypes = {

};

function QuantityField({ data, setData }) {

  const handleDecrement = () => {
    if (data.quantity >= 2) {
      const quantity = data.quantity - 1;
      setData({ ...data, quantity });
    }
  }

  const handleIncrement = () => {
    const quantity = data.quantity + 1;
    setData({ ...data, quantity });
  }

  return (
    <div className="quantity__field">
      { data && (
        <Fragment>
          <button onClick={handleDecrement} disabled={data.quantity < 2}><Minus /></button>
          <p>{data.quantity}</p>
          <button onClick={handleIncrement}><Plus /></button>
        </Fragment>
      )}
    </div>
  );
}

export default QuantityField;
