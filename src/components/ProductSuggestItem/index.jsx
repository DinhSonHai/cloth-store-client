import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import './styles.scss';

ProductSuggestItem.propTypes = {

};

function ProductSuggestItem({ to, photo, name }) {
  return (
    <Link to={to} className="suggest-item">
      <img src={photo} alt="Product same brand" />
      <p className="item__name">{name}</p>
    </Link>
  );
}

export default ProductSuggestItem;
