import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

ProductCard.propTypes = {

};

function ProductCard({ productId, image, name, price, stock }) {
  // const handleClick
  return (
    <Link to={`/products/${productId}`} className="product-card">
      <div className="product-card__img">
        <img src={image} alt="Product"></img>
        <div className="img__link">+ Quick shop</div>
        {stock === 0 && (<p className="img__tag">Sold out</p>)}
      </div>
      <p className="product-card__name">{name}</p>
      <p className="product-card__price">{price}</p>
    </Link>
  );
}

export default ProductCard;
