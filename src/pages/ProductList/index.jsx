import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import './styles.scss';
import { Arrow } from '../../assets/icons';
import ProductCard from '../../components/ProductCard';
import Spinner from '../../components/Spinner';
import { getProductsByType, getTypeById, getCategoriesByType } from '../../redux/actions/products';

ProductList.propTypes = {
};

function ProductList({ match, products, type, categories, getProductsByType, getTypeById, getCategoriesByType }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getProductsByType(match.params.typeId);
    getTypeById(match.params.typeId);
    getCategoriesByType(match.params.typeId);
    setLoading(false);
  }, [getProductsByType, match.params.typeId]);
  return (
    <div className="product-list">
      <div className="product-list__breadcrumb">
        <p>{type && type.collectionId.collectionName} / {type && type.typeName}</p>
      </div>
      <div className="product-list__main">
        <div className="main__option">
          <div className="option__category">
            <p>Category</p>
            <p className="category__type">{type && type.typeName}</p>
            <div className="category__divider"></div>
            <div className="category__detail">
              {categories && categories.map(category => (
                <p>{category.categoryName}</p>
              ))}
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

        {loading ? <div className="spinner-container"><Spinner width="200px" /></div> : (
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
              {products.map(product => (<ProductCard key={product._id} productId={product._id} image={product.photos[0]} name={product.name} price={`$${product.price}.00`} stock={product.quantity} />))}
            </div>
            <div className="content__bottom">
              <div className="bottom__pagination">
                <button className="pagination__previous"><Arrow /></button>
                <p className="pagination__page">1/100</p>
                <button className="pagination__next"><Arrow /></button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  collections: state.collections.collections,
  products: state.products.products,
  type: state.products.type,
  categories: state.products.categories
})

export default connect(mapStateToProps, { getProductsByType, getTypeById, getCategoriesByType })(ProductList);