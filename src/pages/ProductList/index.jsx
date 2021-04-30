import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
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

  const typeId = match.params.typeId;
  const categoryId = query.get("categoryId");
  const q = query.get("q");
  const sort = query.get("sort");
  const page = parseInt(query.get("page"));
  // const size = query.get("size");
  // const color = query.get("color");
  // const brand = query.get("brand");
  // const from = query.get("from");
  // const to = query.get("to");
  // const available = query.get("available");

  const [categorySelected, setCategorySelected] = useState(categoryId || '');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(page || 1);
  const [sortState, setSortState] = useState(sort || 'asc');
  const [keyWord, setKeyWord] = useState(q || '');
  const [sizeState, setSizeState] = useState('');
  const [colorState, setColorState] = useState('');
  const [brandState, setBrandState] = useState('');
  const [availableState, setAvailableState] = useState(0);

  const handleCategoryClick = (_categoryId) => {
    setCategorySelected(_categoryId);
    setCurrentPage(1);

    if (typeId) {
      if (_categoryId) {
        return history.push(`/products/types/${typeId}?categoryId=${_categoryId}&sort=${sortState}&page=${1}`);
      }
      else {
        return history.push(`/products/types/${typeId}?sort=${sortState}&page=${1}`);
      }
    }
    else {
      if (_categoryId) {
        return history.push(`/products?q=${keyWord}&categoryId=${_categoryId}&sort=${sortState}&page=${1}`);
      }
      else {
        return history.push(`/products?q=${keyWord}sort=${sortState}&page=${1}`);
      }
    }
  }

  const handleSort = (type) => {
    let defaultSort = 'asc';

    if (type === 'name') {
      setSortState('name');
      defaultSort = type;
    }
    else if (type === 'asc') {
      setSortState('asc');
      defaultSort = type;
    }
    else if (type === 'desc') {
      setSortState('desc');
      defaultSort = type;
    }

    setCurrentPage(1);

    if (typeId) {
      if (categorySelected) {
        return history.push(`/products/types/${typeId}?categoryId=${categorySelected}&sort=${defaultSort}&page=${1}`);
      }
      else {
        return history.push(`/products/types/${typeId}?&sort=${defaultSort}&page=${1}`);
      }
    }
    else {
      if (categorySelected) {
        return history.push(`/products?q=${keyWord}&categoryId=${categorySelected}&sort=${defaultSort}&page=${1}`);
      }
      else {
        return history.push(`/products?q=${keyWord}&sort=${defaultSort}&page=${1}`);
      }
    }
  }

  const handleSizeFilter = (sizeId) => {
    // if (!typeId) {
    //   if (categoryId) {
    //     return history.push(`/products?q=${q}&categoryId=${categoryId}&size=${sizeId}`);
    //   }
    //   else {
    //     return history.push(`/products?q=${q}&size=${sizeId}`);
    //   }
    // }

    // if (categoryId) {
    //   return history.push(`/products/types/${typeId}?categoryId=${categoryId}&size=${sizeId}`);
    // }

    // return history.push(`/products/types/${typeId}?size=${sizeId}`);
  }

  const handlePrevPage = () => {
    let _page = currentPage - 1;
    setCurrentPage(_page);
    if (typeId) {
      if (categorySelected) {
        return history.push(`/products/types/${typeId}?categoryId=${categorySelected}&sort=${sortState}&page=${_page}`);
      }
      else {
        return history.push(`/products/types/${typeId}?&sort=${sortState}&page=${_page}`);
      }
    }
    else {
      if (categorySelected) {
        return history.push(`/products?q=${keyWord}&categoryId=${categorySelected}&sort=${sortState}&page=${_page}`);
      }
      else {
        return history.push(`/products?q=${keyWord}&sort=${sortState}&page=${_page}`);
      }
    }
  }

  const handleNextPage = () => {
    let _page = currentPage + 1;
    setCurrentPage(_page);
    if (typeId) {
      if (categorySelected) {
        return history.push(`/products/types/${typeId}?categoryId=${categorySelected}&sort=${sortState}&page=${_page}`);
      }
      else {
        return history.push(`/products/types/${typeId}?&sort=${sortState}&page=${_page}`);
      }
    }
    else {
      if (categorySelected) {
        return history.push(`/products?q=${keyWord}&categoryId=${categorySelected}&sort=${sortState}&page=${_page}`);
      }
      else {
        return history.push(`/products?q=${keyWord}&sort=${sortState}&page=${_page}`);
      }
    }
  }

  useEffect(() => {
    setLoading(true);
    if (typeId) {
      getProductsByType(typeId, categorySelected, sortState, currentPage);
      getTypeById(typeId);
      getCategoriesByType(typeId);
    }
    else {
      getSearchProducts(keyWord, categorySelected, sortState, currentPage);
    }
    getAllBrands();
    getAllSizes();
    getAllColors();
    setLoading(false);
  }, [getProductsByType, getSearchProducts, getTypeById, getCategoriesByType, getAllBrands, getAllSizes, getAllColors, typeId, categoryId, categorySelected, q, sort, page, sortState, currentPage]);

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
              <p onClick={() => handleCategoryClick('')} className={categoryId ? ("category__type") : (!categorySelected ? "category__type category--active" : "category__type")}>{type && type.typeName}</p>
            ) : (
              <p onClick={() => handleCategoryClick('')} className={categoryId ? ("category__type") : (!categorySelected ? "category__type category--active" : "category__type")}>All results</p>
            )}
            <div className="category__divider"></div>
            <div className="category__detail">
              {categories && categories.map((category, index) => (
                <p key={index} onClick={() => handleCategoryClick(category._id)} className={categorySelected === category._id ? "category--active" : ""}>{category.categoryName}</p>
              ))}
            </div>
          </div>
          <div className="option__divider"></div>

          {/* Filter */}
          {brands && sizes && colors && <FilterComponent brands={brands} sizes={sizes} colors={colors} sizeState={sizeState} setSizeState={setSizeState} handleSizeFilter={handleSizeFilter} colorState={colorState} setColorState={setColorState} brandState={brandState} setBrandState={setBrandState} availableState={availableState} setAvailableState={setAvailableState} />}

        </div>

        {loading ? <div className="spinner-container"><Spinner width="200px" /></div> : (
          products?.length > 0 ? (
            <div className="main__content">
              <div className="content__top">
                <SortBox handleSort={handleSort} sortState={sortState} setSortState={setSortState} />
                <div className="pagination">
                  <button className="pagination__previous" disabled={currentPage <= 1} onClick={handlePrevPage}><Arrow /></button>
                  {total && <p className="pagination__page">{currentPage}/{Math.ceil(total / 10)}</p>}
                  <button className="pagination__next" disabled={currentPage === Math.ceil(total / 10)} onClick={handleNextPage}><Arrow /></button>
                </div>
              </div>
              <div className="content__card">
                {products.map(product => (<ProductCard key={product._id} productId={product._id} image={product.photos[0]} name={product.name} price={`$${product.price}.00`} stock={product.quantity} />))}
              </div>
              <div className="content__bottom">
                <div className="pagination">
                  <button className="pagination__previous" disabled={currentPage <= 1} onClick={handlePrevPage}><Arrow /></button>
                  {total && <p className="pagination__page">{currentPage}/{Math.ceil(total / 10)}</p>}
                  <button className="pagination__next" disabled={currentPage === Math.ceil(total / 10)} onClick={handleNextPage}><Arrow /></button>
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