import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles.scss';
import { Arrow } from '../../assets/icons';
import ProductCard from '../../components/ProductCard';
import { getAllProducts } from '../../redux/actions/products';

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  getAllProducts: PropTypes.func.isRequired
};

function ProductList({ products, getAllProducts }) {
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts])
  return (
    <div className="product-list">
      <div className="product-list__breadcumb">
        <p>Ladies / Dresses</p>
      </div>
      <div className="product-list__main">
        <div className="product-list__main__option">
          <div className="product-list__main__option__category">
            <p>Category</p>
            <a href="/" className="product-list__main__option__category__type">Dresses</a>
            <div className="product-list__main__option__category__divider"></div>
            <div className="product-list__main__option__category__detail">
              <p>Roompers / Jumpsuits</p>
              <p>Casual dresses</p>
              <p>Going out dresses</p>
              <p>Party / Ocassion dresses</p>
              <p>Mini dresses</p>
              <p>Maxi / Midi dresses</p>
              <p>Sets</p>
            </div>
          </div>
          <div className="product-list__main__option__divider"></div>
          <div className="product-list__main__option__filter">
            <p>Filter</p>

            {/* Size */}
            <div className="product-list__main__option__filter__size">
              <div className="product-list__main__option__filter__size__title">
                <p>Size</p>
                <span>
                  <Arrow />
                </span>
              </div>
              <div className="product-list__main__option__filter__size__content">
                <Link to="/" className="product-list__main__option__filter__size__content__s">S</Link>
                <Link to="/" className="product-list__main__option__filter__size__content__m">M</Link>
                <Link to="/" className="product-list__main__option__filter__size__content__l">L</Link>
              </div>
            </div>

            {/* Color */}
            <div className="product-list__main__option__filter__color">
              <p>Color</p>
              <span>
                <Arrow />
              </span>
            </div>

            {/* Brand */}
            <div className="product-list__main__option__filter__brand">
              <p>Brand</p>
              <span>
                <Arrow />
              </span>
            </div>

            {/* Price */}
            <div className="product-list__main__option__filter__price">
              <p>Price</p>
              <span>
                <Arrow />
              </span>
            </div>

            {/* Available */}
            <div className="product-list__main__option__filter__available">
              <p>Avalilable</p>
              <span>
                <Arrow />
              </span>
            </div>

          </div>
        </div>

        <div className="product-list__main__content">
          <div className="product-list__main__content__top">
            <div className="product-list__main__content__top__sort">
              <select>
                <option>Sort By: Popularity</option>
                <option>Sort By: Price Asc</option>
                <option>Sort By: Price Desc</option>
              </select>
            </div>
            <div className="product-list__main__content__top__pagination">
              <button className="product-list__main__content__top__pagination__previous"><Arrow /></button>
              <p className="product-list__main__content__top__pagination__page">1/100</p>
              <button className="product-list__main__content__top__pagination__next"><Arrow /></button>
            </div>
          </div>
          <div className="product-list__main__content__card">
            {products.map(product => (<ProductCard key={product._id} image={product.photos[0]} name={product.name} price={`$${product.price}.00`} isAvailable={true} />))}
          </div>
          <div className="product-list__main__content__bottom">
            <div className="product-list__main__content__bottom__pagination">
              <button className="product-list__main__content__bottom__pagination__previous"><Arrow /></button>
              <p className="product-list__main__content__bottom__pagination__page">1/100</p>
              <button className="product-list__main__content__bottom__pagination__next"><Arrow /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  products: state.products.products
})

export default connect(mapStateToProps, { getAllProducts })(ProductList);