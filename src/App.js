import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import MapAccidents from './components/MapAccidents'
import HeatMap from './components/HeatMap';
import Header from './components/Headr';
import Footer from './components/Footer';
//import mapStore from './stores/MapStore';

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/heatmap">
            <div className="App">
              <Header title="Heat Map" />
              <HeatMap />
              <Footer />
            </div>
          </Route>
          <Route path="/">
            <div className="App">
              <Header title="Accidents Map" />
              <MapAccidents />
              <Footer />
            </div>
          </Route>
         
        </Switch>
      </div>
    </Router>
  );
}

function About() {
  return (
    <div>
      <Header title="About" />
      <h1>About page</h1>
      <Footer />
    </div>
  )
}

export default App;
