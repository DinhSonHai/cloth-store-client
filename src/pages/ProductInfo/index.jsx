import React, { Fragment, useEffect, useState } from 'react';
// import StarRatingComponent from 'react-star-rating-component';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './styles.scss';
import { getProductById } from '../../redux/actions/products';
import Spinner from '../../components/Spinner';
import QuantityField from '../../components/CustomFields/QuantityField';
import Review from '../../components/Review';
import { addItemToCart } from '../../utils/cart';
import Star from '../../components/Star';

ProductInfo.propTypes = {
};

function ProductInfo({ match, product, getProductById }) {
  const [loading, setLoading] = useState(true);
  const [sizeState, setSizeState] = useState('');
  const [colorState, setColorState] = useState('');
  const [mainPhoto, setMainPhoto] = useState('');
  const [data, setData] = useState({
    productId: match.params.productId,
    sizeId: '',
    colorId: '',
    quantity: 1
  });

  useEffect(() => {
    setLoading(true);
    getProductById(match.params.productId);
    setLoading(false);
  }, [getProductById, match.params.productId, data, loading]);

  const handleThumbailCLick = (e) => {
    setMainPhoto(e.target.src);
  }

  const handleSizeChange = (sizeId) => {
    setSizeState(sizeId);
    setData({ ...data, sizeId });
  }

  const handleColorChange = (colorId) => {
    setColorState(colorId);
    setData({ ...data, colorId });
  }

  const handleAddToCart = () => {
    console.log(product.sizes[0]._id)
    let sizeId = '';
    let colorId = '';
    if (!data.sizeId) {
      sizeId = product.sizes[0]._id;
      // toast.error('Please choose size', { position: toast.POSITION.TOP_CENTER });
    }
    if (!data.colorId) {
      colorId = product.colors[0]._id;
      // toast.error('Please choose color', { position: toast.POSITION.TOP_CENTER });
    }
    if (data.sizeId && data.colorId && data.quantity) {
      addItemToCart(data);
      // console.log(data);
    }
    else if (sizeId && colorId && data.quantity) {
      addItemToCart({ ...data, sizeId, colorId });
    }
  }

  const changeRating = () => {

  }

  return (
    <div className="product-info">
      { loading ? (<Spinner width="200px" />) : (
        <Fragment>
          <div className="product-info__breadcrumb">
            <p>Ladies / Dresses / {product?.name}</p>
          </div>
          <div className="product-info__main">
            <div className="product-info__thumbnail">
              {product?.photos.map((photo, index) => (
                <div key={index} className="product-info__element">
                  <img src={photo} alt="Product thumbnail" onClick={handleThumbailCLick} />
                </div>
              ))}
            </div>

            <div className="product-info__img">
              <img id="main-img" src={mainPhoto || product?.photos[0]} alt="Product main" />
            </div>

            <div className="product-info__product">
              <p className="product__title">{product?.name}</p>
              <p className="product__price">{`$${product?.price || 0}.00`}</p>
              <div className="product__rating">
                {product && (
                  // <StarRatingComponent
                  //   name="rate"
                  //   editing={false}
                  //   starCount={5}
                  //   value={product.starRatings}
                  // />
                  <Star rating={product.starRatings} changeRating={null} starDimension={"15px"} />
                )}
                <div className="rating__divider"></div>
                <p className="rating__count">{product?.reviewsCount} Review</p>
              </div>
              <div className="product__size">
                <p className="size__title">Size</p>
                {product && product?.sizes && product?.sizes.map((size, index) => (
                  <button key={size._id} className={index === 0 ? "size size--active" : sizeState === size._id ? "size size--active" : "size"} onClick={() => handleSizeChange(size._id)}>{size.sizeName}</button>
                ))}
              </div>
              <div className="product__color">
                <p className="color__title">Color</p>
                {product && product?.colors && product?.colors.map((color, index) => (
                  <button key={color._id} className={index === 0 ? "color color--active" : colorState === color._id ? "color color--active" : "color"} style={{ backgroundColor: `${color.colorName}` }} onClick={() => handleColorChange(color._id)}></button>
                ))}
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
          <Review product={product} />
        </Fragment>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  product: state.products.product
})

export default connect(mapStateToProps, { getProductById })(ProductInfo);
