import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Arrow } from '../../assets/icons';
// import PropTypes from 'prop-types';

import './styles.scss';

FilterComponent.propTypes = {

};

function FilterComponent(props) {
  const [isOpenSize, setOpenSize] = useState(false);
  const [isOpenColor, setOpenColor] = useState(false);
  const [isOpenBrand, setOpenBrand] = useState(false);
  const [isOpenPrice, setOpenPrice] = useState(false);
  const [isOpenAvailable, setOpenAvailable] = useState(false);

  const handleOpenSize = () => {
    setOpenSize(!isOpenSize)
  }

  const handleOpenColor = () => {
    setOpenColor(!isOpenColor)
  }

  const handleOpenBrand = () => {
    setOpenBrand(!isOpenBrand)
  }

  const handleOpenPrice = () => {
    setOpenPrice(!isOpenPrice)
  }

  const handleOpenAvailable = () => {
    setOpenAvailable(!isOpenAvailable)
  }

  return (
    <div className="filter-component">
      <p className="filter__title">Filter</p>

      {/* Size */}
      <div className="filter">
        <div className="border" onClick={handleOpenSize} style={{ borderBottom: isOpenSize ? "0.5px dashed var(--pinkish-grey)" : "0.5px solid var(--pinkish-grey)" }}>
          <div className="title">
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
      <div className="filter">
        <div className="border" onClick={handleOpenColor} style={{ borderBottom: isOpenSize ? "0.5px dashed var(--pinkish-grey)" : "0.5px solid var(--pinkish-grey)" }}>
          <div className="title">
            <p>Color</p>
            <span>
              <Arrow />
            </span>
          </div>
        </div>
      </div>

      {/* Brand */}
      <div className="filter">
        <div className="border" onClick={handleOpenBrand} style={{ borderBottom: isOpenSize ? "0.5px dashed var(--pinkish-grey)" : "0.5px solid var(--pinkish-grey)" }}>
          <div className="title">
            <p>Brand</p>
            <span>
              <Arrow />
            </span>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="filter">
        <div className="border" onClick={handleOpenPrice} style={{ borderBottom: isOpenSize ? "0.5px dashed var(--pinkish-grey)" : "0.5px solid var(--pinkish-grey)" }}>
          <div className="title">
            <p>Price</p>
            <span>
              <Arrow />
            </span>
          </div>
        </div>
      </div>

      {/* Available */}
      <div className="filter">
        <div className="border" onClick={handleOpenAvailable} style={{ borderBottom: isOpenSize ? "0.5px dashed var(--pinkish-grey)" : "0.5px solid var(--pinkish-grey)" }}>
          <div className="title">
            <p>Available</p>
            <span>
              <Arrow />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterComponent;