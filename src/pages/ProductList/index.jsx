import React, { useEffect } from 'react';
import { connect } from 'react-redux';
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
            <select>
              <option defaultValue defaultValue>Size</option>
              <option>X</option>
              <option>M</option>
              <option>L</option>
            </select>

            {/* Color */}
            <select>
              <option defaultValue>Color</option>
              <option>X</option>
              <option>M</option>
              <option>L</option>
            </select>

            {/* Brand */}
            <select>
              <option defaultValue>Brand</option>
              <option>X</option>
              <option>M</option>
              <option>L</option>
            </select>

            {/* Price */}
            <select>
              <option defaultValue>Price</option>
              <option>X</option>
              <option>M</option>
              <option>L</option>
            </select>

            {/* Availabel */}
            <select>
              <option defaultValue>Available</option>
              <option>X</option>
              <option>M</option>
              <option>L</option>
            </select>

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
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  products: state.products.products
})

export default connect(mapStateToProps, { getAllProducts })(ProductList);