import React from 'react';
import Header from '../components/Header.jsx';
import Jumbotron from '../components/Jumbotron.jsx';
import AboutUs from '../components/AboutUs.jsx';
import FinePrint from '../components/FinePrint.jsx';

class Home extends React.Component {
  render () {
    return (
      <div>
        <Header/>
        <AboutUs/>
        <Jumbotron/>
        <FinePrint/>
      </div>
    );
  }
}

module.exports = Home;
