import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { Logo, SearchIcon, Arrow } from '../../../assets/icons';
import './styles.scss';
import RegisterModal from '../../../components/RegisterModal';
import LoginModal from '../../../components/LoginModal';
import CartAction from '../../../components/CartAction';

import { logout } from '../../../redux/actions/auth';
import { getAllCollections } from '../../../redux/actions/collections';
import Spinner from '../../../components/Spinner';
import ForgotPasswordModal from '../../../components/ForgotPasswordModal';

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function NavBar({ auth, cart, collections, logout, getAllCollections }) {
  const history = useHistory();
  const query = useQuery();
  const q = query.get("q");

  const [loading, setLoading] = useState(false);
  const [isRegister, setRegister] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [isForgotPassword, setForgotPassword] = useState(false);
  const [keyWord, setKeyWord] = useState(q || '');

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

  const showForgotPassword = () => {
    setForgotPassword(!isForgotPassword);
  }

  const hideForgotPassword = () => {
    setForgotPassword(!isForgotPassword);
  }

  useEffect(() => {
    setLoading(true);
    getAllCollections();
    setLoading(false);
  }, [getAllCollections, loading]);

  const handleChange = (e) => {
    setKeyWord(e.target.value);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      history.push(`/products?q=${keyWord}`);
    }
  }

  const handleSearchClick = (e) => {
    history.push(`/products?q=${keyWord}`);
  }

  return (
    <div className="navbar">
      <div className="navbar__top">
        <div className="top__search-box">
          <input type="text" className="search-box__input" placeholder="Search" value={keyWord} onChange={handleChange} onKeyPress={handleKeyPress} />
          <div className="search-box__icon" onClick={handleSearchClick}>
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
              {collection.types.map((type, index) => (
                <Link key={index} to={`/products/types/${type._id}`} className="dropdown__link">{type.typeName}</Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      { isRegister && <RegisterModal hideRegister={hideRegister} showLogin={showLogin} />}
      { isLogin && <LoginModal hideLogin={hideLogin} showRegister={showRegister} showForgotPassword={showForgotPassword} />}
      { isForgotPassword && <ForgotPasswordModal hideForgotPassword={hideForgotPassword} showLogin={showLogin} />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  cart: state.cart,
  collections: state.collections.collections
})

export default connect(mapStateToProps, { logout, getAllCollections })(NavBar);
