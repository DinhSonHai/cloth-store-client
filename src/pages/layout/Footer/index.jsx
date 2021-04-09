import React from 'react';
import { Link } from 'react-router-dom';

import { Logo, TwitterIcon, FacebookIcon, InstagramIcon } from '../../../assets/icons';

import './styles.scss';

Footer.propTypes = {

};

function Footer(props) {
  return (
    <div className="footer">
      <div className="footer__top">
        <Link to="/" className="footer__top__logo">
          <Logo />
        </Link>
        <div className="footer__top__nav">
          <Link className="footer__top__nav__link" to="#">Home</Link>
          <Link className="footer__top__nav__link" to="#">Products</Link>
          <Link className="footer__top__nav__link" to="#">Services</Link>
          <Link className="footer__top__nav__link" to="#">About Us</Link>
          <Link className="footer__top__nav__link" to="#">Help</Link>
          <Link className="footer__top__nav__link" to="#">Contacts</Link>
        </div>
        <div className="footer__top__contact">
          <TwitterIcon />
          <FacebookIcon />
          <InstagramIcon />
        </div>
      </div>
      <div className="footer__bottom">
        <div className="footer__bottom__nav">
          <Link className="footer__bottom__nav__link" to="#">Home</Link>
          <Link className="footer__bottom__nav__link" to="#">Products</Link>
          <Link className="footer__bottom__nav__link" to="#">Services</Link>
          <Link className="footer__bottom__nav__link" to="#">About Us</Link>
          <Link className="footer__bottom__nav__link" to="#">Help</Link>
          <Link className="footer__bottom__nav__link" to="#">Contacts</Link>
        </div>
        <div className="footer__bottom__policy">
          <Link className="footer__bottom__policy__link" to="#">Privacy Policy</Link>
          <Link className="footer__bottom__policy__link" to="#">Terms & Conditions</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;