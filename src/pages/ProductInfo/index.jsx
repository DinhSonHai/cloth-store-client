import React, { Fragment, useEffect, useState } from 'react';
import ReactStars from "react-rating-stars-component";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './styles.scss';
import { getProductById } from '../../redux/actions/products';
import Spinner from '../../components/Spinner';

ProductInfo.propTypes = {
  products: PropTypes.object.isRequired,
  getProductById: PropTypes.func.isRequired
};

function ProductInfo({ match, products: { product }, getProductById }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getProductById(match.params.productId);
    setLoading(false);
  }, [getProductById, match.params.productId]);

  const handleThumbailCLick = (e) => {
    document.getElementById("main-img").src = e.target.src;
  }

  return (
    <div className="product-info">
      { loading ? (<Spinner width="200px" />) : (
        <Fragment>
          <div className="product-info__breadcrumb">
            <p>Ladies / Dresses / { product?.name }</p>
          </div>
          <div className="product-info__main">
            <div className="product-info__thumbnail">
              { product?.photos.map((photo, index) => (
                <div key={index} className="product-info__element">
                  <img src={photo} alt="Product thumbnail" onClick={handleThumbailCLick}/>
                </div>
              )) }
            </div>

            <div className="product-info__img">
                <img id="main-img" src={product?.photos[0]} alt="Product main photo"/>
            </div>
            
            <div className="product-info__product">
              <p className="product__title">{product?.name}</p>
              <p className="product__price">{`$${product?.price || 0}.00`}</p>
              <div className="product__rating">
                { product && (
                    <Fragment>                      
                      <ReactStars
                        count={5}
                        edit={false}
                        size={20}
                        color="#d4d3d3"
                        activeColor="#ffd543"
                        value={product.starsCount}
                        isHalf={true}
                      />
                      <div className="rating__divider"></div>
                    </Fragment>
                ) }
                <p className="rating__count">{product?.reviewsCount} Review</p>
              </div>
              <div className="product__size">
                  <p className="size__title">Size</p>
              </div>
              <div className="product__color">
                  <p className="color__title">Color</p>
              </div>
              <div className="product__quantity">
                  <p className="quantity-title">Quantity</p>
              </div>
              <button className="product__add-cart">Add to cart</button>
              <div className="product__divider"></div>
              <p className="product__description">{product?.description}</p>
            </div>

            <div className="same-brand">

            </div>
          </div>
        </Fragment>
      ) }
    </div>
  );
}

const mapStateToProps = (state) => ({
  products: state.products
})

export default connect(mapStateToProps, { getProductById })(ProductInfo);
