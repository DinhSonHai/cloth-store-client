import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';

import './styles.scss';
import { Arrow } from '../../assets/icons';
import ProductCard from '../../components/ProductCard';
import Spinner from '../../components/Spinner';
import { getProductsByType, getTypeById, getCategoriesByType, getSearchProducts } from '../../redux/actions/products';
import SortBox from '../../components/CustomFields/SortBox';
// import FilterComponent from '../../components/FilterComponent';

ProductList.propTypes = {
};

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ProductList({ match, products, type, categories, getProductsByType, getTypeById, getCategoriesByType, getSearchProducts }) {
  const query = useQuery();
  const history = useHistory();

  const [isSelected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortState, setSortState] = useState('Price: Asc');

  const typeId = match.params.typeId;
  const categoryId = query.get("categoryId");
  const sort = query.get("sort");
  const q = query.get("q");

  useEffect(() => {
    setLoading(true);
    if (typeId) {
      getProductsByType(typeId, categoryId, sort);
      getTypeById(typeId);
      getCategoriesByType(typeId);
    }
    else {
      getSearchProducts(q, categoryId, sort);
    }
    setLoading(false);
  }, [getProductsByType, getTypeById, getCategoriesByType, typeId, q, categoryId, sort]);

  const handleCategoryClick = (option, categoryId) => {
    setSelected(option);
    setSortState('Price: Asc');

    if (!typeId) {
      if (categoryId) {
        return history.push(`/products?q=${q}&categoryId=${categoryId}`);
      }
      else {
        return history.push(`/products?q=${q}`);
      }
    }

    if (categoryId) {
      return history.push(`/products/types/${typeId}?categoryId=${categoryId}`);
    }

    return history.push(`/products/types/${typeId}`);
  }

  const handleSort = (type) => {
    if (!typeId) {
      if (categoryId) {
        return history.push(`/products?q=${q}&categoryId=${categoryId}&sort=${type}`);
      }
      else {
        return history.push(`/products?q=${q}&sort=${type}`);
      }
    }

    if (categoryId) {
      return history.push(`/products/types/${typeId}?categoryId=${categoryId}&sort=${type}`);
    }

    return history.push(`/products/types/${typeId}?sort=${type}`);
  }

  return (
    <div className="product-list">
      <div className="product-list__breadcrumb">
        {typeId ? (
          <p>{type && type.collectionId.collectionName} / <span onClick={() => handleCategoryClick(0)} className="link">{type && type.typeName}</span></p>
        ) : (
          <p>Search results</p>
        )}

      </div>
      <div className="product-list__main">
        <div className="main__option">
          <div className="option__category">
            <p className="category__title">Category</p>
            {typeId ? (
              <p onClick={() => handleCategoryClick(0)} className={isSelected === 0 ? "category__type category--active" : "category__type"}>{type && type.typeName}</p>
            ) : (
              <p onClick={() => handleCategoryClick(0)} className={isSelected === 0 ? "category__type category--active" : "category__type"}>All results</p>
            )}
            <div className="category__divider"></div>
            <div className="category__detail">
              {categories && categories.map((category, index) => (
                <p key={index} onClick={() => handleCategoryClick(index + 1, category._id)} className={isSelected === index + 1 ? "category--active" : ""}>{category.categoryName}</p>
              ))}
            </div>
          </div>
          <div className="option__divider"></div>

          {/* Filter */}
          {/* <FilterComponent /> */}

        </div>

        {loading ? <div className="spinner-container"><Spinner width="200px" /></div> : (
          products?.length > 0 ? (
            <div className="main__content">
              <div className="content__top">
                <SortBox handleSort={handleSort} sortState={sortState} setSortState={setSortState} />
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
          ) : (
            <p className="no-result">No result found</p>
          )

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

export default connect(mapStateToProps, { getProductsByType, getTypeById, getCategoriesByType, getSearchProducts })(ProductList);