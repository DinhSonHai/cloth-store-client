import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import './styles.scss';

ProductSameBrandItem.propTypes = {

};

function ProductSameBrandItem({ to, photo }) {
  return (
    <Link to={to} className="product-item">
      <img src={photo} alt="Product same brand" />
    </Link>
  );
}

export default ProductSameBrandItem;
