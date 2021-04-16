import React, { Fragment, useEffect, useState } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './styles.scss';
import { getProductById } from '../../redux/actions/products';
import Spinner from '../../components/Spinner';
import QuantityField from '../../components/CustomFields/QuantityField';
import Review from '../../components/Review';
import { toast } from 'react-toastify';
import { addItemToCart } from '../../utils/cart';

ProductInfo.propTypes = {
  product: PropTypes.object.isRequired,
  getProductById: PropTypes.func.isRequired
};

function ProductInfo({ match, product, getProductById }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    productId: match.params.productId,
    sizeId: '',
    colorId: '',
    quantity: 0
  });

  useEffect(() => {
    setLoading(true);
    getProductById(match.params.productId);
    setLoading(false);
  }, [getProductById, match.params.productId, data, loading]);

  const handleThumbailCLick = (e) => {
    document.getElementById("main-img").src = e.target.src;
  }

  const handleSizeChange = (sizeId, index, length) => {
    const sizes = document.getElementsByClassName("size");
    for (let i = 0; i < length; i++) {
      sizes[i].classList.remove("size--active");
    }
    sizes[index].classList.add("size--active");
    setData({...data, sizeId});
  }

  const handleColorChange = (colorId, index, length) => {
    const colors = document.getElementsByClassName("color");
    for (let i = 0; i < length; i++) {
      colors[i].classList.remove("color--active");
    }
    colors[index].classList.add("color--active");
    setData({...data, colorId});
  }
  
  const handleAddToCart = () => {
    if (!data.sizeId) {
      toast.error('Please choose size',{ position: toast.POSITION.TOP_CENTER});
    }
    if (!data.colorId) {
      toast.error('Please choose color', { position: toast.POSITION.TOP_CENTER});
    }
    if (data.quantity < 1) {
      toast.error('Please choose quantity', { position: toast.POSITION.TOP_CENTER});
    }
    if (data.sizeId && data.colorId && data.quantity) {
      const result = addItemToCart(data);
      if (result) {
        toast.success('Added to cart', { position: toast.POSITION.TOP_CENTER})
      }
    }
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
                <img id="main-img" src={product?.photos[0]} alt="Product main"/>
            </div>
            
            <div className="product-info__product">
              <p className="product__title">{product?.name}</p>
              <p className="product__price">{`$${product?.price || 0}.00`}</p>
              <div className="product__rating">    
                { product && (
                  <StarRatingComponent 
                    name="rate2" 
                    editing={false}
                    starCount={5}
                    value={product.starRatings}
                  />
                ) }              
                <div className="rating__divider"></div>
                <p className="rating__count">{product?.reviewsCount} Review</p>
              </div>
              <div className="product__size">
                  <p className="size__title">Size</p>
                  { product?.sizes && product?.sizes.map((size, index, sizesArr) => (
                    <button key={size._id} className="size" onClick={() => handleSizeChange(size._id, index, sizesArr.length)}>{size.sizeName}</button>
                  )) }
              </div>
              <div className="product__color">
                  <p className="color__title">Color</p>
                  { product?.colors && product?.colors.map((color, index, colorsArr) => (
                    <button key={color._id} className="color" style={{ backgroundColor: `${color.colorName}` }} onClick={() => handleColorChange(color._id, index, colorsArr.length)}></button>
                  )) }
              </div>
              <div className="product__quantity">
                  <p className="quantity__title">Quantity</p>
                  <QuantityField data={data} setData={setData} />
              </div>
              <button className="product__add-cart" onClick={handleAddToCart}>Add to cart</button>
              <div className="product__divider"></div>
              <p className="product__description">{product?.description}</p>
            </div>

            <div className="same-brand">

            </div>
          </div>
          <Review product={product}/>
        </Fragment>
      ) }
    </div>
  );
}

const mapStateToProps = (state) => ({
  product: state.products.product
})

export default connect(mapStateToProps, { getProductById })(ProductInfo);
