import React, { Fragment, useEffect, useState } from 'react';
// import StarRatingComponent from 'react-star-rating-component';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import { SelectColorIcon } from '../../assets/icons';
import './styles.scss';
import { getProductById, getProductsByBrand, getAllProducts } from '../../redux/actions/products';
// import Spinner from '../../components/Spinner';
import QuantityField from '../../components/CustomFields/QuantityField';
import Review from '../../components/Review';
import { addItemToCart } from '../../utils/cart';
import Star from '../../components/Star';
import ProductSameBrandItem from '../../components/ProductSameBrandItem';
import ProductSuggestItem from '../../components/ProductSuggestItem';

ProductInfo.propTypes = {
};

function ProductInfo({ match, products, product, brandProducts, getProductById, getProductsByBrand, getAllProducts }) {
  const [mainPhoto, setMainPhoto] = useState('');
  const productId = match.params.productId;

  const [data, setData] = useState({
    productId: productId,
    sizeId: '',
    colorId: '',
    quantity: 1
  });

  useEffect(() => {
    setMainPhoto('');
    setData({
      productId: productId,
      sizeId: '',
      colorId: '',
      quantity: 1
    })
    getProductById(productId);
    getProductsByBrand(productId);
    getAllProducts();
  }, [getProductById, getProductsByBrand, getAllProducts, productId]);

  const handleThumbailCLick = (e) => {
    setMainPhoto(e.target.src);
  }

  const handleSizeChange = (sizeId) => {
    setData({ ...data, sizeId });
  }

  const handleColorChange = (colorId) => {
    setData({ ...data, colorId });
  }

  const handleAddToCart = () => {
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
    if (data.sizeId) {
      if (data.colorId) {
        addItemToCart(data);
      }
      else {
        addItemToCart({ ...data, colorId });
      }
    }
    else {
      if (data.colorId) {
        addItemToCart({ ...data, sizeId });
      }
      else {
        addItemToCart({ ...data, sizeId, colorId });
      }
    }
  }

  return (
    <div className="product-info">
      <Fragment>
        {product && (
          <Fragment>
            <div className="product-info__breadcrumb">
              <p>Ladies / Dresses / {product.name}</p>
            </div>
            <div className="product-info__main">
              <div className="product-info__thumbnail">
                {product.photos.map((photo, index) => (
                  <div key={index} className="product-info__element">
                    <img src={photo} alt="Product thumbnail" onClick={handleThumbailCLick} />
                  </div>
                ))}
              </div>

              <div className="product-info__img">
                <img id="main-img" src={mainPhoto || product.photos[0]} alt="Product main" />
              </div>

              <div className="product-info__product">
                <p className="product__title">{product.name}</p>
                <p className="product__price">{`$${product.price || 0}.00`}</p>
                <div className="product__rating">
                  {product && (
                    <Star rating={product.starRatings} changeRating={null} starDimension={"15px"} />
                  )}
                  <div className="rating__divider"></div>
                  <p className="rating__count">{product.reviewsCount} Review</p>
                </div>
                <div className="product__size">
                  <p className="size__title">Size</p>
                  {product && product.sizes && product.sizes.map((size, index) => (
                    <button key={size._id} className={!data.sizeId && index === 0 ? "size size--active" : data.sizeId === size._id ? "size size--active" : "size"} onClick={() => handleSizeChange(size._id)}>{size.sizeName}</button>
                  ))}
                </div>
                <div className="product__color">
                  <p className="color__title">Color</p>
                  {product && product.colors && product.colors.map((color, index) => (
                    // <button key={color._id} className={!colorState && index === 0 ? "color color--active" : colorState === color._id ? "color color--active" : "color"} style={{ backgroundColor: `${color.colorName}` }} onClick={() => handleColorChange(color._id)}></button>
                    <button key={color._id} className="color" style={{ backgroundColor: `${color.colorName}` }} onClick={() => handleColorChange(color._id)}>
                      { !data.colorId && index === 0 ? (
                        <span className="select-color-icon">
                          <SelectColorIcon />
                        </span>
                      ) : (
                        data.colorId === color._id ? (
                          <span className="select-color-icon">
                            <SelectColorIcon />
                          </span>
                        ) : (
                          <span className="select-color-icon">
                          </span>
                        )
                      )}
                    </button>
                  ))}
                </div>
                <div className="product__quantity">
                  <p className="quantity__title">Quantity</p>
                  <QuantityField data={data} setData={setData} />
                </div>
                <button className="product__add-cart" onClick={handleAddToCart}>Add to cart</button>
                <div className="product__divider"></div>
                <p className="product__description">{product.description}</p>
              </div>

              <div className="same-brand">
                <p>More from</p>
                <p className="brand-name">{product && product.brandId.brand}</p>
                {brandProducts && brandProducts.map((item, index) => (
                  <ProductSameBrandItem key={index} to={`/products/${item._id}`} photo={item.photos[0]} />
                ))}
              </div>
            </div>
            <Review product={product} />
            <div className="suggest-section__divider">
              <div className="divider__start"></div>
              <p className="divider__title">You may also like</p>
              <div className="divider__end"></div>
            </div>
            <div className="suggest-products">
              {products && products.filter(item => item._id !== product._id).slice(0, 8).map((item, index) => (
                <ProductSuggestItem key={index} to={`/products/${item._id}`} photo={item.photos[0]} name={item.name} />
              ))}
            </div>
          </Fragment>
        )}
      </Fragment>
    </div>
  );
}

const mapStateToProps = (state) => ({
  products: state.products.products,
  product: state.products.product,
  brandProducts: state.products.brandProducts
})

export default connect(mapStateToProps, { getProductById, getProductsByBrand, getAllProducts })(ProductInfo);
