import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

CollectionCard.propTypes = {

};

function CollectionCard({ title, image, to }) {
  return (
    <div className="card" style={{ backgroundImage: `url(${image})` }}>
      <div className="card__title">{title}</div>
      <div className="card__divider"></div>
      <Link to={to} className="card__link">Shop now</Link>
    </div>
  );
}

export default CollectionCard;
