import React, { Fragment } from 'react';
import StarRatings from 'react-star-ratings';

import './styles.scss';

function Star({ rating, changeRating, starDimension }) {
  return (
    <StarRatings
      rating={rating}
      starRatedColor="#ffd543"
      changeRating={changeRating}
      starDimension={starDimension}
      starSpacing={"2px"}
      numberOfStars={5}
    />
  );
}

export default Star;
