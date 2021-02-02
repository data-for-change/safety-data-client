import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import CityPage from './components/pages/CityPage';
import Header from './components/templates/Headr';
// import Card from 'react-bootstrap/Card';
import Footer from './components/templates/Footer';
import './i18n';
import './App.css';
import Loader from './components/atoms/Loader';
// import mapStore from './stores/MapStore';

const AboutPage = lazy(() => import('./components/pages/AboutPage'));
const UpdateImagePage = lazy(() => import('./components/pages/UpdateImagePage'));


function App() {
   return (
      <Router>
         <Header title="Safety Data" />
         <div >
            <Suspense fallback={<Loader />}>
               <Switch>
                  <Route
                     path="/about"
                     component={AboutPage}
                  />
                  <Route
                     exact
                     path="/city"
                     component={CityPage}
                  />
                  <Route
                     path="/update-img"
                     component={UpdateImagePage}
                  />
                  <Route
                     path="/"
                     component={HomePage}
                  />
               </Switch>
            </Suspense>
         </div>
         <Footer />
      </Router>
   );
}


export default App;
