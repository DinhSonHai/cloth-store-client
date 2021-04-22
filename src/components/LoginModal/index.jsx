import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import TextField from '../../components/CustomFields/TextField';
import { CloseModalIcon } from '../../assets/icons';
import { login } from '../../redux/actions/auth';
import './styles.scss';
import Spinner from '../Spinner';

LoginModal.propTypes = {
  auth: PropTypes.object.isRequired,
  hideLogin: PropTypes.func.isRequired,
  showRegister: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

function LoginModal({ auth, hideLogin, showRegister, login }) {
  const [loading, setLoading] = useState(false);
  const [isCheck, setChecked] = useState(localStorage.getItem('isCheck') || false);
  const validate = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email!')
      .required('Please enter a valid email!'),
    password: Yup.string()
      .min(6, 'Your passwords must be more than 6 characters!')
      .required('Please enter a valid password!')
  })

  const onChangeCheckBox = (e) => {
    setChecked(!isCheck);
  }

  return (
    <div className="login-modal" id="login-modal">
      <div className="login-modal__content">
        <div className="login-modal__close">
          <div className="close__icon" onClick={hideLogin}>
            <CloseModalIcon />
          </div>
        </div>
        <h1 className="content__title">Log In</h1>
        {auth?.error?.type === 'login' && (<p className="content__error">{auth.error.message}</p>)}
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validate}
          onSubmit={values => {
            setLoading(true);
            login(values, hideLogin);
            setLoading(false);
          }}
          validateOnMount
        >
          {formik => (
            <Form className="content__form">
              <TextField type="text" label="E-MAIL" id="email" name="email" placeholder="Enter your email..." width={"395px"} height={"46px"} backgroundColor={"var(--white-two)"} />
              <TextField type="password" label="PASSWORD" name="password" placeholder="Enter your password..." width={"395px"} height={"46px"} backgroundColor={"var(--white-two)"} />

              <div className="form__option">
                <div className="option__remember">
                  <input type="checkbox" id="rememeber-box" checked={Boolean(isCheck)} onChange={onChangeCheckBox} />
                  <label htmlFor="remember-box">Keep me login</label>
                </div>
                <p className="option_forgot">Forgot your password?</p>
              </div>

              <button type="submit" className="form__button" disabled={!formik.isValid} >
                {loading && <span className="spinner"><Spinner width="49px" /></span>}
                Login
              </button>
            </Form>
          )}
        </Formik>
        <p className="content__option" onClick={() => { hideLogin(); showRegister(); }} >Don't have an account? <span> Register</span></p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(LoginModal);