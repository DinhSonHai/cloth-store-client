import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Logo, SearchIcon, Arrow } from '../../../assets/icons';
import './styles.scss';
import RegisterModal from '../../../components/RegisterModal';
import LoginModal from '../../../components/LoginModal';
import CartAction from '../../../components/CartAction';

import { logout } from '../../../redux/actions/auth';
import { getAllCollections } from '../../../redux/actions/collections';
import Spinner from '../../../components/Spinner';

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

function NavBar({ auth, cart, collections, logout, getAllCollections }) {
  const [loading, setLoading] = useState(false);
  const [isRegister, setRegister] = useState(false);
  const [isLogin, setLogin] = useState(false);

  const showRegister = () => {
    setRegister(!isRegister);
  }

  const hideRegister = () => {
    setRegister(!isRegister);
  }

  const showLogin = () => {
    setLogin(!isLogin);
  }

  const hideLogin = () => {
    setLogin(!isLogin);
  }

  useEffect(() => {
    setLoading(true);
    getAllCollections();
    setLoading(false);
  }, [loading]);

  return (
    <div className="navbar">
      <div className="navbar__top">
        <div className="top__search-box">
          <input className="search-box__input" placeholder="Search" />
          <div className="search-box__icon">
            <SearchIcon />
          </div>
        </div>

        <Link to="/" className="top__logo">
          <Logo />
        </Link>

        <div className="top__action">
          {auth.isAuthenticated ? (
            loading ? <Spinner width="50px" /> : (
              <div className="action__auth">
                <img src={auth?.user?.avatar} alt="User avatar"></img>
                <div className="auth__dropdown">
                  <div>
                    <Link to="/profile" className="dropdown__link">Account Setting</Link>
                  </div>
                  <section className="dropdown__divider"></section>
                  <div>
                    <Link to="/orders/me" className="dropdown__link">My orders</Link>
                  </div>
                  <section className="dropdown__divider"></section>
                  <div onClick={logout} className="dropdown__link">Logout</div>
                </div>
              </div>
            )
          ) : (
            <Fragment>
              <button className="action__register" onClick={showRegister}>Register</button>
              <button className="action__login" onClick={showLogin}>Log In</button>
            </Fragment>
          )}

          <CartAction cart={cart} />

        </div>
      </div>
      <div className="navbar__bottom">
        {collections && collections.map((collection, index) => (
          <div key={index} className="bottom__collection">
            <p className="collection__text">{collection.collectionName}</p>
            <Arrow />
            <div className="collection__dropdown">
              {collection.types.map(type => (
                <Link to={`/products/types/${type._id}`} className="dropdown__link">{type.typeName}</Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      { isRegister && <RegisterModal hideRegister={hideRegister} showLogin={showLogin} />}
      { isLogin && <LoginModal hideLogin={hideLogin} showRegister={showRegister} />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  cart: state.cart,
  collections: state.collections.collections
})

export default connect(mapStateToProps, { logout, getAllCollections })(NavBar);
