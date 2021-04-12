import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import { register } from '../../redux/actions/auth';
import TextField from '../../components/CustomFields/TextField';
import { CloseModalIcon } from '../../assets/icons';
import './styles.scss';
import { Redirect } from 'react-router';

RegisterModal.propTypes = {
  auth: PropTypes.object.isRequired,
  hideRegister: PropTypes.func.isRequired,
  showLogin: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

function RegisterModal({ auth, hideRegister, showLogin, register }) {
  const validate = Yup.object({
    name: Yup.string()
      .required('Please enter a valid name!'),
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

  return (
    <div className="register-modal" id="register-modal">
      <div className="register-modal__content">
        <div className="register-modal__content__close">
          <div className="register-modal__content__close__icon" onClick={hideRegister}>
            <CloseModalIcon />
          </div>
        </div>
        <h1 className="register-modal__content__title">Register</h1>
        {auth.errors.type === 'register' && <p className="register-modal__content__error">{auth.errors.msg}</p>}
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: ''
          }}
          validationSchema={validate}
          onSubmit={values => {
            register(values);
          }}
          validateOnMount
        >
          {formik => (
            <Form className="register-modal__content__form">
              <TextField type="text" label="NAME" id="name" name="name" placeholder="Enter your name..." />
              <TextField type="text" label="E-MAIL" id="email" name="email" placeholder="Enter your email..." />
              <TextField type="password" label="PASSWORD" name="password" placeholder="Enter your password..." />

              <p className="register-modal__content__form__policy">By creating an account you agree to the <a href="/">Term of service</a> and <a href="/">Privacy Policy</a></p>

              <button type="submit" className="register-modal__content__form__button" disabled={!formik.isValid} >Register</button>
            </Form>
          )}
        </Formik>
        <p className="register-modal__content__option" onClick={() => { hideRegister(); showLogin(); }}>Do you have an account? <span> Log In</span></p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { register })(RegisterModal);