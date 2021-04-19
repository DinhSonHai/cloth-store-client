import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import StarRatingComponent from 'react-star-rating-component';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TextField from '../TextField';
import './styles.scss';
import TextAreaField from '../TextAreaField';

ReviewForm.propTypes = {

};

function ReviewForm(props) {
  const [star, setStar] = useState(0);

  const validate = Yup.object({
    starRatings: Yup.number()
      .required('Please rate product!')
  })

  return (
    <div className="review-form">
      <Formik
        initialValues={{
          title: '',
          starRatings: star,
          comment: ''
        }}
        validationSchema={validate}
        onSubmit={values => {
          console.log(values);
          // login(values, hideLogin);
        }}
        validateOnMount
      >
        {formik => (
          <Form className="content__form">
            <TextField type="text" id="title" name="title" placeholder="TITLE" width={"770px"} height={"45px"} backgroundColor={"var(--white)"} />
            <TextAreaField type="text" id="comment" name="comment" placeholder="Add your comment here..." width={"770px"} height={"157px"} backgroundColor={"var(--white)"} />

            <label className="text-field__label" htmlFor="rate">*Rating for us:</label><br />
            <div id="starRatings"
              name="starRatings" className="form__bottom">
              {/* <StarRatingComponent
                id="starRatings"
                name="starRatings"
                editing={true}
                starCount={5}
                value={star}
                starColor={"#ffd543"}
                emptyStarColor={"#d4d3d3"}
              /> */}

              <button type="submit" className="form__button" disabled={!formik.isValid} >
                Submit
            </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ReviewForm;