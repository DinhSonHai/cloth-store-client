import React from 'react';

import './styles.scss';

ProductCard.propTypes = {

};

function ProductCard({ image, name, price, isAvailable }) {
  return (
    <div className="product-card">
      <div className="product-card__img">
        <img src={image} alt="Product"></img>
        <button className="product-card__img__button">+ Quick shop</button>
        {!isAvailable && (<p className="product-card__img__tag">Sold out</p>)}
      </div>
      <p className="product-card__name">{name}</p>
      <p className="product-card__price">{price}</p>
    </div>
  );
}

export default ProductCard;
