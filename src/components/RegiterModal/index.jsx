import React from 'react';

import './styles.scss';

import { CloseModalIcon } from '../../assets/icons';

RegisterModal.propTypes = {

};

function RegisterModal(props) {
  return (
    <div className="register-modal" id="register-modal">
      <div className="register-modal__content">
        <div className="register-modal__content__close">
          <div className="register-modal__content__close__icon">
            <CloseModalIcon />
          </div>
        </div>
        <h1 className="register-modal__content__title">Register</h1>
        <form className="register-modal__content__form">
          <label className="register-modal__content__form__label" for="name">NAME</label><br />
          <input className="register-modal__content__form__input" type="text" id="name" name="name" placeholder="Enter your name..." />
          <br />

          <label className="register-modal__content__form__label" for="email">EMAIL</label><br />
          <input className="register-modal__content__form__input" type="text" id="email" name="email" placeholder="Enter your email..." />
          <br />

          <label className="register-modal__content__form__label" for="password">PASSWORD</label><br />
          <input className="register-modal__content__form__input" type="text" id="password" name="password" placeholder="Enter your password..." />

          <p className="register-modal__content__form__policy">By creating an account you agree to the <a>Term of service</a> and <a>Privacy Policy</a></p>

          <button className="register-modal__content__form__button" onClick={(e) => e.preventDefault()}>Register</button>
        </form>
        <p className="register-modal__content__option">Do you have an account? <a> Log In</a></p>
      </div>
    </div>
  );
}

export default RegisterModal;