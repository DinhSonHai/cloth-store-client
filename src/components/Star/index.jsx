import React, { Fragment } from 'react';
import StarRatings from 'react-star-ratings';

import './styles.scss';

function Star({ rating, changeRating, starDimension, ...props }) {
  return (
    <StarRatings
      rating={rating}
      starRatedColor="#ffd543"
      changeRating={(newRating) => changeRating(newRating)}
      starDimension={starDimension}
      starHoverColor="#ffd543"
      starSpacing="2px"
      numberOfStars={5}
    />
  );
}

export default Star;
