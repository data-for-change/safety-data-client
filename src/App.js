import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { HomePage } from './components/HomePage'
import HeatMap from './components/HeatMap';
import Header from './components/Headr';
import Footer from './components/Footer';
import Card from 'react-bootstrap/Card';
//import mapStore from './stores/MapStore';

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Card display='flex'  height='100%'>
          <Header title="Safety Data" />
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/heatmap">
              <div className="App">
                {/* <Header title="Heat Map" /> */}
                <HeatMap />
                {/* <Footer /> */}
              </div>
            </Route>
            <Route path="/">
              <div className="App">
                <HomePage />
              </div>
            </Route>
          </Switch>
          <Footer />
        </Card>
      </div>
    </Router>
  );
}

function About() {
  return (
    <div className="heb">
      <div>פרוייקט נתונים על תאונות דרכים</div>
      <div>מקור הנתונים - פרוייקט Anyway של הסדנא לידע ציבורי.</div>
      {/* <Footer /> */}
    </div>
  )
}

export default App;
