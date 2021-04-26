import React, { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Arrow, SelectColorIcon } from '../../assets/icons';
import Slider from 'rc-slider';
import './styles.scss';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
// import PropTypes from 'prop-types';


FilterComponent.propTypes = {

};

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function FilterComponent({ brands, sizes, colors }) {

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
        <div className="border" onClick={handleOpenSize} style={{ borderBottom: isOpenSize ? "2px dashed var(--pinkish-grey)" : "0.5px solid var(--pinkish-grey)" }}>
          <div className="title">
            <p>Size</p>
            <span className={isOpenSize ? "rotate" : ""}>
              <Arrow />
            </span>
          </div>
        </div>
        {isOpenSize && (
          <div className="size__content">
            { sizes.map(size => (
              <Link to="/" className="content">{size.sizeName}</Link>
            ))}
          </div>
        )}
      </div>

      {/* Color */}
      <div className="filter">
        <div className="border" onClick={handleOpenColor} style={{ borderBottom: isOpenColor ? "2px dashed var(--pinkish-grey)" : "0.5px solid var(--pinkish-grey)" }}>
          <div className="title">
            <p>Color</p>
            <span className={isOpenColor ? "rotate" : ""}>
              <Arrow />
            </span>
          </div>
        </div>
        {isOpenColor && (
          <div className="color__content">
            { colors.map(color => (
              <Link to="/" className="content" style={{ backgroundColor: color.colorName }}>

              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Brand */}
      <div className="filter">
        <div className="border" onClick={handleOpenBrand} style={{ borderBottom: isOpenBrand ? "2px dashed var(--pinkish-grey)" : "0.5px solid var(--pinkish-grey)" }}>
          <div className="title">
            <p>Brand</p>
            <span className={isOpenBrand ? "rotate" : ""}>
              <Arrow />
            </span>
          </div>
        </div>
        {isOpenBrand && (
          <div className="brand__content">
            { brands.map(brand => (
              <Link to="/" className="content">
                {brand.brand}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Price */}
      <div className="filter">
        <div className="border" onClick={handleOpenPrice} style={{ borderBottom: isOpenPrice ? "2px dashed var(--pinkish-grey)" : "0.5px solid var(--pinkish-grey)" }}>
          <div className="title">
            <p>Price</p>
            <span className={isOpenPrice ? "rotate" : ""}>
              <Arrow />
            </span>
          </div>
        </div>
        {isOpenPrice && (
          <div className="price__content">
            <div className="slider">
              <Range
                marks={{
                  0: `$0`,
                  300: `$300`
                }}
                min={0}
                max={300}
                defaultValue={[0, 300]}
                tipFormatter={value => `$${value}`}
                tipProps={{
                  placement: "bottom",
                  visible: true
                }}
                railStyle={{ backgroundColor: "#808080" }}
                trackStyle={[{ backgroundColor: "#ffa15f" }]}
                handleStyle={{ backgroundColor: "#ffa15f", border: "none" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Available */}
      <div className="filter">
        <div className="border" onClick={handleOpenAvailable} style={{ borderBottom: isOpenAvailable ? "2px dashed var(--pinkish-grey)" : "0.5px solid var(--pinkish-grey)" }}>
          <div className="title">
            <p>Available</p>
            <span className={isOpenAvailable ? "rotate" : ""}>
              <Arrow />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterComponent;