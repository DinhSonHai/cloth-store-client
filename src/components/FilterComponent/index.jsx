import React, { Fragment, useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Arrow, SelectColorIcon, CheckBoxChecked } from '../../assets/icons';
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

function FilterComponent({ brands, sizes, colors, sizeState, handleSizeFilter, setSizeState, colorState, setColorState, brandState, setBrandState, availableState, setAvailableState }) {

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

  const handleSizeChange = (sizeId) => {
    setSizeState(sizeId);
    handleColorChange('');
    handleBrandChange('');
    handleColorChange('');
    handleAvailableChange(0);
    handleSizeFilter(sizeId);
  }

  const handleColorChange = (colorId) => {
    setColorState(colorId);
  }

  const handleBrandChange = (brandId) => {
    setBrandState(brandId);
  }

  const handleAvailableChange = (option) => {
    setAvailableState(option);
  }

  const handlePriceChange = (rangeValues) => {
    console.log(rangeValues)
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
              <button className={sizeState === size._id ? ("content content--active") : ("content")} onClick={() => handleSizeChange(size._id)}>{size.sizeName}</button>
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
              <Link className="content" style={{ backgroundColor: color.colorName }} onClick={() => handleColorChange(color._id)}>
                {
                  colorState === color._id ? (
                    <span className="select-color-icon">
                      <SelectColorIcon />
                    </span>
                  ) : (
                    <span className="select-color-icon">
                    </span>
                  )
                }
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
            { brands.map((brand, index) => (
              // <Link to="/" className="content">
              //   {brand.brand}
              // </Link>
              <div className="content" onClick={() => handleBrandChange(brand._id)}>
                {/* <input id={`checkBox${index}`} type="checkbox" /> */}
                {/* <CheckBoxChecked /> */}
                {brandState === brand._id ? (<Fragment>
                  <label for={`checkBox${index}`} className="checkbox__label checkbox__label--checked">{brand.brand}</label>
                  <CheckBoxChecked />
                </Fragment>
                ) : (<Fragment>
                  <label for={`checkBox${index}`} className="checkbox__label">{brand.brand}</label>
                  <div className="checkbox--uncheck"></div>
                </Fragment>
                )}
              </div>
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
                onAfterChange={handlePriceChange}
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
        {isOpenAvailable && (
          <div className="available__content">
            <div className="content" onClick={() => handleAvailableChange(1)}>
              {availableState === 1 ? (<Fragment>
                <div className="checkbox__label checkbox__label--checked">In-store</div>
                <CheckBoxChecked />
              </Fragment>) : (
                <Fragment>
                  <div className="checkbox__label">In-store</div>
                  <div className="checkbox--uncheck"></div>
                </Fragment>
              )}
            </div>
            <div className="content" onClick={() => handleAvailableChange(2)}>
              {availableState === 2 ? (<Fragment>
                <div className="checkbox__label checkbox__label--checked">Out of stock</div>
                <CheckBoxChecked />
              </Fragment>) : (
                <Fragment>
                  <div className="checkbox__label">Out of stock</div>
                  <div className="checkbox--uncheck"></div>
                </Fragment>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterComponent;