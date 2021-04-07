import React from 'react';

import Card from '../../components/Card';
import './styles.scss';

HomePage.propTypes = {

};

function HomePage(props) {
  return (
    <div className="home-page">
      <div className="home-page__weekly-outfit"></div>
      <div className="home-page__collection">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default HomePage;