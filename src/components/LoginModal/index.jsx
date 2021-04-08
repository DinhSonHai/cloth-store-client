import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

import { CloseModalIcon } from '../../assets/icons';

LoginModal.propTypes = {
  hideLogin: PropTypes.func.isRequired,
};

function LoginModal({ hideLogin }) {
  return (
    <div className="login-modal" id="login-modal">
      <div className="login-modal__content">
        <div className="login-modal__content__close">
          <div className="login-modal__content__close__icon" onClick={hideLogin}>
            <CloseModalIcon />
          </div>
        </div>
        <h1 className="login-modal__content__title">Log In</h1>
        <form className="login-modal__content__form">

          <label className="login-modal__content__form__label" for="email">E-MAIL</label><br />
          <input className="login-modal__content__form__input" type="text" id="email" name="email" placeholder="Enter your email..." />
          <br />

          <label className="login-modal__content__form__label" for="password">PASSWORD</label><br />
          <input className="login-modal__content__form__input" type="text" id="password" name="password" placeholder="Enter your password..." />

          <div className="login-modal__content__form__option">
            <div className="login-modal__content__form__option__remember">
              <input type="checkbox" id="rememeber-box" />
              <label for="remember-box">Remember password</label>
            </div>
            <p className="login-modal__content__form__option_forgot">Forgot your password?</p>
          </div>

          <button type="button" className="login-modal__content__form__button" onClick={(e) => e.preventDefault()}>Log In</button>
        </form>
        <p className="login-modal__content__option">Don't have an account? <a href="/"> Register</a></p>
      </div>
    </div>
  );
}

export default LoginModal;