import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Logo, SearchIcon, Arrow } from '../../../assets/icons';
import './styles.scss';
import RegisterModal from '../../../components/RegisterModal';
import LoginModal from '../../../components/LoginModal';
import CartAction from '../../../components/CartAction';
import { Link } from 'react-router-dom';

NavBar.propTypes = {
  auth: PropTypes.object.isRequired
};

function NavBar({ auth: { isAuthenticated } }) {
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
          <button className="navbar__top__action__register" onClick={showRegister}>Register</button>
          <button className="navbar__top__action__login" onClick={showLogin}>Log In</button>
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
              <Link className="navbar__bottom__collection__dropdown__link" to="/products">Tops</Link>
              <Link className="navbar__bottom__collection__dropdown__link" to="/products">Bottoms</Link>
              <Link className="navbar__bottom__collection__dropdown__link" to="/products">Dresses</Link>
              <Link className="navbar__bottom__collection__dropdown__link" to="/products">Jackets</Link>
              <Link className="navbar__bottom__collection__dropdown__link" to="/products">Shoes</Link>
              <Link className="navbar__bottom__collection__dropdown__link" to="/products">Accessories</Link>
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

export default connect(mapStateToProps, {})(NavBar);