import React, { useState } from 'react';

import { Logo, SearchIcon } from '../../../assets/icons';

import './styles.scss';
import RegisterModal from '../../../components/RegisterModal';
import LoginModal from '../../../components/LoginModal';
import CartAction from '../../../components/CartAction';

NavBar.propTypes = {

};

function NavBar(props) {
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

        <div className="navbar__top__logo">
          <Logo />
        </div>

        <div className="navbar__top__action">
          <button className="navbar__top__action__register" onClick={showRegister}>Register</button>
          <button className="navbar__top__action__login" onClick={showLogin}>Log In</button>
          <div className="navbar__top__action__cart">
            <CartAction />
          </div>
        </div>
      </div>
      <div className="navbar__bottom">
      </div>
      {/* <div className="navbar__divider"></div> */}
      { isRegister && <RegisterModal hideRegister={hideRegister} />}
      { isLogin && <LoginModal hideLogin={hideLogin} />}
    </div>
  );
}

export default NavBar;