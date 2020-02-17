import React from 'react';
import { Link } from 'react-router-dom';

export default class Footer extends React.Component {

  render() {
    var divStyle = {
      display: 'flex',
      flexFlow: 'row wrap'
    };
    return (
      <footer style={divStyle}>
        <nav  className= "App-nav">
          <Link to="/">Home</Link>
          <Link to="/heatmap">HeatMap</Link>
          <Link to="/about">About</Link>
        </nav>
      </footer>
    );
  }
}