import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import HomePage from './components/pages/HomePage';
import CityPage from './components/pages/CityPage';
import Header from './components/templates/Headr';
import Footer from './components/templates/Footer';
import Loader from './components/atoms/Loader';
import './i18n';
import './App.css';


const AboutPage = lazy(() => import('./components/pages/AboutPage'));
const UpdateImagePage = lazy(() => import('./components/pages/UpdateImagePage'));

const styles = {
   app: {
      marginTop: '53px',
   }
};

function App() {
   return (
      <Router>
           <Card display="flex" height="100%">
           <Header title="Safety Data" />
         <div style={styles.app}>
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
           </Card>
        
      </Router>
   );
}


export default App;
