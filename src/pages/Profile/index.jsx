import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
// import PropTypes from 'prop-types';
import * as Yup from 'yup';

import './styles.scss';
import { changeInfo, changePassWord } from '../../redux/actions/auth';
import TextField from '../../components/CustomFields/TextField';
import Spinner from '../../components/Spinner';

Profile.propTypes = {

};

function Profile({ auth, changeInfo, changePassWord }) {
  const [tab, setTab] = useState(0);
  const [isEdit, setEdit] = useState(false);

  const validateProfile = Yup.object({
    name: Yup.string()
      .required('Please enter a valid name!'),
    email: Yup.string()
      .email('Please enter a valid email!')
      .required('Please enter a valid email!')
  })

  const validatePassword = Yup.object({
    currentPassWord: Yup.string()
      .min(6, 'Your passwords must be more than 6 characters!')
      .required('Please enter a valid password!'),
    newPassWord: Yup.string()
      .min(6, 'Your passwords must be more than 6 characters!')
      .required('Please enter a valid password!'),
    reEnterPassWord: Yup.string()
      .oneOf([Yup.ref("newPassWord")], "Password do not match")
      .required('Please enter a valid password!')
  })

  const handleTab = (index) => {
    if (index === 0) {
      setEdit(false);
    }
    setTab(index);
  }

  const handleEdit = () => {
    setEdit(true);
  }

  const handleCancel = () => {
    setEdit(false);
  }

  return (
    <div className="profile">
      <div className="tab">
        <p className="tab__title">My Account</p>
        <p onClick={() => handleTab(0)} className={tab === 0 ? "tab__name tab__name--active" : "tab__name"}>Account seting</p>
        <p onClick={() => handleTab(1)} className={tab === 1 ? "tab__name tab__name--active" : "tab__name"}>Change password</p>
      </div>
      {auth.loading ? (
        <div className="spinner">
          <Spinner width="200px" />
        </div>
      ) : (
        <div className="tab-content">
          {/* Update info */}
          {tab === 0 && (
            <div className="infomation">
              <div className="information__title">
                <p>Information</p>
                {!isEdit && (<button onClick={handleEdit}>Edit</button>)}
              </div>
              {isEdit ? (<div className="information__edit">
                <Formik
                  initialValues={{
                    name: auth.user.name || '',
                    email: auth.user.email || ''
                  }}
                  validationSchema={validateProfile}
                  onSubmit={values => {
                    changeInfo(values, setEdit);
                  }}
                  validateOnMount
                >
                  {formik => (
                    <Form className="content__form">
                      {auth?.error?.type === 'changeInfo' && (<p className="content__error">{auth.error.message}</p>)}
                      <TextField type="text" label="NAME" id="name" name="name" placeholder="Enter your name..." width={"380px"} height={"46px"} backgroundColor={"var(--white)"} />
                      <TextField type="text" label="E-MAIL" id="email" name="email" placeholder="Enter your email..." width={"380px"} height={"46px"} backgroundColor={"var(--white)"} />
                      {console.log(formik)}
                      <div className="button">
                        <button onClick={handleCancel} className="cancel-button" >Cancel</button>

                        <button type="submit" className="submit-button" disabled={!formik.isValid} >
                          {/* {loading && <span className="spinner"><Spinner width="49px" /></span>} */}
                        Save
                      </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>) : (
                <div className="information__info">
                  <div className="info__name">
                    <p className="label">Name</p>
                    <p className="name">{auth.user.name}</p>
                  </div>
                  <div className="info__email">
                    <p className="label">Email</p>
                    <p className="email">{auth.user.email}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Change password */}
          {tab === 1 && (
            <div className="password">
              <div className="password__title">
                <p>Change password</p>
              </div>
              <div className="password__edit">
                <Formik
                  initialValues={{
                    currentPassWord: '',
                    newPassWord: '',
                    reEnterPassWord: ''
                  }}
                  validationSchema={validatePassword}
                  onSubmit={(values, { resetForm }) => {
                    async function change() {
                      const isSuccess = await changePassWord(values);
                      if (isSuccess) {
                        resetForm();
                      }
                    }
                    change();
                  }}
                  validateOnMount
                >
                  {formik => (
                    <Form className="content__form">
                      {auth?.error?.type === 'changePassWord' && (<p className="content__error">{auth.error.message}</p>)}
                      <TextField type="password" label="CURRENT PASSWORD" id="currentPassWord" name="currentPassWord" placeholder="Enter your password..." width={"380px"} height={"46px"} backgroundColor={"var(--white)"} />
                      <TextField type="password" label="NEW PASSWORD" id="newPassWord" name="newPassWord" placeholder="Enter your password..." width={"380px"} height={"46px"} backgroundColor={"var(--white)"} />
                      <TextField type="password" label="RE-ENTER NEW PASSWORD" id="reEnterPassWord" name="reEnterPassWord" placeholder="Enter your password..." width={"380px"} height={"46px"} backgroundColor={"var(--white)"} />

                      <div className="button">
                        <button type="submit" className="submit-button" disabled={!formik.isValid} >
                          {/* {loading && <span className="spinner"><Spinner width="49px" /></span>} */}
                        Save
                      </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { changeInfo, changePassWord })(Profile);
