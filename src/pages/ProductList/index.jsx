import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';

import './styles.scss';
import { Arrow } from '../../assets/icons';
import ProductCard from '../../components/ProductCard';
import Spinner from '../../components/Spinner';
import { getProductsByType, getTypeById, getCategoriesByType, getSearchProducts } from '../../redux/actions/products';
import { getAllSizes } from '../../redux/actions/sizes';
import { getAllColors } from '../../redux/actions/colors';
import { getAllBrands } from '../../redux/actions/brands';
import SortBox from '../../components/CustomFields/SortBox';
import FilterComponent from '../../components/FilterComponent';

ProductList.propTypes = {
};

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ProductList({ match, products: { products, total }, type, categories, brands, sizes, colors, getProductsByType, getTypeById, getCategoriesByType, getSearchProducts, getAllBrands, getAllSizes, getAllColors }) {
  const query = useQuery();
  const history = useHistory();

  const [isSelected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortState, setSortState] = useState('Low to High');

  const typeId = match.params.typeId;
  const categoryId = query.get("categoryId");
  const sort = query.get("sort");
  const q = query.get("q");
  const size = query.get("size");
  const page = parseInt(query.get("page"));

  useEffect(() => {
    setLoading(true);
    if (typeId) {
      getProductsByType(typeId, categoryId, sort, page);
      getTypeById(typeId);
      getCategoriesByType(typeId);
    }
    else {
      getSearchProducts(q, categoryId, sort, page);
    }
    getAllBrands();
    getAllSizes();
    getAllColors();
    setLoading(false);
  }, [getProductsByType, getTypeById, getCategoriesByType, getAllBrands, getAllSizes, getAllColors, typeId, q, categoryId, sort, page]);

  const handleCategoryClick = (option, categoryId) => {
    setSelected(option);
    setSortState('Low to High');

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

  const handlePrevPage = () => {
    let _page = 1;
    if (page) {
      _page = page - 1;
    }
    if (_page >= 1) {
      if (!typeId) {
        if (categoryId) {
          if (sort) {
            return history.push(`/products?q=${q}&categoryId=${categoryId}&sort=${sort}&page=${_page}`);
          }
          return history.push(`/products?q=${q}&categoryId=${categoryId}&page=${_page}`);
        }
        else {
          if (sort) {
            return history.push(`/products?q=${q}&sort=${sort}&page=${_page}`);
          }
          return history.push(`/products?q=${q}&page=${_page}`);
        }
      }

      if (categoryId) {
        if (sort) {
          return history.push(`/products/types/${typeId}?categoryId=${categoryId}&sort=${sort}&page=${_page}`);
        }
        return history.push(`/products/types/${typeId}?categoryId=${categoryId}&page=${_page}`);
      }

      if (sort) {
        return history.push(`/products/types/${typeId}?&sort=${sort}&page=${_page}`);
      }

      return history.push(`/products/types/${typeId}?page=${_page}`);
    }
  }

  const handleNextPage = () => {
    let _page = 1;
    if (page) {
      _page = page + 1;
    }
    else {
      _page = _page + 1;
    }
    if (_page <= Math.ceil(total / 10)) {
      if (!typeId) {
        if (categoryId) {
          if (sort) {
            return history.push(`/products?q=${q}&categoryId=${categoryId}&sort=${sort}&page=${_page}`);
          }
          return history.push(`/products?q=${q}&categoryId=${categoryId}&page=${_page}`);
        }
        else {
          if (sort) {
            return history.push(`/products?q=${q}&sort=${sort}&page=${_page}`);
          }
          return history.push(`/products?q=${q}&page=${_page}`);
        }
      }

      if (categoryId) {
        if (sort) {
          return history.push(`/products/types/${typeId}?categoryId=${categoryId}&sort=${sort}&page=${_page}`);
        }
        return history.push(`/products/types/${typeId}?categoryId=${categoryId}&page=${_page}`);
      }

      if (sort) {
        return history.push(`/products/types/${typeId}?&sort=${sort}&page=${_page}`);
      }

      return history.push(`/products/types/${typeId}?page=${_page}`);
    }
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
              <p onClick={() => handleCategoryClick(0)} className={categoryId ? ("category__type") : (isSelected === 0 ? "category__type category--active" : "category__type")}>{type && type.typeName}</p>
            ) : (
              <p onClick={() => handleCategoryClick(0)} className={categoryId ? ("category__type") : (isSelected === 0 ? "category__type category--active" : "category__type")}>All results</p>
            )}
            <div className="category__divider"></div>
            <div className="category__detail">
              {categories && categories.map((category, index) => (
                <p key={index} onClick={() => handleCategoryClick(index + 1, category._id)} className={isSelected === index + 1 || categoryId === category._id ? "category--active" : ""}>{category.categoryName}</p>
              ))}
            </div>
          </div>
          <div className="option__divider"></div>

          {/* Filter */}
          {brands && sizes && colors && <FilterComponent brands={brands} sizes={sizes} colors={colors} />}

        </div>

        {loading ? <div className="spinner-container"><Spinner width="200px" /></div> : (
          products?.length > 0 ? (
            <div className="main__content">
              <div className="content__top">
                <SortBox handleSort={handleSort} sortState={sortState} setSortState={setSortState} />
                <div className="pagination">
                  <button className="pagination__previous" disabled={!page || page === 1} onClick={handlePrevPage}><Arrow /></button>
                  {total && <p className="pagination__page">{page ? page : 1}/{Math.ceil(total / 10)}</p>}
                  <button className="pagination__next" disabled={page === Math.ceil(total / 10)} onClick={handleNextPage}><Arrow /></button>
                </div>
              </div>
              <div className="content__card">
                {products.map(product => (<ProductCard key={product._id} productId={product._id} image={product.photos[0]} name={product.name} price={`$${product.price}.00`} stock={product.quantity} />))}
              </div>
              <div className="content__bottom">
                <div className="pagination">
                  <button className="pagination__previous" disabled={!page || page === 1}><Arrow /></button>
                  {total && <p className="pagination__page">{page ? page : 1}/{Math.ceil(total / 10)}</p>}
                  <button className="pagination__next" disabled={page === Math.ceil(total / 10)}><Arrow /></button>
                </div>
              </div>
            </div>
          ) : (
            <p className="no-result">No result found</p>
          )

        )}
      </div>
    </div >
  );
}

const mapStateToProps = (state) => ({
  collections: state.collections.collections,
  products: state.products,
  type: state.products.type,
  categories: state.products.categories,
  brands: state.brands.brands,
  sizes: state.sizes.sizes,
  colors: state.colors.colors
})

export default connect(mapStateToProps, { getProductsByType, getTypeById, getCategoriesByType, getSearchProducts, getAllBrands, getAllSizes, getAllColors })(ProductList);