import React from 'react';

import CollectionCard from '../../components/CollectionCard';
import './styles.scss';

import Men from '../../assets/images/men-outfit.jpg';
import Ladies from '../../assets/images/ladies-outfit.jpg';
import Girls from '../../assets/images/girls-outfit.jpg';
import Boys from '../../assets/images/boys-outfit.jpg';
import { Link } from 'react-router-dom';

HomePage.propTypes = {

};

function HomePage(props) {
  return (
    <div className="home-page">
      <div className="home-page__weekly-outfit">
        <p className="weekly-outfit__title">OUTFIT OF THE WEEK</p>
        <Link to="/products/types/606e9edc9d2925f6dc88d785" className="weekly-outfit__link">Shop now</Link>
      </div>
      <div className="home-page__collection">
        <CollectionCard to="/products/types/607e7b383e88310a508dbf2b" title="Men" image={Men} />
        <CollectionCard to="/products/types/606e9edc9d2925f6dc88d785" title="Ladies" image={Ladies} />
        <CollectionCard to="/products/types/607e7db53e88310a508dbf36" title="Girls" image={Girls} />
        <CollectionCard to="/products/types/607e7cb43e88310a508dbf30" title="Boys" image={Boys} />
      </div>
    </div>
  );
}

export default HomePage;