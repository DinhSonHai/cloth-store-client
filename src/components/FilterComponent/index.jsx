import React, { Fragment, useState } from 'react';
// import { Link } from 'react-router-dom';
import { Arrow, SelectColorIcon, CheckBoxChecked } from '../../assets/icons';
import Slider from 'rc-slider';
import './styles.scss';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
// import PropTypes from 'prop-types';


FilterComponent.propTypes = {

};

// // A custom hook that builds on useLocation to parse
// // the query string for you.
// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

function FilterComponent({ brands, sizes, colors, filter, handleSizeFilter, handleColorFilter, handleBrandFilter, handlePriceFilter, handleAvailableFilter }) {

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

    handleSizeFilter(sizeId);
  }

  const handleColorChange = (colorId) => {
    handleColorFilter(colorId);
  }

  const handleBrandChange = (brandId) => {
    handleBrandFilter(brandId);
  }

  const handleAvailableChange = (option) => {
    handleAvailableFilter(option);
  }

  const handlePriceChange = (rangeValues) => {
    handlePriceFilter(rangeValues);
    // console.log(rangeValues)
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
              <button key={size._id} className={filter.size === size._id ? ("content content--active") : ("content")} onClick={() => handleSizeChange(size._id)}>{size.sizeName}</button>
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
              <button key={color._id} className="content" style={{ backgroundColor: color.colorName }} onClick={() => handleColorChange(color._id)}>
                {
                  filter.color === color._id ? (
                    <span className="select-color-icon">
                      <SelectColorIcon />
                    </span>
                  ) : (
                    <span className="select-color-icon">
                    </span>
                  )
                }
              </button>
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
              <div key={brand._id} className="content" onClick={() => handleBrandChange(brand._id)}>
                {/* <input id={`checkBox${index}`} type="checkbox" /> */}
                {/* <CheckBoxChecked /> */}
                {filter.brand === brand._id ? (<Fragment>
                  <label htmlFor={`checkBox${index}`} className="checkbox__label checkbox__label--checked">{brand.brand}</label>
                  <CheckBoxChecked />
                </Fragment>
                ) : (<Fragment>
                  <label htmlFor={`checkBox${index}`} className="checkbox__label">{brand.brand}</label>
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
                defaultValue={[filter.from, filter.to]}
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
            <div className="content" onClick={() => handleAvailableChange('instore')}>
              {filter.available === 'instore' ? (<Fragment>
                <div className="checkbox__label checkbox__label--checked">In-store</div>
                <CheckBoxChecked />
              </Fragment>) : (
                <Fragment>
                  <div className="checkbox__label">In-store</div>
                  <div className="checkbox--uncheck"></div>
                </Fragment>
              )}
            </div>
            <div className="content" onClick={() => handleAvailableChange('outofstock')}>
              {filter.available === 'outofstock' ? (<Fragment>
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