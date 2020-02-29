import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './i18n';
import './App.css';
import Card from 'react-bootstrap/Card';
import { HomePage } from './components/pages/HomePage'
import {CityPage} from './components/pages/CityPage'
import HeatMap from './components/pages/HeatMap';
import Header from './components/templates/Headr';
import Footer from './components/templates/Footer';
//import mapStore from './stores/MapStore';

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Card display='flex' height='100%'>
          <Header title="Safety Data" />
          <div className="App">
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/heatmap">
                <HeatMap />
            </Route>
            <Route path="/city">
                <CityPage />
            </Route>
            <Route path="/">
                <HomePage />
            </Route>
          </Switch>
          </div>
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
