import React, { Fragment, useState } from 'react';
// import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TextField from '../TextField';
import './styles.scss';
import TextAreaField from '../TextAreaField';
import StarField from '../StarField';
import { connect } from 'react-redux';
import { review } from '../../../redux/actions/products';

ReviewForm.propTypes = {

};

function ReviewForm({ productId, rating, setRating, review }) {

  const validate = Yup.object({
    starRatings: Yup.number()
      .required('Please rate product!')
  })

  return (
    <div className="review-form">
      <Formik
        initialValues={{
          title: '',
          comment: '',
          starRatings: 0
        }}
        validationSchema={validate}
        onSubmit={values => {
          console.log(values);
          if (productId) {
            review(productId, values);
          }
        }}
        validateOnMount
      >
        {formik => (
          <Form className="content__form">
            <TextField type="text" id="title" name="title" placeholder="TITLE" width={"770px"} height={"45px"} backgroundColor={"var(--white)"} />
            <TextAreaField type="text" id="comment" name="comment" placeholder="Add your comment here..." width={"770px"} height={"157px"} backgroundColor={"var(--white)"} />

            <div className="form__bottom">
              <div>
                <label className="text-field__label" htmlFor="rate">*Rating for us:</label><br />
                <StarField id="starRatings" name="starRatings" />
              </div>
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

export default connect(null, { review })(ReviewForm);