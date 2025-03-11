import React, { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Card from 'react-bootstrap/Card';
import HomePage from './pages/HomePage';
import CityPage from './pages/CityPage';
// import MapPage from './pages/MapPage';
import Header from './components/templates/Header/Headr';
import MapWithClusters from './pages/MapWithClusters';
//import Footer from './components/templates/Footer';
//import Loader from './components/atoms/Loader';
import './i18n';
import './App.css';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const RecommendationsPage = lazy(() => import('./pages/RecommendationsPage'));
// const UpdateImagePage = lazy(() => import('./components/pages/UpdateImagePage'));
// const MyFilters = lazy(() => import('./components/pages/MyFilters'))


const styles = {
   app: {
      marginTop: '44px',
   }
};

function App() {
   return (
      <BrowserRouter>
         {/* <Card display="flex" height="100%"> */}
         <div style={{ height: "100%" }}>
            <Header title="Safety Data" />
            <div style={styles.app}>
        
               <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/city" element={<CityPage/>} />
                  <Route path="/recommend" element={<RecommendationsPage/>} />               
                  <Route path="/map" element={<MapWithClusters />} />
                  <Route path="/about" element={<AboutPage />} />
               </Routes>
           
            </div>
            {/* <Footer /> */}
         </div>
         {/* </Card> */}
      </BrowserRouter>
   );
}


export default App;