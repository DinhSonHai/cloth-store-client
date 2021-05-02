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
        <Link to="/" className="top__logo">
          <Logo />
        </Link>
        <div className="top__nav">
          <Link to="/" className="nav__link">Home</Link>
          <Link to="/products/types/606e9edc9d2925f6dc88d785" className="nav__link">Products</Link>
          <Link to="/" className="nav__link">Services</Link>
          <Link to="/" className="nav__link">About Us</Link>
          <Link to="/" className="nav__link">Help</Link>
          <Link to="/" className="nav__link">Contacts</Link>
        </div>
        <div className="top__contact">
          <TwitterIcon />
          <FacebookIcon />
          <InstagramIcon />
        </div>
      </div>
      <div className="footer__bottom">
        <div className="bottom__nav">
          <Link className="nav__link" to="/">Home</Link>
          <Link className="nav__link" to="/products/types/606e9edc9d2925f6dc88d785">Products</Link>
          <Link className="nav__link" to="/">Services</Link>
          <Link className="nav__link" to="/">About Us</Link>
          <Link className="nav__link" to="/">Help</Link>
          <Link className="nav__link" to="">Contacts</Link>
        </div>
        <div className="bottom__policy">
          <Link className="policy__link" to="/">Privacy Policy</Link>
          <Link className="policy__link" to="/">Terms & Conditions</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;