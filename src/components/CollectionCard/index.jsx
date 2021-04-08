import React from 'react';

import './styles.scss';

CollectionCard.propTypes = {

};

function CollectionCard({ title, image }) {
  return (
    <div className="card" style={{ backgroundImage: `url(${image})` }}>
      <div className="card__title">{title}</div>
      <div className="card__divider"></div>
      <button className="card__button">Shop now</button>
    </div>
  );
}

export default CollectionCard;
