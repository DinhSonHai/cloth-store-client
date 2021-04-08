import React from 'react';

import CollectionCard from '../../components/CollectionCard';
import './styles.scss';

import Men from '../../assets/images/men-outfit.jpg';
import Ladies from '../../assets/images/ladies-outfit.jpg';
import Girls from '../../assets/images/girls-outfit.jpg';
import Boys from '../../assets/images/boys-outfit.jpg';

HomePage.propTypes = {

};

function HomePage(props) {
  return (
    <div className="home-page">
      <div className="home-page__weekly-outfit">
        <p className="home-page__weekly-outfit__title">OUTFIT OF THE WEEK</p>
        <button className="home-page__weekly-outfit__button">Shop now</button>
      </div>
      <div className="home-page__collection">
        <CollectionCard title="Men" image={Men} />
        <CollectionCard title="Ladies" image={Ladies} />
        <CollectionCard title="Girls" image={Girls} />
        <CollectionCard title="Boys" image={Boys} />
      </div>
    </div>
  );
}

export default HomePage;