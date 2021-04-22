import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
// import PropTypes from 'prop-types';
import * as Yup from 'yup';

import './styles.scss';
import { changeInfo } from '../../redux/actions/auth';
import TextField from '../../components/CustomFields/TextField';
import Spinner from '../../components/Spinner';

Profile.propTypes = {

};

function Profile({ auth, changeInfo }) {
  const [tab, setTab] = useState(0);
  const [isEdit, setEdit] = useState(false);

  const validate = Yup.object({
    name: Yup.string()
      .required('Please enter a valid name'),
    email: Yup.string()
      .email('Please enter a valid email!')
      .required('Please enter a valid email!')
  })

  const handleTab = (index) => {
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
                  validationSchema={validate}
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
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { changeInfo })(Profile);
