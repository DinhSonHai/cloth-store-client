import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import TextField from '../CustomFields/TextField';
import { CloseModalIcon } from '../../assets/icons';
import { forgotPassword } from '../../redux/actions/auth';
import './styles.scss';
import Spinner from '../Spinner';

ResetPasswordModal.propTypes = {

};

function ResetPasswordModal({ auth, hideForgotPassword, showLogin, forgotPassword }) {
  const [loading, setLoading] = useState(false);

  const validate = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email!')
      .required('Please enter a valid email!')
  })

  return (
    <div className="forgot-modal" id="forgot-modal">
      <div className="forgot-modal__content">
        <div className="forgot-modal__close">
          <div className="close__icon" onClick={hideForgotPassword}>
            <CloseModalIcon />
          </div>
        </div>
        <h1 className="content__title">Forgot Password</h1>
        <p className="content__description">Enter your e-mail address below and we’ll get you back on track.</p>
        {auth?.error?.type === 'forgotPassWord' && (<p className="content__error">{auth.error.message}</p>)}
        <Formik
          initialValues={{
            email: ''
          }}
          validationSchema={validate}
          onSubmit={values => {
            const sendMail = async () => {
              setLoading(true);
              await forgotPassword(values);
              setLoading(false);
            }
            sendMail();
          }}
          validateOnMount
        >
          {formik => (
            <Form className="content__form">
              <TextField type="text" label="E-MAIL" id="email" name="email" placeholder="Enter your email..." width={"395px"} height={"46px"} backgroundColor={"var(--white-two)"} />

              <button type="submit" className="form__button" disabled={!formik.isValid} >
                {loading && <span className="spinner"><Spinner width="49px" /></span>}
                Submit
              </button>
            </Form>
          )}
        </Formik>
        <p className="content__option" onClick={() => { hideForgotPassword(); showLogin(); }} >I remember my password now. <span> Log In</span></p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { forgotPassword })(ResetPasswordModal);