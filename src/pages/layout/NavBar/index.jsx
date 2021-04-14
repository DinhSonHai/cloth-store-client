import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Logo, SearchIcon, Arrow } from '../../../assets/icons';
import './styles.scss';
import RegisterModal from '../../../components/RegisterModal';
import LoginModal from '../../../components/LoginModal';
import CartAction from '../../../components/CartAction';

import { logout } from '../../../redux/actions/auth';
import Spinner from '../../../components/Spinner';

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

function NavBar({ auth: { isAuthenticated, loading, user }, logout }) {
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

  return (
    <div className="navbar">
      <div className="navbar__top">
        <div className="navbar__top__search-box">
          <input className="navbar__top__search-box__input" placeholder="Search" />
          <div className="navbar__top__search-box__icon">
            <SearchIcon />
          </div>
        </div>

        <Link to="/" className="navbar__top__logo">
          <Logo />
        </Link>

        <div className="navbar__top__action">
          { isAuthenticated ? (
            loading ? <Spinner width="50px" /> : (
                <div className="navbar__top__action__auth">
                <img src={user?.avatar} alt="User avatar"></img>
                <div className="navbar__top__action__auth__dropdown">
                  <div>
                    <Link to="/" className="navbar__top__action__auth__dropdown__link">Account Setting</Link>
                  </div>
                  <section className="navbar__top__action__auth__dropdown__divider"></section>
                  <div onClick={logout} className="navbar__top__action__auth__dropdown__link">Logout</div>
                </div>
              </div>
            )
          ) : (
            <Fragment>
              <button className="navbar__top__action__register" onClick={showRegister}>Register</button>
              <button className="navbar__top__action__login" onClick={showLogin}>Log In</button>
            </Fragment>
          )}
          <div to="/cart" className="navbar__top__action__cart">
            <CartAction />
            <div className="navbar__top__action__cart__dropdown">
              <Link to="/cart" className="navbar__top__action__cart__dropdown__link">View cart</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar__bottom">
        {['Men', 'Ladies', 'Girls', 'Boys'].map((collection, index) => (
          <div key={index} className="navbar__bottom__collection">
            <p className="navbar__bottom__collection__text">{collection}</p>
            <Arrow />
            <div className="navbar__bottom__collection__dropdown">
              <Link to="/products" className="navbar__bottom__collection__dropdown__link">Tops</Link>
              <Link to="/products" className="navbar__bottom__collection__dropdown__link">Bottoms</Link>
              <Link to="/products" className="navbar__bottom__collection__dropdown__link">Dresses</Link>
              <Link to="/products" className="navbar__bottom__collection__dropdown__link">Jackets</Link>
              <Link to="/products" className="navbar__bottom__collection__dropdown__link">Shoes</Link>
              <Link to="/products" className="navbar__bottom__collection__dropdown__link">Accessories</Link>
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
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(NavBar);