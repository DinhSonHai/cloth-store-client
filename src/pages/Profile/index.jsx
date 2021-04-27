import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
// import PropTypes from 'prop-types';
import * as Yup from 'yup';

import './styles.scss';
import { changeInfo, changePassword } from '../../redux/actions/auth';
import TextField from '../../components/CustomFields/TextField';
import Spinner from '../../components/Spinner';

Profile.propTypes = {

};

function Profile({ auth, changeInfo, changePassword }) {
  const [loading, setLoading] = useState(false);
  const [sidebar, setsidebar] = useState(0);
  const [isEdit, setEdit] = useState(false);

  const validateProfile = Yup.object({
    name: Yup.string()
      .required('Please enter a valid name!')
  })

  const validatePassword = Yup.object({
    currentPassword: Yup.string()
      .min(6, 'Your passwords must be more than 6 characters!')
      .required('Please enter a valid password!'),
    newPassword: Yup.string()
      .min(6, 'Your passwords must be more than 6 characters!')
      .required('Please enter a valid password!'),
    reEnterPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Password do not match")
      .required('Please enter a valid password!')
  })

  const handleSidebar = (index) => {
    if (index === 0) {
      setEdit(false);
    }
    setsidebar(index);
  }

  const handleEdit = () => {
    setEdit(true);
  }

  const handleCancel = () => {
    setEdit(false);
  }

  return (
    <div className="profile">
      <div className="sidebar">
        <p className="sidebar__title">My Account</p>
        <p onClick={() => handleSidebar(0)} className={sidebar === 0 ? "sidebar__name sidebar__name--active" : "sidebar__name"}>Account setting</p>
        <p onClick={() => handleSidebar(1)} className={sidebar === 1 ? "sidebar__name sidebar__name--active" : "sidebar__name"}>Change password</p>
      </div>
      {auth.loading ? (
        <div className="spinner-page">
          <Spinner width="200px" />
        </div>
      ) : (
        <div className="sidebar-content">
          {/* Update info */}
          {sidebar === 0 && (
            <div className="infomation">
              <div className="information__title">
                <p>Information</p>
                {!isEdit && (<button onClick={handleEdit}>Edit</button>)}
              </div>
              {isEdit ? (<div className="information__edit">
                <Formik
                  initialValues={{
                    name: auth.user.name || ''
                  }}
                  validationSchema={validateProfile}
                  onSubmit={values => {
                    async function update() {
                      setLoading(true);
                      await changeInfo(values, setEdit);
                      setLoading(false);
                    }
                    update();
                  }}
                  validateOnMount
                >
                  {formik => (
                    <Form className="content__form">
                      {auth?.error?.type === 'changeInfo' && (<p className="content__error">{auth.error.message}</p>)}
                      <TextField type="text" label="NAME" id="name" name="name" placeholder="Enter your name..." width={"380px"} height={"46px"} backgroundColor={"var(--white)"} />

                      <div className="button">
                        <button onClick={handleCancel} className="cancel-button" >Cancel</button>

                        <button type="submit" className="submit-button" disabled={!formik.isValid} >
                          {loading && <span className="spinner"><Spinner width="49px" /></span>}
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
          {sidebar === 1 && (
            <div className="password">
              <div className="password__title">
                <p>Change password</p>
              </div>
              <div className="password__edit">
                <Formik
                  initialValues={{
                    currentPassword: '',
                    newPassword: '',
                    reEnterPassword: ''
                  }}
                  validationSchema={validatePassword}
                  onSubmit={(values, { resetForm }) => {
                    async function change() {
                      setLoading(true);
                      const isSuccess = await changePassword(values);
                      setLoading(false);
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
                      {auth?.error?.type === 'changePassword' && (<p className="content__error">{auth.error.message}</p>)}
                      <TextField type="password" label="CURRENT PASSWORD" id="currentPassword" name="currentPassword" placeholder="Enter your password..." width={"380px"} height={"46px"} backgroundColor={"var(--white)"} />
                      <TextField type="password" label="NEW PASSWORD" id="newPassword" name="newPassword" placeholder="Enter your password..." width={"380px"} height={"46px"} backgroundColor={"var(--white)"} />
                      <TextField type="password" label="RE-ENTER NEW PASSWORD" id="reEnterPassword" name="reEnterPassword" placeholder="Enter your password..." width={"380px"} height={"46px"} backgroundColor={"var(--white)"} />

                      <div className="button">
                        <button type="submit" className="submit-button" disabled={!formik.isValid} >
                          {loading && <span className="spinner"><Spinner width="49px" /></span>}
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

export default connect(mapStateToProps, { changeInfo, changePassword })(Profile);
