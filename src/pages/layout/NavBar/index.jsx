import React from 'react';

import { Logo, SearchIcon } from '../../../assets/icons';

import './styles.scss';
import CartAction from '../../../components/CartAction';

NavBar.propTypes = {

};

function NavBar(props) {
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
          <button className="navbar__top__action__register">Register</button>
          <button className="navbar__top__action__login">Log In</button>
          <div className="navbar__top__action__cart">
            <CartAction />
          </div>
        </div>
      </div>
      {/* <div className="navbar__divider"></div> */}
      <div className="navbar__bottom"></div>
    </div>
  );
}

export default NavBar;