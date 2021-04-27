import React, { Fragment, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
// import StarRatingComponent from 'react-star-rating-component';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './styles.scss';
import ReviewForm from '../CustomFields/ReviewForm';
import { removeReview } from '../../redux/actions/products';
import Star from '../Star';

Review.propTypes = {
};

function Review({ auth, product, removeReview }) {
  const [isEdit, setEdit] = useState(false);

  const handleRemoveComment = (productId, reviewId) => {
    if (productId && reviewId) {
      confirmAlert({
        title: 'Confirm to remove review',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => removeReview(productId, reviewId)
          },
          {
            label: 'No',
            onClick: () => { }
          }
        ]
      });
    }
  }

  const handleShowEdit = () => {
    setEdit(!isEdit);
  }

  return (
    <div className="review-section">
      <div className="review-section__divider">
        <div className="divider__start"></div>
        <p className="divider__title">Reviews</p>
        <div className="divider__end"></div>
      </div>
      <Fragment>
        {/* Show product review */}
        {product &&
          // No review
          (product.reviewsCount <= 0 ? (
            !auth.isAuthenticated ? (
              // Not logged in --> No review
              <p className="no-reviews">No reviews</p>
            ) : (
              // Logged in
              !auth.user.purchasedProducts.find(item => item === product._id) ? (
                //Not purchase --> no review
                <p className="no-reviews">No reviews</p>
              ) : (
                // Purchase --> show review form
                <Fragment>
                  <div className="review">
                    <div className="review__info">
                      <p className="info__name">You</p>
                    </div>
                    <div className="review__content">
                      {<ReviewForm productId={product._id} />}
                    </div>
                  </div>
                </Fragment>
              )
            )
          ) : (
            // Has reviews
            !auth.isAuthenticated ? (
              // Not logged in --> show all reviews
              product?.reviews.map(review => (
                <div key={review._id} className="review">
                  <div className="review__info">
                    <p className="info__name">{review.userId.name}</p>
                    <p className="info__date">{new Date(review.commentedAt).toDateString()}</p>
                  </div>
                  <div className="review__content">
                    <p className="content__title">{review.title}</p>
                    <Star rating={review.starRatings} changeRating={null} starDimension="15px" />
                    <p className="content__comment">{review.comment}</p>
                  </div>
                </div>
              ))
            ) : (auth?.user && (
              !auth.user.purchasedProducts.find(item => item === product._id) ? (
                // Not purchase --> show all reviews
                product?.reviews.map(review => (
                  <div key={review._id} className="review">
                    <div className="review__info">
                      <p className="info__name">{review.userId.name}</p>
                      <p className="info__date">{new Date(review.commentedAt).toDateString()}</p>
                    </div>
                    <div className="review__content">
                      <p className="content__title">{review.title}</p>
                      <Star rating={review.starRatings} changeRating={null} starDimension="15px" />
                      <p className="content__comment">{review.comment}</p>
                    </div>
                  </div>
                ))
              ) : (
                //Purchased
                !product.reviews.find(review => review.userId._id === auth.user._id) ? (
                  // Haven't reviewed
                  <Fragment>
                    <div className="review">
                      <div className="review__info">
                        <p className="info__name">You</p>
                      </div>
                      <div className="review__content">
                        {<ReviewForm productId={product._id} />}
                      </div>
                    </div>
                    {/* Get all reviews */}
                    {product.reviews.map(review => (
                      <div key={review._id} className="review">
                        <div className="review__info">
                          <p className="info__name">{review.userId.name}</p>
                          <p className="info__date">{new Date(review.commentedAt).toDateString()}</p>
                        </div>
                        <div className="review__content">
                          <p className="content__title">{review.title}</p>
                          <Star rating={review.starRatings} changeRating={null} starDimension="15px" />
                          <p className="content__comment">{review.comment}</p>
                        </div>
                      </div>
                    ))}
                  </Fragment>
                )
                  : (
                    <Fragment>
                      {
                        // Get user review
                        product.reviews.filter(review => review.userId._id === auth?.user?._id).map(review => (
                          <div key={review._id} className="review">
                            <div className="review__info">
                              <p className="info__name">You</p>
                              <div className="review__action">
                                {/* <button onClick={handleShowEdit}>{isEdit ? "Cancle" : "Edit"}</button> */}
                                {/* <div className="action__divider"></div> */}
                                {/* <button onClick={() => handleRemoveComment(product._id, review._id)}>Delete</button> */}
                              </div>
                            </div>
                            <div className="review__content">
                              {isEdit ? (product && (<ReviewForm productId={product._id} reviewId={review._id} title={review.title} rating={review.starRatings} comment={review.comment} setEdit={setEdit} />)) : (
                                <Fragment>
                                  <p className="content__title">{review.title}</p>
                                  <Star rating={review.starRatings} changeRating={null} starDimension="15px" />
                                  <p className="content__comment">{review.comment}</p></Fragment>
                              )}
                            </div>
                          </div>
                        ))
                      }
                      {
                        // Get all reviews except logged in user's review
                        product?.reviews.filter(review => review.userId._id !== auth?.user?._id).map(review => (
                          <div key={review._id} className="review">
                            <div className="review__info">
                              <p className="info__name">{review.userId.name}</p>
                              <p className="info__date">{new Date(review.commentedAt).toDateString()}</p>
                            </div>
                            <div className="review__content">
                              <p className="content__title">{review.title}</p>
                              <Star rating={review.starRatings} changeRating={null} starDimension="15px" />
                              <p className="content__comment">{review.comment}</p>
                            </div>
                          </div>
                        ))
                      }
                    </Fragment>
                  )
              ))
            )
          ))}
      </Fragment >
    </div >
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { removeReview })(Review);