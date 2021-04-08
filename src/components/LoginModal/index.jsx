import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TextField from '../../components/CustomFields/TextField';
import { CloseModalIcon } from '../../assets/icons';
import './styles.scss';

LoginModal.propTypes = {
  hideLogin: PropTypes.func.isRequired,
  showRegister: PropTypes.func.isRequired,
};

function LoginModal({ hideLogin, showRegister }) {
  const validate = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email!')
      .required('Please enter a valid email!'),
    password: Yup.string()
      .min(6, 'Your passwords must be more than 6 characters!')
      .required('Please enter a valid password!')
  })

  return (
    <div className="login-modal" id="login-modal">
      <div className="login-modal__content">
        <div className="login-modal__content__close">
          <div className="login-modal__content__close__icon" onClick={hideLogin}>
            <CloseModalIcon />
          </div>
        </div>
        <h1 className="login-modal__content__title">Log In</h1>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={validate}
          onSubmit={values => {
            console.log(values);
          }}
        >
          {formik => (
            <Form className="login-modal__content__form">
              <TextField type="text" label="E-MAIL" id="email" name="email" placeholder="Enter your email..." />
              <TextField type="password" label="PASSWORD" name="password" placeholder="Enter your password..." />

              <div className="login-modal__content__form__option">
                <div className="login-modal__content__form__option__remember">
                  <input type="checkbox" id="rememeber-box" />
                  <label htmlFor="remember-box">Remember password</label>
                </div>
                <p className="login-modal__content__form__option_forgot">Forgot your password?</p>
              </div>

              <button type="submit" className="login-modal__content__form__button" disabled={!formik.isValid} >Login</button>
            </Form>
          )}
        </Formik>
        <p className="login-modal__content__option" onClick={() => { hideLogin(); showRegister(); }} >Don't have an account? <span> Register</span></p>
      </div>
    </div>
  );
}

export default LoginModal;