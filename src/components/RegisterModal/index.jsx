import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import { register } from '../../redux/actions/auth';
import TextField from '../../components/CustomFields/TextField';
import { CloseModalIcon } from '../../assets/icons';
import './styles.scss';
import Spinner from '../Spinner';

RegisterModal.propTypes = {
  auth: PropTypes.object.isRequired,
  hideRegister: PropTypes.func.isRequired,
  showLogin: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

function RegisterModal({ auth, hideRegister, showLogin, register }) {
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="register-modal" id="register-modal">
      <div className="register-modal__content">
        <div className="content__close">
          <div className="close__icon" onClick={hideRegister}>
            <CloseModalIcon />
          </div>
        </div>
        <h1 className="content__title">Register</h1>
        {auth && auth.error && auth.error.type === 'register' && <p className="content__error">{auth.error.message}</p>}
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: ''
          }}
          validationSchema={validate}
          onSubmit={values => {
            setLoading(true);
            register(values, hideRegister, showLogin);
            setLoading(false);
          }}
          validateOnMount
        >
          {formik => (
            <Form className="content__form">
              <TextField type="text" label="NAME" id="name" name="name" placeholder="Enter your name..." width={"395px"} height={"46px"} backgroundColor={"var(--white-two)"} />
              <TextField type="text" label="E-MAIL" id="email" name="email" placeholder="Enter your email..." width={"395px"} height={"46px"} backgroundColor={"var(--white-two)"} />
              <TextField type="password" label="PASSWORD" name="password" placeholder="Enter your password..." width={"395px"} height={"46px"} backgroundColor={"var(--white-two)"} />

              <p className="form__policy">By creating an account you agree to the <a href="/">Term of service</a> and <a href="/">Privacy Policy</a></p>

              <button type="submit" className="form__button" disabled={!formik.isValid} >
                {loading && <span className="spinner"><Spinner width="49px" /></span>}
                Register
                </button>
            </Form>
          )}
        </Formik>
        <p className="content__option" onClick={() => { hideRegister(); showLogin(); }}>Do you have an account? <span> Log In</span></p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { register })(RegisterModal);