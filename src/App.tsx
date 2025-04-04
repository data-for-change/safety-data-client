import React, { lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppDispatch } from './stores/store';
import { initLang } from './stores/ui/appUiSlice';
import {DirectionProvider} from './DirectionProvider';

import HomePage from './pages/HomePage';
import CityPage from './pages/CityPage';
import Header from './components/templates/Header/Header';
import MapWithClusters from './pages/MapWithClusters';
import Footer from './components/templates/footer/Footer';
// import Card from 'react-bootstrap/Card';
// import MapPage from './pages/MapPage';
//import Loader from './components/atoms/Loader';
import './i18n';
import './App.css';


const AboutPage = lazy(() => import('./pages/AboutPage'));
const RecommendationsPage = lazy(() => import('./pages/RecommendationsPage'));
const Login = lazy(() =>import ('./components/auth/Login'));
const Register = lazy(() =>import ('./components/auth/Register'));
const Profile = lazy(() =>import ('./components/auth/Profile'));
// const UpdateImagePage = lazy(() => import('./components/pages/UpdateImagePage'));
// const MyFilters = lazy(() => import('./components/pages/MyFilters'))

const styles = {
   app: {
      marginTop: '44px',
   }
};

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(initLang()); // Load language on app start
  }, [dispatch]);

   return (
      <DirectionProvider>         
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
                     <Route path="/login" element={<Login />} />
                     <Route path="/register" element={<Register />} />
                     <Route path="/profile" element={<Profile />} />`
                  </Routes>
            
               </div>
               <Footer />
            </div>
            {/* </Card> */}
         </BrowserRouter>
      </DirectionProvider>
   );
}



export default App;
