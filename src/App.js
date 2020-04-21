import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './i18n';
import './App.css';
import Card from 'react-bootstrap/Card';
import HomePage from './components/pages/HomePage';
import { CityPage } from './components/pages/CityPage';
import UpdateImagePage from './components/pages/UpdateImagePage';
import Header from './components/templates/Headr';
import Footer from './components/templates/Footer';
// import mapStore from './stores/MapStore';

const AboutPage = lazy(() => import('./components/pages/AboutPage'));
function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Card display="flex" height="100%">
          <Header title="Safety Data" />
          <div className="App">
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route path="/about">
                  <AboutPage />
                </Route>
                <Route path="/city">
                  <CityPage />
                </Route>
                <Route path="/update-img">
                  <UpdateImagePage />
                </Route>
                <Route path="/">
                  <HomePage />
                </Route>
              </Switch>
            </Suspense>
          </div>
          <Footer />
        </Card>
      </div>
    </Router>
  );
}


export default App;
