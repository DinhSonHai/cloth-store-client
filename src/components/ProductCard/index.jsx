import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

ProductCard.propTypes = {

};

function ProductCard({ productId, image, name, price, stock }) {
  return (
    <div className="product-card">
      <div className="product-card__img">
        <img src={image} alt="Product"></img>
        <Link to={`/products/${productId}`} className="img__link">+ Quick shop</Link>
        {stock === 0 && (<p className="img__tag">Sold out</p>)}
      </div>
      <p className="product-card__name">{name}</p>
      <p className="product-card__price">{price}</p>
    </div>
  );
}

export default ProductCard;
