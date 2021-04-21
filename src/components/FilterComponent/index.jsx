import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Arrow } from '../../assets/icons';
// import PropTypes from 'prop-types';

import './styles.scss';

FilterComponent.propTypes = {

};

function FilterComponent(props) {
  const [isOpenSize, setOpenSize] = useState(true);

  const handleOpenSize = () => {
    setOpenSize(!isOpenSize)
  }

  return (
    <div className="filter">
      <p className="filter__title">Filter</p>

      {/* Size */}
      <div className="filter__size" onClick={handleOpenSize}>
        <div className="size__border" style={{ borderBottom: isOpenSize ? "0.5px dashed var(--pinkish-grey)" : "0.5px solid var(--pinkish-grey)" }}>
          <div className="size__title">
            <p>Size</p>
            <span className={isOpenSize ? "rotate" : ""}>
              <Arrow />
            </span>
          </div>
        </div>
        {isOpenSize && (

          <div className="size__content">
            <Link to="/" className="content__s">S</Link>
            <Link to="/" className="content__m">M</Link>
            <Link to="/" className="content__l">L</Link>
          </div>
        )}
      </div>

      {/* Color */}
      <div className="filter__color">
        <div className="color__title">
          <p>Color</p>
          <span>
            <Arrow />
          </span>
        </div>
      </div>

      {/* Brand */}
      <div className="filter__brand">
        <div className="brand__title">
          <p>Brand</p>
          <span>
            <Arrow />
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="filter__price">
        <div className="price__title">

          <p>Price</p>
          <span>
            <Arrow />
          </span>
        </div>
      </div>

      {/* Available */}
      <div className="filter__available">
        <div className="available__title">
          <p>Avalilable</p>
          <span>
            <Arrow />
          </span>
        </div>
      </div>
    </div>
  );
}

export default FilterComponent;