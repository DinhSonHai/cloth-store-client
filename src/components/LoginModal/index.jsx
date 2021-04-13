import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import TextField from '../../components/CustomFields/TextField';
import { CloseModalIcon } from '../../assets/icons';
import { login } from '../../redux/actions/auth';
import './styles.scss';
import { Redirect } from 'react-router-dom';
import Spinner from '../Spinner';

LoginModal.propTypes = {
  auth: PropTypes.object.isRequired,
  hideLogin: PropTypes.func.isRequired,
  showRegister: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

function LoginModal({ auth, hideLogin, showRegister, login }) {
  const [isCheck, setChecked] = useState(localStorage.getItem('isCheck') || false);
  const validate = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email!')
      .required('Please enter a valid email!'),
    password: Yup.string()
      .min(6, 'Your passwords must be more than 6 characters!')
      .required('Please enter a valid password!')
  })

  if (auth.isAuthenticated) {
    return <Redirect to="/"></Redirect>
  }

  const onChangeCheckBox = (e) => {
    setChecked(!isCheck);
  }

  return (
    <div className="login-modal" id="login-modal">
      <div className="login-modal__content">
        <div className="login-modal__content__close">
          <div className="login-modal__content__close__icon" onClick={hideLogin}>
            <CloseModalIcon />
          </div>
        </div>
        <h1 className="login-modal__content__title">Log In</h1>
        {auth?.errors?.type === 'login' && (<p className="login-modal__content__error">{auth.errors.msg}</p>)}
        <Formik
          initialValues={{
            email: localStorage.getItem('email') || '',
            password: localStorage.getItem('password') || '',
          }}
          validationSchema={validate}
          onSubmit={values => {
            login(values);
            if (isCheck) {
              localStorage.setItem('isCheck', true);
              localStorage.setItem('email', values.email);
              localStorage.setItem('password', values.password);
            }
          }}
          validateOnMount
        >
          {formik => (
            <Form className="login-modal__content__form">
              <TextField type="text" label="E-MAIL" id="email" name="email" placeholder="Enter your email..." />
              <TextField type="password" label="PASSWORD" name="password" placeholder="Enter your password..." />

              <div className="login-modal__content__form__option">
                <div className="login-modal__content__form__option__remember">
                  <input type="checkbox" id="rememeber-box" checked={isCheck} onChange={onChangeCheckBox}/>
                  <label htmlFor="remember-box">Remember password</label>
                </div>
                <p className="login-modal__content__form__option_forgot">Forgot your password?</p>
              </div>

              <button type="submit" className="login-modal__content__form__button" disabled={!formik.isValid} >
                Login
              </button>
            </Form>
          )}
        </Formik>
        <p className="login-modal__content__option" onClick={() => { hideLogin(); showRegister(); }} >Don't have an account? <span> Register</span></p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(LoginModal);