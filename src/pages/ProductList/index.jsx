import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles.scss';
import { Arrow } from '../../assets/icons';
import ProductCard from '../../components/ProductCard';
import Spinner from '../../components/Spinner';
import { getAllProducts } from '../../redux/actions/products';

ProductList.propTypes = {
  products: PropTypes.object.isRequired,
  getAllProducts: PropTypes.func.isRequired
};

function ProductList({ products: { products }, getAllProducts }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getAllProducts();
    setLoading(false);
  }, [getAllProducts]);
  return (
    <div className="product-list">
      { loading ? (<Spinner width="200px" />) : (
        <Fragment>
          <div className="product-list__breadcrumb">
            <p>Ladies / Dresses</p>
          </div>
          <div className="product-list__main">
            <div className="main__option">
              <div className="option__category">
                <p>Category</p>
                <a href="/" className="category__type">Dresses</a>
                <div className="category__divider"></div>
                <div className="category__detail">
                  <p>Roompers / Jumpsuits</p>
                  <p>Casual dresses</p>
                  <p>Going out dresses</p>
                  <p>Party / Ocassion dresses</p>
                  <p>Mini dresses</p>
                  <p>Maxi / Midi dresses</p>
                  <p>Sets</p>
                </div>
              </div>
              <div className="option__divider"></div>
              <div className="option__filter">
                <p>Filter</p>

                {/* Size */}
                <div className="filter__size">
                  <div className="size__title">
                    <p>Size</p>
                    <span>
                      <Arrow />
                    </span>
                  </div>
                  <div className="size__content">
                    <Link to="/" className="content__s">S</Link>
                    <Link to="/" className="content__m">M</Link>
                    <Link to="/" className="content__l">L</Link>
                  </div>
                </div>

                {/* Color */}
                <div className="filter__color">
                  <p>Color</p>
                  <span>
                    <Arrow />
                  </span>
                </div>

                {/* Brand */}
                <div className="filter__brand">
                  <p>Brand</p>
                  <span>
                    <Arrow />
                  </span>
                </div>

                {/* Price */}
                <div className="filter__price">
                  <p>Price</p>
                  <span>
                    <Arrow />
                  </span>
                </div>

                {/* Available */}
                <div className="filter__available">
                  <p>Avalilable</p>
                  <span>
                    <Arrow />
                  </span>
                </div>

              </div>
            </div>

            <div className="main__content">
              <div className="content__top">
                <div className="top__sort">
                  <select>
                    <option>Sort By: Popularity</option>
                    <option>Sort By: Price Asc</option>
                    <option>Sort By: Price Desc</option>
                  </select>
                </div>
                <div className="top__pagination">
                  <button className="pagination__previous"><Arrow /></button>
                  <p className="pagination__page">1/100</p>
                  <button className="pagination__next"><Arrow /></button>
                </div>
              </div>
              <div className="content__card">
                {products.map(product => (<ProductCard key={product._id} productId={product._id} image={product.photos[0]} name={product.name} price={`$${product.price}.00`} isAvailable={true} />))}
              </div>
              <div className="content__bottom">
                <div className="bottom__pagination">
                  <button className="pagination__previous"><Arrow /></button>
                  <p className="pagination__page">1/100</p>
                  <button className="pagination__next"><Arrow /></button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  products: state.products
})

export default connect(mapStateToProps, { getAllProducts })(ProductList);