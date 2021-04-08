import React from 'react';

import './styles.scss';
import { Arrow } from '../../assets/icons';
import ProductCard from '../../components/ProductCard';
import ImageTest from '../../assets/images/ladies-outfit.jpg';

ProductList.propTypes = {

};

function ProductList(props) {
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
              <option value="" selected disabled hidden>Size</option>
              <option>X</option>
              <option>M</option>
              <option>L</option>
            </select>

            {/* Color */}
            <select>
              <option value="" selected disabled hidden>Color</option>
              <option>X</option>
              <option>M</option>
              <option>L</option>
            </select>

            {/* Brand */}
            <select>
              <option value="" selected disabled hidden>Brand</option>
              <option>X</option>
              <option>M</option>
              <option>L</option>
            </select>

            {/* Price */}
            <select>
              <option value="" selected disabled hidden>Price</option>
              <option>X</option>
              <option>M</option>
              <option>L</option>
            </select>

            {/* Availabel */}
            <select>
              <option value="" selected disabled hidden>Availabel</option>
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
                <option selected>Sort By: Popularity</option>
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
            <ProductCard image={ImageTest} name="Collete Stretch Linen Minidress" price="$20.00" isAvailable={true} isAvailable={true} />
            <ProductCard image={ImageTest} name="Collete Stretch Linen Minidress" price="$20.00" isAvailable={true} />
            <ProductCard image={ImageTest} name="Collete Stretch Linen Minidress" price="$20.00" isAvailable={true} />
            <ProductCard image={ImageTest} name="Collete Stretch Linen Minidress" price="$20.00" isAvailable={false} />
            <ProductCard image={ImageTest} name="Collete Stretch Linen Minidress" price="$20.00" isAvailable={true} />
            <ProductCard image={ImageTest} name="Collete Stretch Linen Minidress" price="$20.00" isAvailable={true} />
            <ProductCard image={ImageTest} name="Collete Stretch Linen Minidress" price="$20.00" isAvailable={false} />
            <ProductCard image={ImageTest} name="Collete Stretch Linen Minidress" price="$20.00" isAvailable={true} />
            <ProductCard image={ImageTest} name="Collete Stretch Linen Minidress" price="$20.00" isAvailable={true} />
            <ProductCard image={ImageTest} name="Collete Stretch Linen Minidress" price="$20.00" isAvailable={true} />
            <ProductCard image={ImageTest} name="Collete Stretch Linen Minidress" price="$20.00" isAvailable={true} />
            <ProductCard image={ImageTest} name="Collete Stretch Linen Minidress" price="$20.00" isAvailable={true} />
            <ProductCard image={ImageTest} name="Collete Stretch Linen Minidress" price="$20.00" isAvailable={true} />
            <ProductCard image={ImageTest} name="Collete Stretch Linen Minidress" price="$20.00" isAvailable={true} />
            <ProductCard image={ImageTest} name="Collete Stretch Linen Minidress" price="$20.00" isAvailable={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;