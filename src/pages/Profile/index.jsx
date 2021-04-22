import React, { useState } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import './styles.scss';
import Spinner from '../../components/Spinner';

Profile.propTypes = {

};

function Profile({ auth }) {
  const [tab, setTab] = useState(0);

  const handleClick = (index) => {
    setTab(index);
  }

  return (
    <div className="profile">
      <div className="tab">
        <p className="tab__title">My Account</p>
        <p onClick={() => handleClick(0)} className={tab === 0 ? "tab__name tab__name--active" : "tab__name"}>Account seting</p>
        <p onClick={() => handleClick(1)} className={tab === 1 ? "tab__name tab__name--active" : "tab__name"}>Change password</p>
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
                <button>Edit</button>
              </div>
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

export default connect(mapStateToProps, {})(Profile);
