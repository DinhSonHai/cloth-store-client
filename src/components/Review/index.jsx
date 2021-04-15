import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './styles.scss';

Review.propTypes = {
  auth: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired
};

function Review({ auth, products: { product }, productId }) {
  return (
    <div className="review">
      <div className="review__divider">
        <div className="divider__start"></div>
          <p className="divider__title">Reviews</p>
        <div className="divider__end"></div>
      </div>
      { product?.reviewsCount <= 0 ? (
        <p className="no-reviews">No reviews</p>
      ) : (
        <Fragment>
          {/* { auth.isAuthenticated && auth.user.purchasedProducts.find(id => id === productId) && ()} */}

          
        </Fragment>
      ) }
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  products: state.products
})

export default connect(mapStateToProps, {})(Review);