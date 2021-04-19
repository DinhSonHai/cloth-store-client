import React, { Fragment } from 'react';
// import StarRatingComponent from 'react-star-rating-component';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './styles.scss';
import ReviewForm from '../CustomFields/ReviewForm';

Review.propTypes = {
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
          { auth ? (
            <Fragment>
              { !product?.reviews.find(review => review.userId._id === auth?.user?._id) ? (
                <Fragment>
                  <div className="review">
                    <div className="review__info">
                      <p className="info__name">You</p>
                      <p className="info__date"></p>
                    </div>
                    <div className="review__content">
                      <ReviewForm />
                    </div>
                  </div>
                </Fragment>
              ) : product?.reviews.filter(review => review.userId._id === auth?.user?._id).map(review => (
                <div key={review._id} className="review">
                  <div className="review__info">
                    <p className="info__name">You</p>
                    <p className="info__date">{new Date(review.commentedAt).toDateString()}</p>
                  </div>
                  <div className="review__content">
                    <p className="content__title">{review.title}</p>
                    {/* <StarRatingComponent
                      name="rate2"
                      editing={false}
                      starCount={5}
                      value={review.starRatings}
                    /> */}
                    <p className="content__comment">{review.comment}</p>
                  </div>
                </div>
              ))}
              {
                product?.reviews.filter(review => review.userId._id !== auth?.user?._id).map(review => (
                  <div key={review._id} className="review">
                    <div className="review__info">
                      <p className="info__name">{review.userId.name}</p>
                      <p className="info__date">{new Date(review.commentedAt).toDateString()}</p>
                    </div>
                    <div className="review__content">
                      <p className="content__title">{review.title}</p>
                      {/* <StarRatingComponent
                        name="rate2"
                        editing={false}
                        starCount={5}
                        value={review.starRatings}
                      /> */}
                      <p className="content__comment">{review.comment}</p>
                    </div>
                  </div>
                ))
              }
            </Fragment>
          ) : (
            product?.reviewsCount > 0 ? (
              <Fragment>
                {
                  product?.reviews.map(review => (
                    <div key={review._id} className="review">
                      <div className="review__info">
                        <p className="info__name">{review.userId.name}</p>
                        {/* <p className="info__date">{new Date(review.commentedAt).getDate()} {new Date(review.commentedAt).getMonth()}</p> */}
                      </div>
                      <div className="review__content">
                        <p className="content__title">{review.title}</p>
                        {/* <StarRatingComponent
                          name="rate2"
                          editing={false}
                          starCount={5}
                          value={review.starRatings}
                        /> */}
                        <p className="content__comment">{review.comment}</p>
                      </div>
                    </div>
                  ))
                }
              </Fragment>
            ) : (
              <p className="no-reviews">No reviews</p>
            )
          )}
        </Fragment>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {})(Review);