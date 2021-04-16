import React, { Fragment } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './styles.scss';

Review.propTypes = {
  auth: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired
};

function Review({ auth, product }) {
  return (
    <div className="review-section">
      <div className="review-section__divider">
        <div className="divider__start"></div>
          <p className="divider__title">Reviews</p>
        <div className="divider__end"></div>
      </div>
      { product?.reviewsCount <= 0 ? (
        <p className="no-reviews">No reviews</p>
      ) : (
        <Fragment>

          {
            product?.reviews.map(review => (
              <div className="review">
                <div className="review__info">
                  <p className="info__name">{review.userId.name}</p>
                  {/* <p className="info__date">{new Date(review.commentedAt).getDate()} {new Date(review.commentedAt).getMonth()}</p> */}
                </div>
                <div className="review__content">
                  <p className="content__title">{review.title}</p>
                  <StarRatingComponent 
                    name="rate2" 
                    editing={false}
                    starCount={5}
                    value={review.starRatings}
                  />
                  <p className="content__comment">{review.comment}</p>
                </div>
              </div>
            ))
          }          
        </Fragment>
      ) }
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {})(Review);