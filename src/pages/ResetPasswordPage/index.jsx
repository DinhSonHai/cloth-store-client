import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TextField from '../../components/CustomFields/TextField';
// import PropTypes from 'prop-types';

import './styles.scss';
import Spinner from '../../components/Spinner';
import { resetPassword } from '../../redux/actions/auth';
import { connect } from 'react-redux';

ResetPasswordPage.propTypes = {

};

function ResetPasswordPage({ match, auth, resetPassword }) {
  const [loading, setLoading] = useState(false);
  const token = match.params.token;

  const validatePassword = Yup.object({
    newPassword: Yup.string()
      .min(6, 'Your passwords must be more than 6 characters!')
      .required('Please enter a valid password!'),
    reEnterPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Password do not match")
      .required('Please enter a valid password!')
  })

  return (
    <div className="reset-password">
      <div className="reset-password__content">
        <h1 className="content__title">Reset password</h1>
        {auth?.error?.type === 'resetPassword' && (<p className="content__error">{auth.error.message}</p>)}
        <Formik
          initialValues={{
            newPassword: '',
            reEnterPassword: ''
          }}
          validationSchema={validatePassword}
          onSubmit={(values, { resetForm }) => {
            async function reset() {
              setLoading(true);
              const isSuccess = await resetPassword({ password: values.newPassword, resetPasswordLink: token });
              setLoading(false);
              if (isSuccess) {
                resetForm();
              }
            }
            reset();
          }}
          validateOnMount
        >
          {formik => (
            <Form className="content__form">
              <TextField type="password" label="NEW PASSWORD" id="newPassword" name="newPassword" placeholder="Enter your password..." width={"380px"} height={"46px"} backgroundColor={"var(--white)"} />
              <TextField type="password" label="RE-ENTER NEW PASSWORD" id="reEnterPassword" name="reEnterPassword" placeholder="Enter your password..." width={"380px"} height={"46px"} backgroundColor={"var(--white)"} />

              <div className="form__button">

                <button type="submit" className="submit-button" disabled={!formik.isValid} >
                  {loading && <span className="spinner"><Spinner width="49px" /></span>}
                Submit
              </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { resetPassword })(ResetPasswordPage);