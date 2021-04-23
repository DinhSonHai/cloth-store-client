import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { loginAsAdmin } from '../../redux/actions/auth';
import TextField from '../../components/CustomFields/TextField';
import { AdminLogo } from '../../assets/icons/index';
import './styles.scss';
import Spinner from '../../components/Spinner';

AdminLoginPage.propTypes = {

};

function AdminLoginPage({ auth, loginAsAdmin }) {
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const validate = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email!')
      .required('Please enter a valid email!'),
    password: Yup.string()
      .min(6, 'Your passwords must be more than 6 characters!')
      .required('Please enter a valid password!')
  })

  return (
    <div className="admin-login">
      <div className="logo">
        <AdminLogo />
      </div>
      <div className="form-login">
        <h1 className="form__title">Log In</h1>
        {auth?.error?.type === 'loginAsAdmin' && (<p className="content__error">{auth.error.message}</p>)}
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validate}
          onSubmit={values => {
            async function handleLogin() {
              setLoading(true);
              const isSuccess = await loginAsAdmin(values);
              setLoading(false);
              if (isSuccess) {
                history.push("/admin");
              }
            }
            handleLogin();
          }}
          validateOnMount
        >
          {formik => (
            <Form className="content__form">
              <TextField type="text" label="E-MAIL" id="email" name="email" placeholder="Enter your email..." width={"316px"} height={"48px"} labelColor={"var(--greyish)"} backgroundColor={"var(--white-two)"} />
              <TextField type="password" label="PASSWORD" name="password" placeholder="Enter your password..." width={"316px"} height={"48px"} labelColor={"var(--greyish)"} backgroundColor={"var(--white-two)"} />

              <button type="submit" className="form__button" disabled={!formik.isValid} >
                {loading && <span className="spinner"><Spinner width="49px" /></span>}
                Login
              </button>
            </Form>
          )}
        </Formik>
        <p className="form__option">Forgot password</p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { loginAsAdmin })(AdminLoginPage);