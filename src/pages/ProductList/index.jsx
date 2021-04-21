import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';

import './styles.scss';
import { Arrow } from '../../assets/icons';
import ProductCard from '../../components/ProductCard';
import Spinner from '../../components/Spinner';
import { getProductsByType, getTypeById, getCategoriesByType } from '../../redux/actions/products';

ProductList.propTypes = {
};

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ProductList({ match, products, type, categories, getProductsByType, getTypeById, getCategoriesByType }) {
  let query = useQuery();
  const history = useHistory();

  const [isSelected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);

  let categoryId = query.get("categoryId");

  useEffect(() => {
    setLoading(true);
    getProductsByType(match.params.typeId, categoryId);
    getTypeById(match.params.typeId);
    getCategoriesByType(match.params.typeId);
    setLoading(false);
  }, [getProductsByType, getTypeById, getCategoriesByType, match.params.typeId, categoryId]);

  const handleCategoryClick = (option, categoryId) => {
    setSelected(option);
    if (option === 0) {
      return history.push(`/products/types/${match.params.typeId}`);
    }

    return history.push(`/products/types/${match.params.typeId}?categoryId=${categoryId}`);
  }

  return (
    <div className="product-list">
      <div className="product-list__breadcrumb">
        <p>{type && type.collectionId.collectionName} / <span onClick={() => handleCategoryClick(0)} className="link">{type && type.typeName}</span></p>
      </div>
      <div className="product-list__main">
        <div className="main__option">
          <div className="option__category">
            <p className="category__title">Category</p>
            <p onClick={() => handleCategoryClick(0)} className={isSelected === 0 ? "category__type category--active" : "category__type"}>{type && type.typeName}</p>
            <div className="category__divider"></div>
            <div className="category__detail">
              {categories && categories.map((category, index) => (
                <p onClick={() => handleCategoryClick(index + 1, category._id)} className={isSelected === index + 1 ? "category--active" : ""}>{category.categoryName}</p>
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