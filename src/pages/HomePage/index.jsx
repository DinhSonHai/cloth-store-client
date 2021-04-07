import React from 'react';

import CollectionCard from '../../components/CollectionCard';
import './styles.scss';

HomePage.propTypes = {

};

function HomePage(props) {
  return (
    <div className="home-page">
      <div className="home-page__weekly-outfit"></div>
      <div className="home-page__collection">
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
      </div>
    </div>
  );
}

export default HomePage;